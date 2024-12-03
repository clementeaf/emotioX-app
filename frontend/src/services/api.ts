import axios from 'axios';
import { FormDataState } from '../types/types';

// Configuración base para Axios
const api = axios.create({
    baseURL: 'https://ysgzqbh7ch.execute-api.us-east-1.amazonaws.com',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Función para logout
export const logout = async (token: string): Promise<void> => {
    if (!token) {
        throw new Error('No access token found');
    }

    await api.post('/logout', {}, {
        headers: {
            Authorization: token,
            'Content-Type': 'application/json',
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

/**
 * Función para subir archivos directamente al backend, que a su vez los sube a S3
 */
export const uploadFilesToBackend = async (files: File[]) => {
  try {
    // Preparar los datos de los archivos (convertirlos a Base64)
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

    // Subir archivos al backend
    const response = await axios.post(
      'https://ysgzqbh7ch.execute-api.us-east-1.amazonaws.com/upload-image', // Endpoint del backend
      { files: filesData },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Files uploaded successfully:', response.data);
    return response.data.files; // Retorna las URLs de los archivos subidos
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error uploading files to backend:', error.response?.data || error.message);
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
    reader.onload = () => {
      const base64String = reader.result?.toString().split(',')[1];
      resolve(base64String || '');
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

/**
 * Función para crear una investigación, procesando imágenes si es necesario
 */
export const createResearch = async (formData: FormDataState): Promise<unknown> => {
  try {
    // Verificar si hay archivos cargados
    let uploadedFileUrls: string[] = [];
    if (formData.uploadedFiles && formData.uploadedFiles.length > 0) {
      // Subir archivos directamente al backend
      const uploadedFiles = await uploadFilesToBackend(formData.uploadedFiles);

      // Mapear las URLs retornadas al formData
      uploadedFileUrls = uploadedFiles.map((file: { fileUrl: string }) => file.fileUrl);
    }

    // Actualizar el formData para incluir las URLs de los archivos subidos
    const updatedFormData = {
      ...formData,
      uploadedFiles: uploadedFileUrls, // Usar las URLs en lugar de los archivos
    };

    // Enviar los datos al backend para crear la investigación
    const response = await axios.post(
      'https://ps8qdjrczb.execute-api.us-east-1.amazonaws.com/dev/research/create-research',
      updatedFormData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Research created successfully:', response.data);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error creating research:', error.response?.data || error.message);
    }
    throw error;
  }
};


export default api;
