import { uploadFileToS3 } from "./uploadImageToS3";
import { UploadedImage } from "../types/types";
import { Question } from "../store/useCognitiveTaskStore";

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
  updateMultipleImages: (id: number, images: UploadedImage[]) => void,
  getStoreState: () => { questions: Question[] }
) => {
  if (filesToUpload.length === 0) {
    console.log("✅ No files to upload.");
    return;
  }

  try {
    const state = getStoreState();
    if (!state || !Array.isArray(state.questions)) {
      console.error("❌ Invalid store state or questions array");
      return;
    }

    // Agrupamos los archivos por ID de pregunta
    const filesByQuestionId = filesToUpload.reduce((acc, { id, file, isMultiple }) => {
      if (!acc[id]) {
        acc[id] = { files: [], isMultiple };
      }
      acc[id].files.push(file);
      return acc;
    }, {} as Record<number, { files: File[], isMultiple: boolean }>);

    // Procesamos cada grupo de archivos
    await Promise.all(
      Object.entries(filesByQuestionId).map(async ([questionId, { files, isMultiple }]) => {
        try {
          const question = state.questions.find(q => q.id === parseInt(questionId));
          
          if (!question) {
            console.error(`❌ Question with ID ${questionId} not found in store`);
            return;
          }

          if (isMultiple && question.choiceType === "multipleImages") {
            // Obtenemos las imágenes existentes que ya tienen URL de S3
            const existingImages = question.uploadedImages?.filter((img: UploadedImage) => img.url) || [];
            
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
            
            // Combinamos las imágenes existentes con las nuevas
            const allImages = [...existingImages, ...validNewImages];
            console.log(`✅ Multiple files uploaded for question ID ${questionId}:`, allImages);
            updateMultipleImages(parseInt(questionId), allImages);
          } else if (!isMultiple) {
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
              
              console.log(`✅ Single file uploaded for question ID ${questionId}:`, uploadedImage);
              updateSingleImage(parseInt(questionId), uploadedImage);
            } catch (error) {
              console.error(`❌ Error uploading single file for question ${questionId}:`, error);
              throw error;
            }
          }
        } catch (err) {
          console.error(`❌ Error processing files for question ID ${questionId}:`, err);
          throw err;
        }
      })
    );
  } catch (error) {
    console.error("❌ Error uploading files:", error);
    throw error;
  }
};
