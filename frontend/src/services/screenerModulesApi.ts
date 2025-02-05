import { useScreenerStore } from '../store/useScreenerStore';
import { useWelcomeScreenStore } from '../store/useWelcomeScreenStore';
import { useImplicitAssociationStore } from '../store/useImplicitAssociationStore';
import { useCognitiveTaskStore } from '../store/useCognitiveTaskStore';
import { useEyeTrackingStore } from '../store/useEyeTrackingStore';
import { api } from './axiosConfig';
import { ImplicitAssociationSchema } from '../types/types';

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
    const { required, targets, textAreas, testConfigurations } = useImplicitAssociationStore.getState();

    console.log("🔍 Implicit Association Store Data:", useImplicitAssociationStore.getState());

    // ✅ Convertimos `targets` asegurando que `imageUploaded` contenga la URL de S3
    const formattedTargets = targets.map((target) => ({
      id: target.id,
      nameOfObject: target.nameOfObject || undefined,
      imageUploaded: target.uploadedImage?.url || undefined, // ✅ Ahora es `string | undefined`
      imageFormat: target.imageFormat || undefined,
    }));

    // ✅ Creamos el payload final con la estructura correcta
    const payload: ImplicitAssociationSchema = {
      researchId,
      required,
      targets: formattedTargets,
      textAreas,
      testConfigurations,
    };

    console.log("🚀 Payload to be sent:", payload);

    // ✅ Enviamos los datos al backend
    const response = await api.post("/implicit-association", payload);
    console.log("✅ Implicit Association data submitted successfully:", response.data);
  } catch (error) {
    console.error("❌ Error submitting Implicit Association data:", error);
    throw new Error("Failed to submit Implicit Association data. Please try again.");
  }
};


/**
 * Función para enviar los datos de la Cognitive Task
 */
export const submitCognitiveTaskData = async (researchId: string): Promise<void> => {
  try {
    const { required, questions } = useCognitiveTaskStore.getState();

    // ✅ Formatear correctamente las preguntas antes de enviarlas
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

      // ✅ Si es una pregunta con una sola imagen
      if ("uploadedImage" in q) {
        return {
          ...baseData,
          uploadedImage: q.uploadedImage
            ? {
                fileName: q.uploadedImage.fileName,
                url: q.uploadedImage.url,
                format: q.uploadedImage.format,
                size: q.uploadedImage.size,
                uploadedAt: q.uploadedImage.uploadedAt,
              }
            : null,
        };
      }

      // ✅ Si es una pregunta con múltiples imágenes
      if ("uploadedImages" in q) {
        return {
          ...baseData,
          uploadedImages: q.uploadedImages.map((img) => ({
            fileName: img.fileName,
            url: img.url,
            format: img.format,
            size: img.size,
            uploadedAt: img.uploadedAt,
          })),
        };
      }

      return baseData;
    });

    const payload = { researchId, required, questions: formattedQuestions };

    console.log("🚀 Payload to backend:", payload);

    // ✅ Enviar datos al backend
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
      if (data.uploadedFiles.some(file => !file.fileName || file.fileSize === undefined)) {
        throw new Error("Uploaded files must have a valid fileName and fileSize.");
      }
    };

    validateEyeTrackingData(eyeTrackingData);

    // Formatear datos para enviar al backend
    const formattedData = {
      researchId,
      required: eyeTrackingData.required,
      taskInstruction: eyeTrackingData.taskInstruction,
      uploadedFiles: eyeTrackingData.uploadedFiles.map(file => ({
        fileName: file.fileName || null, // Tolerancia a campos vacíos
        fileSize: file.fileSize || null,
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
