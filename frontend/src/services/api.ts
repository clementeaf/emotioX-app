import axios from "axios";
import { api, getApiUrl } from "./axiosConfig";
import { FormDataState, ResearchResponse } from "../types/types";

interface LoginResponse {
  accessToken: string;
}

/**
 * Manejo genérico de errores para todas las solicitudes API.
 * @param error - Error capturado.
 */
const handleApiError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      console.error("API Error Response:", error.response.data);
      throw new Error(error.response.data.message || "Ocurrió un error en la API.");
    } else if (error.request) {
      // La solicitud fue hecha pero no se recibió respuesta
      console.error("API Error Request:", error.request);
      throw new Error("No se recibió respuesta del servidor.");
    } else {
      // Algo sucedió en la configuración de la solicitud que provocó un error
      console.error("API Error Config:", error.message);
      throw new Error("Error en la configuración de la solicitud.");
    }
  }
  console.error("Unknown Error:", error);
  throw new Error("Ocurrió un error desconocido.");
};

/**
 * Logout del usuario.
 * @param token - Token de autorización.
 */
export const logout = async (token: string): Promise<void> => {
  if (!token) throw new Error("Token de acceso no proporcionado.");

  const url = getApiUrl("logoutUser", "POST");
  try {
    await api.post(url, {}, { headers: { Authorization: `Bearer ${token}` } });
  } catch (error) {
    handleApiError(error);
  }
};

/**
 * Login del usuario.
 * @param loginData - Datos de inicio de sesión.
 * @returns Token de acceso.
 */
export const login = async (
  loginData: { identifier: string; password: string }
): Promise<LoginResponse> => {
  const url = getApiUrl("loginUser", "POST");
  try {
    const response = await api.post<LoginResponse>(url, loginData);
    if (!response.data?.accessToken) {
      throw new Error("No se recibió un token de acceso.");
    }
    return response.data;
  } catch (error) {
    handleApiError(error); // handleApiError lanza una excepción, por lo que el código no continúa
    throw error; // Esto asegura que la función no continúe
  }
};

/**
 * Registrar un nuevo usuario.
 * @param registerForm - Datos del formulario de registro.
 * @returns Respuesta del registro.
 */
export const register = async (registerForm: {
  name: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
}): Promise<any> => {
  const url = getApiUrl("registerUser", "POST");
  try {
    const response = await api.post(url, registerForm);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

/**
 * Convertir un archivo en base64.
 * @param file - Archivo a convertir.
 * @returns Promesa con los datos del archivo en base64.
 */
const convertFileToBase64 = async (file: File): Promise<{
  fileName: string;
  fileContent: string;
  contentType: string;
}> => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  return new Promise((resolve, reject) => {
    reader.onload = () => {
      resolve({
        fileName: file.name,
        fileContent: reader.result?.toString().split(",")[1] || "",
        contentType: file.type,
      });
    };
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Subir archivos al backend, que a su vez los sube a S3.
 * @param files - Archivos a subir.
 * @returns URLs de los archivos subidos.
 */
export const uploadFilesToBackend = async (
  files: File[]
): Promise<{ fileUrl: string }[]> => {
  const url = getApiUrl("uploadFilesToS3", "POST");

  try {
    // Convertir archivos a Base64 y validar tipos
    const filesData = await Promise.all(
      files.map((file) => {
        if (!file.type.startsWith("image/") && !file.type.startsWith("application/")) {
          throw new Error(`Tipo de archivo no soportado: ${file.type}`);
        }
        return convertFileToBase64(file);
      })
    );

    // Realizar la solicitud al backend
    const response = await api.post<{ files: { fileUrl: string }[] }>(url, { files: filesData });

    // Retornar las URLs de los archivos subidos
    return response.data.files;
  } catch (error) {
    handleApiError(error);

    // Asegurar el retorno con un lanzamiento de error explícito
    throw new Error("Falló la carga de archivos al backend.");
  }
};


/**
 * Crear una investigación.
 * @param formData - Datos del formulario.
 * @returns Respuesta del backend.
 */
export const createResearch = async (
  formData: FormDataState
): Promise<ResearchResponse> => {
  const url = getApiUrl("createResearch", "POST");

  try {
    const uploadedFilesUrls = formData.uploadedFiles && formData.uploadedFiles.length > 0
      ? (await uploadFilesToBackend(formData.uploadedFiles)).map(file => file.fileUrl)
      : [];

    const updatedFormData = {
      ...formData,
      uploadedFiles: uploadedFilesUrls,
    };

    const response = await api.post<ResearchResponse>(url, updatedFormData);
    return response.data;
  } catch (error) {
    handleApiError(error);

    // Aseguramos un lanzamiento explícito después del manejo del error
    throw new Error("Error inesperado al crear la investigación.");
  }
};
