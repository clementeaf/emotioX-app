import { uploadFileToS3, uploadMultipleFilesToS3 } from "./uploadImageToS3";
import { UploadedImage } from "../types/types";
import { useCognitiveTaskStore } from "../store/useCognitiveTaskStore";

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

  // Set uploading state to true at start
  const store = useCognitiveTaskStore.getState();
  store.setIsUploading(true);

  try {
    console.log("🚀 Starting upload process for files:", filesToUpload.map(f => f.file.name));

    // Agrupamos los archivos por ID
    const filesByQuestionId = filesToUpload.reduce((acc, { id, file, isMultiple }) => {
      if (!acc[id]) {
        acc[id] = { files: [], isMultiple };
      }
      acc[id].files.push(file);
      return acc;
    }, {} as Record<number, { files: File[], isMultiple: boolean }>);

    // Procesamos cada grupo de archivos
    const uploadPromises = Object.entries(filesByQuestionId).map(async ([id, { files, isMultiple }]) => {
      try {
        const numericId = parseInt(id);
        
        if (isMultiple) {
          console.log(`📤 Uploading ${files.length} files for question ${id}:`, files.map(f => f.name));
          
          // Subir todos los archivos en paralelo
          const s3Urls = await uploadMultipleFilesToS3(files);
          
          const uploadedImages = files.map((file, index) => ({
            id: `${Date.now()}-${file.name}`,
            fileName: file.name,
            url: s3Urls[index],
            format: file.type,
            size: file.size,
            uploadedAt: new Date(),
            time: 0,
            error: false
          }));

          console.log(`✅ All files uploaded for question ${id}:`, uploadedImages.map(img => img.fileName));
          
          // Actualizar el estado con todas las imágenes a la vez
          if (updateMultipleImages) {
            updateMultipleImages(numericId, uploadedImages);
          } else {
            // Si no hay updateMultipleImages, actualizamos una por una
            for (const image of uploadedImages) {
              updateImage(numericId, image);
              // Pequeña pausa entre actualizaciones para evitar problemas de estado
              await new Promise(resolve => setTimeout(resolve, 100));
            }
          }
        } else {
          console.log(`📤 Uploading single file for question ${id}:`, files[0].name);
          const s3Url = await uploadFileToS3(files[0]);
          
          const uploadedImage: UploadedImage = {
            id: `${Date.now()}-${files[0].name}`,
            fileName: files[0].name,
            url: s3Url,
            format: files[0].type,
            size: files[0].size,
            uploadedAt: new Date(),
            time: 0,
            error: false
          };
          
          console.log(`✅ Single file uploaded for question ${id}:`, uploadedImage.fileName);
          updateImage(numericId, uploadedImage);
        }
      } catch (err) {
        console.error(`❌ Error processing files for question ${id}:`, err);
        throw err;
      }
    });

    // Esperar a que TODAS las subidas terminen
    await Promise.all(uploadPromises);
    
    // Esperar un momento adicional para asegurar que el estado se ha actualizado completamente
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("✅ All files have been uploaded successfully");
    store.setIsUploading(false);
  } catch (error) {
    console.error("❌ Error during file upload process:", error);
    useCognitiveTaskStore.getState().setIsUploading(false);
    throw error;
  }
};
