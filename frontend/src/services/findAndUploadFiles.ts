import { uploadFileToS3 } from "../services/uploadImageToS3";
import { UploadedImage } from "../types/types";

/**
 * Sube archivos a S3 y actualiza el estado con la URL obtenida.
 * @param filesToUpload - Lista de archivos a subir con sus IDs.
 * @param updateUploadedImage - Función para actualizar el estado con la URL del archivo subido.
 */
/** ✅ Ahora distingue entre `singleImage` y `multipleImages` */
export const findAndUploadFiles = async (
  filesToUpload: { id: number; file: File; isMultiple: boolean }[],
  updateSingleImage: (id: number, image: UploadedImage) => void,
  updateMultipleImages: (id: number, image: UploadedImage) => void
) => {
  if (filesToUpload.length === 0) {
    console.log("✅ No files to upload.");
    return;
  }

  try {
    await Promise.all(
      filesToUpload.map(async ({ id, file, isMultiple }) => {
        try {
          const uploadedUrl = await uploadFileToS3(file); // 🔄 Subida a S3
          console.log(`✅ File uploaded for ID ${id}: ${uploadedUrl}`);

          const uploadedImage: UploadedImage = {
            id: `${Date.now()}-${file.name}`,
            fileName: file.name,
            url: uploadedUrl,
            size: file.size,
            format: file.type,
            uploadedAt: new Date(),
          };

          // ✅ **Actualizar el `store` según el tipo de imagen**
          if (isMultiple) {
            updateMultipleImages(id, uploadedImage); // ✅ `multipleImages`
          } else {
            updateSingleImage(id, uploadedImage); // ✅ `singleImage`
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

