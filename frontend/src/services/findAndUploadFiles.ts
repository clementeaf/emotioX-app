import { uploadFileToS3 } from "./uploadImageToS3";
import { UploadedImage } from "../types/types";

type UpdateImageFunction = (idOrFileName: number | string, image: UploadedImage) => void;

/**
 * ✅ Función global para subir archivos a S3 y actualizar cualquier store dinámicamente.
 * @param filesToUpload - Lista de archivos a subir con sus IDs.
 * @param updateImage - Función para actualizar una imagen en el store (single o multiple).
 * @param updateMultipleImages - Función opcional para actualizar múltiples imágenes.
 */
export const findAndUploadFiles = async (
  filesToUpload: { id: number; file: File; isMultiple: boolean }[],
  updateImage: UpdateImageFunction,
  updateMultipleImages?: (id: number, images: UploadedImage[]) => void
) => {
  if (filesToUpload.length === 0) {
    console.log("✅ No files to upload.");
    return;
  }

  try {
    // Agrupamos los archivos por ID
    const filesByQuestionId = filesToUpload.reduce((acc, { id, file, isMultiple }) => {
      if (!acc[id]) {
        acc[id] = { files: [], isMultiple };
      }
      acc[id].files.push(file);
      return acc;
    }, {} as Record<number, { files: File[], isMultiple: boolean }>);

    // Procesamos cada grupo de archivos
    await Promise.all(
      Object.entries(filesByQuestionId).map(async ([id, { files, isMultiple }]) => {
        try {
          if (isMultiple && updateMultipleImages) {
            // Subimos las nuevas imágenes
            const newUploadedImages = await Promise.all(
              files.map(async (file) => {
                try {
                  const s3Url = await uploadFileToS3(file);
                  console.log(`✅ File uploaded to S3: ${file.name} -> ${s3Url}`);
                  return {
                    id: `${Date.now()}-${file.name}`,
                    fileName: file.name,
                    url: s3Url,
                    format: file.type,
                    size: file.size,
                    uploadedAt: new Date(),
                    time: 0,
                    error: false
                  } as UploadedImage;
                } catch (error) {
                  console.error(`❌ Error uploading file ${file.name}:`, error);
                  return null;
                }
              })
            );
            
            // Filtramos las imágenes que se subieron correctamente
            const validNewImages = newUploadedImages.filter((img): img is UploadedImage => img !== null);
            
            console.log(`✅ Multiple files uploaded for ID ${id}:`, validNewImages);
            updateMultipleImages(parseInt(id), validNewImages);
          } else {
            // Para imagen única, subimos solo el primer archivo
            const file = files[0];
            try {
              const s3Url = await uploadFileToS3(file);
              console.log(`✅ Single file uploaded to S3: ${file.name} -> ${s3Url}`);
              const uploadedImage: UploadedImage = {
                id: `${Date.now()}-${file.name}`,
                fileName: file.name,
                url: s3Url,
                format: file.type,
                size: file.size,
                uploadedAt: new Date()
              };
              
              console.log(`✅ Single file uploaded for ID ${id}:`, uploadedImage);
              // Usamos la función genérica de actualización
              updateImage(parseInt(id), uploadedImage);
            } catch (error) {
              console.error(`❌ Error uploading single file for ID ${id}:`, error);
              throw error;
            }
          }
        } catch (err) {
          console.error(`❌ Error processing files for ID ${id}:`, err);
          throw err;
        }
      })
    );
  } catch (error) {
    console.error("❌ Error uploading files:", error);
    throw error;
  }
};
