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

          const uploadedUrl = await uploadFileToS3(file);
          console.log(`✅ File uploaded for ID ${id}: ${uploadedUrl}`);

          const uploadedImage: UploadedImage = {
            id: `${Date.now()}-${file.name}`,
            fileName: file.name,
            url: uploadedUrl,
            size: file.size,
            format: file.type,
            uploadedAt: new Date(),
            time: undefined
          };

          // ✅ **Actualizar el `store` según el tipo de imagen**
          if (isMultiple) {
            console.log(`🔄 Antes de actualizar store para ID ${id}:`, getStoreState());
            updateMultipleImages(id, uploadedImage);
            console.log(`✅ Después de actualizar store para ID ${id}:`, getStoreState());
          } else {
            updateSingleImage(id, uploadedImage);
          }

          console.log(`✅ Imagen con ID ${id} actualizada en el store con URL: ${uploadedUrl}`);
        } catch (err) {
          console.error(`❌ Error uploading file for ID ${id}:`, err);
        }
      })
    );
  } catch (error) {
    console.error("❌ Error uploading files:", error);
  }
};
