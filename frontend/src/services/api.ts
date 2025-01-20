import axios from 'axios';
import { FormDataState, ResearchResponse } from '../types/types';
import { apiConfig } from '../config/apiConfig';

// Configuración base para Axios, usando el `ApiUrl` del archivo de configuración
const api = axios.create({
  baseURL: apiConfig.ApiUrl, // Carga dinámica de la URL base
  headers: {
    'Content-Type': 'application/json',
  },
});

// Función para logout
export const logout = async (token: string): Promise<void> => {
  if (!token) {
    throw new Error('No access token found');
  }
  console.log('API: ', api);

  await api.post('/logout', {}, {
    headers: {
      Authorization: token,
    },
  });
};

// Función para login
export const login = async (loginData: { identifier: string; password: string }): Promise<{ accessToken: string }> => {
  const response = await api.post('/login', loginData);
  if (response.status !== 200) {
    throw new Error('Login failed');
  }
  return response.data;
};

// Sign Up
export async function register(registerForm: {
  name: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
}): Promise<any> {
  const response = await api.post('/register', registerForm);
  if (response.status !== 200) {
    throw new Error('Register failed');
  }
  return response.data;
}

/**
 * Función para subir archivos directamente al backend, que a su vez los sube a S3
 */
export const uploadFilesToBackend = async (files: File[]) => {
  try {
    const filesData = await Promise.all(
      files.map(async (file) => {
        const fileContent = await readFileAsBase64(file);
        return {
          fileName: file.name,
          fileContent,
          contentType: file.type,
        };
      })
    );

    const response = await api.post('/upload-image', { files: filesData });
    return response.data.files; // Retorna las URLs de los archivos subidos
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error uploading files:', error.response?.data || error.message);
    }
    throw error;
  }
};

/**
 * Utilidad para leer un archivo como Base64
 */
const readFileAsBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result?.toString().split(',')[1] || '');
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

/**
 * Función para crear una investigación
 */
export const createResearch = async (formData: FormDataState): Promise<ResearchResponse> => {
  try {
    let uploadedFileUrls: string[] = [];

    if (formData.uploadedFiles && formData.uploadedFiles.length > 0) {
      const uploadedFiles = await uploadFilesToBackend(formData.uploadedFiles);
      uploadedFileUrls = uploadedFiles.map((file: { fileUrl: string }) => file.fileUrl);
    }

    const updatedFormData = {
      ...formData,
      uploadedFiles: uploadedFileUrls,
    };

    const response = await api.post('/research/create-research', updatedFormData);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error creating research:', error.response?.data || error.message);
    }
    throw error;
  }
};

export default api;
