import { api, getApiUrl } from "./axiosConfig";

/**
 * Estructura esperada en la respuesta de la API para generar URLs pre-firmadas.
 */
interface PresignedUrlResponse {
  uploadURL: string;
  fileURL: string;
}

/**
 * Obtiene una URL pre-firmada desde el backend para subir archivos a S3.
 * @param file Archivo a subir.
 * @returns Un objeto con `uploadURL` (para PUT) y `fileURL` (para guardar en la BD).
 */
const getPresignedUrl = async (file: File): Promise<PresignedUrlResponse> => {
  const url = getApiUrl("generatePresignedUrls", "POST");
  console.log('URL: ', url);

  const response = await api.post<PresignedUrlResponse>(url, {
    fileName: file.name,
    fileType: file.type,
  });

  return response.data;
};

/**
 * Sube un archivo a S3 utilizando la URL pre-firmada.
 * @param file Archivo a subir.
 * @returns La URL del archivo en S3.
 */
const uploadFileToS3 = async (file: File): Promise<string> => {
  const { uploadURL, fileURL } = await getPresignedUrl(file);

  const uploadResponse = await fetch(uploadURL, {
    method: "PUT",
    headers: { "Content-Type": file.type },
    body: file,
  });

  if (!uploadResponse.ok) {
    throw new Error("Error al subir el archivo a S3");
  }

  console.log("✅ Archivo subido correctamente:", fileURL);
  return fileURL; // Esta URL se guarda en la base de datos.
};

export { getPresignedUrl, uploadFileToS3 };
