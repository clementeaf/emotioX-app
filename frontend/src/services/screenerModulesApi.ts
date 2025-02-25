import { useScreenerStore } from '../store/useScreenerStore';
import { useWelcomeScreenStore } from '../store/useWelcomeScreenStore';
import { useImplicitAssociationStore } from '../store/useImplicitAssociationStore';
import { useCognitiveTaskStore } from '../store/useCognitiveTaskStore';
import { useEyeTrackingStore, EyeTrackingImage } from '../store/useEyeTrackingStore';
import { api } from './axiosConfig';

/**
 * Función para enviar los datos del Screener
 */
export const submitScreenerData = async (researchId: string): Promise<void> => {
  const screenerData = useScreenerStore.getState();
  const { questionText, options } = screenerData.getStringsAndSelection();

  if (!questionText || !options || options.length === 0) {
    throw new Error('Invalid screener data. Ensure questionText and options are provided.');
  }

  try {
    await api.post(`/screener`, { researchId, questionText, options });
    console.log('Screener submitted successfully');
  } catch (error) {
    console.error('Error submitting screener:', error);
    throw new Error('Failed to submit screener. Please try again.');
  }
};

/**
 * Función para enviar los datos de la Welcome Screen
 */
export const submitWelcomeScreenData = async (researchId: string): Promise<void> => {
  try {
    const { welcomeScreen } = useWelcomeScreenStore.getState();
    console.log('API: ', api)
    const response = await api.post(`/welcome-screen`, {
      ...welcomeScreen,
      researchId,
    });
    console.log('Welcome Screen submitted successfully:', response.data);
  } catch (error: any) {
    if (error.response) {
      console.error('Error Response:', error.response.data);
    } else if (error.request) {
      console.error('No Response Received:', error.request);
    } else {
      console.error('Unknown Error:', error.message);
    }
    throw new Error('Failed to submit Welcome Screen data. Please try again.');
  }
};


/**
 * Filtra y envía los datos del estado actual del store de ImplicitAssociation.
 * @param researchId - ID de la investigación asociada.
 * @returns Promesa que resuelve cuando los datos son enviados.
 */
export const submitImplicitAssociationData = async (researchId: string): Promise<void> => {
  try {
    const store = useImplicitAssociationStore.getState();

    // Solo enviar si todas las imágenes están en S3
    if (store.targets.some(t => t.image?.tempFile instanceof File)) {
      throw new Error('Please wait for S3 upload to complete');
    }

    const formattedTargets = store.targets.map(target => {
      // Extraer solo la extensión del formato MIME
      const format = target.image?.format?.split('/')[1] || "";
      
      return {
        id: target.id,
        nameOfObject: target.nameOfObject || "",
        imageUploaded: target.image?.url || "",
        imageFormat: format,
        image: target.image ? {
          fileName: target.image.fileName,
          url: target.image.url || "",
          format: format,
          size: target.image.size,
          uploadedAt: target.image.uploadedAt,
          error: target.image.error
        } : null
      };
    });

    const payload = {
      researchId,
      required: store.required,
      targets: formattedTargets,
      textAreas: store.textAreas,
      testConfigurations: store.testConfigurations,
    };
    console.log("🚀 Payload to backend:", payload);

    await api.post("/implicit-association", payload);
  } catch (error) {
    console.error("❌ Error submitting data:", error);
    throw error;
  }
};


/**
 * Función para enviar los datos de la Cognitive Task
 */
export const submitCognitiveTaskData = async (researchId: string): Promise<void> => {
  try {
    const store = useCognitiveTaskStore.getState();
    const { required, questions, isUploading } = store;
    
    // Check if uploads are still in progress
    if (isUploading) {
      console.log("⏳ Upload still in progress, waiting...");
      throw new Error('Please wait for all images to be uploaded to S3');
    }
    
    // Verificar que todas las imágenes estén subidas a S3
    const pendingUploads = questions.some(q => {
      const hasPendingImages = q.images.some(img => img.tempFile || !img.url);
      if (hasPendingImages) {
        console.log(`⚠️ Question ${q.id} has pending uploads:`, 
          q.images.map(img => ({
            fileName: img.fileName,
            hasTempFile: Boolean(img.tempFile),
            hasUrl: Boolean(img.url)
          }))
        );
      }
      return hasPendingImages;
    });

    if (pendingUploads) {
      console.log("❌ Found pending uploads, cannot submit yet");
      throw new Error('Please wait for all images to be uploaded to S3');
    }
    
    // Log detallado del estado inicial
    const relevantQuestions = questions.filter(q => q.choiceType === "multipleImages");
    console.log("🔍 Estado detallado de preguntas con múltiples imágenes:", 
      relevantQuestions.map(q => ({
        id: q.id,
        totalImages: q.images.length,
        imageDetails: q.images.map(img => ({
          fileName: img.fileName,
          url: img.url,
          hasUrl: Boolean(img.url),
          hasTempFile: Boolean(img.tempFile)
        }))
      }))
    );

    const formattedQuestions = questions.map((q) => {
      const baseData = {
        id: q.id,
        question: q.question,
        isVisible: q.isVisible,
        required: q.required,
        placeholder: q.placeholder,
        fileUploadLabel: q.fileUploadLabel,
        deviceFrameOptions: q.deviceFrameOptions,
        selectedFrame: q.selectedFrame,
        inputText: q.inputText,
        selectedOption: q.selectedOption,
        showConditionality: q.showConditionality,
        choiceType: q.choiceType,
        choices: q.choices,
        randomizeChoices: q.randomizeChoices,
        showOtherOption: q.showOtherOption,
      };

      // Procesar imágenes con logs detallados
      console.log(`\n🔍 Procesando imágenes para pregunta ${q.id}:`);
      console.log('Estado inicial de imágenes:', q.images);
      
      const processedImages = q.images
        .filter(img => {
          const hasUrl = Boolean(img.url);
          console.log(`Imagen ${img.fileName}: tiene URL? ${hasUrl}`, img.url);
          return hasUrl;
        })
        .map((img) => {
          const processed = {
            fileName: img.fileName,
            url: img.url,
            format: img.format,
            size: img.size ? (img.size / (1024 * 1024)).toFixed(2) : 0,
            uploadedAt: img.uploadedAt,
            time: img.time || 0,
            error: img.error || false,
          };
          console.log(`Imagen procesada ${img.fileName}:`, processed);
          return processed;
        });

      console.log(`Total de imágenes procesadas para pregunta ${q.id}:`, processedImages.length);

      // Si es una pregunta con una sola imagen
      if (q.choiceType !== "multipleImages") {
        const result = {
          ...baseData,
          image: processedImages[0] || null,
          images: []
        };
        console.log(`Pregunta ${q.id} (single):`, { image: result.image });
        return result;
      }

      // Para preguntas con múltiples imágenes
      const urls = processedImages.map(img => img.url);
      console.log(`URLs finales para pregunta ${q.id}:`, urls);
      
      const result = {
        ...baseData,
        images: urls,
        image: null
      };
      console.log(`Pregunta ${q.id} (multiple) - Resultado final:`, { 
        images: result.images,
        totalImages: result.images.length 
      });
      return result;
    });

    const payload = { researchId, required, questions: formattedQuestions };
    console.log("🚀 Payload final a enviar:", JSON.stringify(payload, null, 2));

    // Verificación final de imágenes en preguntas multipleImages
    const multipleImagesQuestions = payload.questions.filter(q => q.choiceType === "multipleImages");
    console.log("📊 Verificación final de preguntas con múltiples imágenes:", 
      multipleImagesQuestions.map(q => ({
        id: q.id,
        totalImages: q.images.length,
        images: q.images
      }))
    );

    const response = await api.post("/cognitive-task", payload);
    console.log("✅ Cognitive Task data submitted successfully:", response.data);
  } catch (error) {
    console.error("❌ Error submitting Cognitive Task data:", error);
    throw error;
  }
};


/**
 * Función para enviar los datos del Eye Tracking
 */
export const submitEyeTrackingData = async (researchId: string): Promise<void> => {
  try {
    // Obtener datos del estado
    const eyeTrackingData = useEyeTrackingStore.getState();

    // Validación básica
    const validateEyeTrackingData = (data: typeof eyeTrackingData) => {
      if (!researchId) {
        throw new Error("Research ID is required.");
      }
      if (!data.taskInstruction || data.taskInstruction.trim() === "") {
        throw new Error("Task instruction is required.");
      }
      if (data.uploadedImages.some((file: EyeTrackingImage) => !file.fileName || file.fileSize === undefined)) {
        throw new Error("Uploaded files must have a valid fileName and fileSize.");
      }
    };

    validateEyeTrackingData(eyeTrackingData);

    // Formatear datos para enviar al backend
    const formattedData = {
      researchId,
      required: eyeTrackingData.required,
      taskInstruction: eyeTrackingData.taskInstruction,
      uploadedFiles: eyeTrackingData.uploadedImages
        .filter((file: EyeTrackingImage) => file.fileName && file.fileSize !== undefined)
        .map((file: EyeTrackingImage) => ({
          fileName: file.fileName,
          fileSize: file.fileSize,
          url: file.uploadedImage?.url || null,
          format: file.uploadedImage?.format || null,
          uploadedAt: file.uploadedImage?.uploadedAt || null,
          time: file.time || 0,
          error: file.error || false
        })),
      randomize: eyeTrackingData.randomize,
      isShelfTask: eyeTrackingData.isShelfTask,
      resizeImage: eyeTrackingData.resizeImage,
      useEyeTrackingDevice: eyeTrackingData.useEyeTrackingDevice,
      useWebcamBasedTracking: eyeTrackingData.useWebcamBasedTracking,
      enableClickMeasurement: eyeTrackingData.enableClickMeasurement,
      finishOnAnyKey: eyeTrackingData.finishOnAnyKey,
      holdDeviceVertical: eyeTrackingData.holdDeviceVertical,
      holdDeviceHorizontal: eyeTrackingData.holdDeviceHorizontal,
      displayTime: eyeTrackingData.displayTime,
    };

    // Enviar datos al backend
    const response = await api.post(`/eye-tracking-task`, formattedData);
    console.log("Eye Tracking data submitted successfully:", response.data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error submitting Eye Tracking data:", errorMessage);
    throw new Error(errorMessage || "Failed to submit Eye Tracking data. Please try again.");
  }
};


/**
 * Función para enviar los datos de la Thank You Screen
 */
export const submitThankYouScreenData = async (researchId: string): Promise<void> => {
  try {
    // Obtener datos del store
    const { thankYouScreen } = useWelcomeScreenStore.getState();

    // Validar que `thankYouScreen` tenga los campos requeridos
    if (!thankYouScreen) {
      throw new Error("Thank You Screen data is missing.");
    }

    // Enviar datos al backend
    const response = await api.post(`/thank-you-screen`, {
      ...thankYouScreen,
      researchId,
    });

    console.log("Thank You Screen data submitted successfully:", response.data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unexpected error occurred.";
    console.error("Error submitting Thank You Screen data:", errorMessage);
    throw new Error(errorMessage);
  }
};


export default {
  submitScreenerData,
  submitWelcomeScreenData,
  submitImplicitAssociationData,
  submitCognitiveTaskData,
  submitEyeTrackingData,
  submitThankYouScreenData,
};
