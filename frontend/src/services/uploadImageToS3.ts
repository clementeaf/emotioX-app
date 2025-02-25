import { api, getApiUrl } from "./axiosConfig";

/**
 * Estructura esperada en la respuesta de la API para generar URLs pre-firmadas.
 */
interface PresignedUrlResponse {
  uploadURL: string;
  fileURL: string;
}

interface FileRequest {
  fileName: string;
  fileType: string;
}

/**
 * Obtiene una URL pre-firmada para un archivo.
 * @param file Archivo a subir.
 * @returns Objeto con `uploadURL` y `fileURL`.
 */
const getPresignedUrl = async (file: File): Promise<PresignedUrlResponse> => {
  const url = getApiUrl("generatePresignedUrls", "POST");
  
  const fileRequest: FileRequest = {
    fileName: file.name,
    fileType: file.type,
  };

  console.log(`🚀 Requesting pre-signed URL for file: ${file.name}`);
  
  try {
    const response = await api.post<{ uploadURL: string; fileURL: string }>(url, fileRequest);
    console.log(`✅ Pre-signed URL received for ${file.name}:`, response.data);
    return response.data;
  } catch (error: any) {
    console.error(`❌ Error getting pre-signed URL for ${file.name}:`, {
      status: error.response?.status,
      data: error.response?.data,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        data: error.config?.data
      }
    });
    throw error;
  }
};

/**
 * Sube un archivo a S3 utilizando la URL pre-firmada.
 * @param file Archivo a subir.
 * @param uploadURL URL pre-firmada para subir el archivo.
 * @returns La URL del archivo en S3.
 */
const uploadSingleFileToS3 = async (
  file: File, 
  uploadURL: string, 
  fileURL: string
): Promise<string> => {
  try {
    console.log(`🚀 Uploading file ${file.name} to S3...`);
    await api.put(uploadURL, file, {
      headers: { 
        "Content-Type": file.type,
        "Access-Control-Allow-Origin": "*"
      }
    });
    console.log(`✅ File ${file.name} uploaded successfully to ${fileURL}`);
    return fileURL;
  } catch (error: any) {
    console.error(`❌ Error uploading file ${file.name} to S3:`, {
      status: error.response?.status,
      data: error.response?.data,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        headers: error.config?.headers
      }
    });
    throw error;
  }
};

/**
 * Sube un archivo a S3 utilizando la URL pre-firmada.
 * @param file Archivo a subir.
 * @returns La URL del archivo en S3.
 */
export const uploadFileToS3 = async (file: File): Promise<string> => {
  const presignedUrl = await getPresignedUrl(file);
  return uploadSingleFileToS3(file, presignedUrl.uploadURL, presignedUrl.fileURL);
};

/**
 * Sube múltiples archivos a S3 en paralelo.
 * @param files Array de archivos a subir.
 * @returns Array de URLs de S3.
 */
export const uploadMultipleFilesToS3 = async (files: File[]): Promise<string[]> => {
  // Obtener URLs pre-firmadas para cada archivo
  const presignedUrls = await Promise.all(files.map(file => getPresignedUrl(file)));
  
  // Subir todos los archivos en paralelo
  const uploadPromises = files.map((file, index) => 
    uploadSingleFileToS3(
      file, 
      presignedUrls[index].uploadURL, 
      presignedUrls[index].fileURL
    )
  );

  return Promise.all(uploadPromises);
};
