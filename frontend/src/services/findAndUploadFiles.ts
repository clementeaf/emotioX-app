import { uploadFileToS3 } from "../services/uploadImageToS3";
import { UploadedImage } from "../types/types";

/**
 * ✅ Función global para subir archivos a S3 y actualizar cualquier store dinámicamente.
 * @param filesToUpload - Lista de archivos a subir con sus IDs.
 * @param updateSingleImage - Función para actualizar una imagen única en el store.
 * @param updateMultipleImages - Función para actualizar imágenes múltiples en el store.
 * @param getStoreState - Función para obtener el estado actual del store.
 */
export const findAndUploadFiles = async (
  filesToUpload: { id: number; file: File; isMultiple: boolean }[],
  updateSingleImage: (id: number, image: UploadedImage) => void,
  updateMultipleImages: (id: number, image: UploadedImage) => void,
  getStoreState: () => any // ✅ Obtener estado dinámico sin hardcodear stores
) => {
  if (filesToUpload.length === 0) {
    console.log("✅ No files to upload.");
    return;
  }

  try {
    await Promise.all(
      filesToUpload.map(async ({ id, file, isMultiple }) => {
        try {
          // 🔍 Inspeccionamos el archivo antes de subirlo
          console.log(`📂 Archivo a subir (ID ${id}):`, {
            fileName: file.name,
            fileSize: file.size,
            fileType: file.type,
          });

          const s3Url = await uploadFileToS3(file);
          console.log(`✅ File uploaded for ID ${id}: ${s3Url}`);

          // Actualizar el store con la URL de S3
          updateSingleImage(id, {
            id: `${Date.now()}-${file.name}`,
            url: s3Url,
            fileName: file.name,
            format: file.type,
            time: undefined
          });

          // Limpiar el archivo temporal
          await new Promise(resolve => setTimeout(resolve, 500));

          console.log(`✅ Imagen con ID ${id} actualizada en el store con URL: ${s3Url}`);
        } catch (err) {
          console.error(`❌ Error uploading file for ID ${id}:`, err);
          throw err;
        }
      })
    );
  } catch (error) {
    console.error("❌ Error uploading files:", error);
    throw error;
  }
};
