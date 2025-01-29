import { useScreenerStore } from '../store/useScreenerStore';
import { useWelcomeScreenStore } from '../store/useWelcomeScreenStore';
import { useImplicitAssociationStore } from '../store/useImplicitAssociationStore';
import { useCognitiveTaskStore } from '../store/useCognitiveTaskStore';
import { useEyeTrackingStore } from '../store/useEyeTrackingStore';
import { api } from './axiosConfig';
import { fileToBase64, validateTargets } from '../utils';

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

    // Filtrar targets vacíos (sin nameOfObject ni imageUploaded)
    const validTargets = targets.filter(
      (target) => target.nameOfObject?.trim() || target.imageUploaded
    );

    // Validar los targets restantes
    validateTargets(validTargets);

    // Formatear los targets, convirtiendo las imágenes a Base64
    const formattedTargets = await Promise.all(
      validTargets.map(async (target) => {
        let imageBase64 = null;

        if (target.imageUploaded) {
          // Convertir archivo a Base64
          imageBase64 = await fileToBase64(target.imageUploaded);
        }

        return {
          id: target.id,
          nameOfObject: target.nameOfObject || null,
          imageUploaded: imageBase64, // Base64 de la imagen o null
          imageFormat: target.imageFormat || null,
        };
      })
    );

    // Crear el payload
    const payload = {
      researchId,
      required,
      targets: formattedTargets,
      textAreas,
      testConfigurations,
    };

    // Enviar datos al backend
    const response = await api.post("/implicit-association", payload);
    console.log("Implicit Association data submitted successfully:", response.data);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error submitting Implicit Association data:", error.message);
      throw new Error(error.message || "Failed to submit Implicit Association data. Please try again.");
    }
    throw new Error("Unexpected error occurred.");
  }
};

/**
 * Función para enviar los datos de la Cognitive Task
 */
export const submitCognitiveTaskData = async (researchId: string): Promise<void> => {
  try {
    // Obtener datos del store
    const cognitiveTaskData = useCognitiveTaskStore.getState();

    const validateCognitiveTaskData = (data: typeof cognitiveTaskData) => {
      if (!data.questions || !Array.isArray(data.questions) || data.questions.length === 0) {
        throw new Error("Questions array is required and must not be empty.");
      }

      data.questions.forEach((q, index) => {
        if (!q.id || !q.question || !q.choiceType) {
          throw new Error(
            `Question at index ${index} is missing required fields: 'id', 'question', or 'choiceType'.`
          );
        }
      });
    };

    // Validar los datos
    validateCognitiveTaskData(cognitiveTaskData);

    const formatQuestions = (questions: typeof cognitiveTaskData.questions) => {
      return questions.map((q) => ({
        id: q.id,
        question: q.question,
        choiceType: q.choiceType,
        isVisible: q.isVisible ?? true,
        required: q.required ?? false,
        placeholder: q.placeholder ?? "",
        fileUploadLabel: q.fileUploadLabel ?? "",
        deviceFrameOptions: q.deviceFrameOptions || [],
        selectedFrame: q.selectedFrame || "No Frame",
        inputText: q.inputText || "",
        selectedOption: q.selectedOption || "",
        // Eliminar lógica de Buffer
        uploadedFile: q.uploadedFile || null,
        uploadedImages: q.uploadedImages || [],
        showConditionality: q.showConditionality ?? false,
        choices: q.choices || [],
        randomizeChoices: q.randomizeChoices ?? false,
        showOtherOption: q.showOtherOption ?? false,
      }));
    };


    // Formatear las preguntas antes de enviarlas
    const formattedQuestions = formatQuestions(cognitiveTaskData.questions);

    // Enviar datos al backend
    const response = await api.post(`/cognitive-task`, {
      ...cognitiveTaskData,
      questions: formattedQuestions,
      researchId,
    });

    console.log("Cognitive Task data submitted successfully:", response.data);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error submitting Cognitive task data:", error.message);
      throw new Error(error.message || "Failed to submit Cognitive task data. Please try again.");
    }
    throw new Error("Unexpected error occurred.");
  }
};


/**
 * Función para enviar los datos del Eye Tracking
 */
export const submitEyeTrackingData = async (researchId: string): Promise<void> => {
  const eyeTrackingData = useEyeTrackingStore.getState();
  await api.post(`/eye-tracking`, { ...eyeTrackingData, researchId });
};

/**
 * Función para enviar los datos de la Thank You Screen
 */
export const submitThankYouScreenData = async (researchId: string): Promise<void> => {
  const { thankYouScreen } = useWelcomeScreenStore.getState();
  await api.post(`/thank-you-screen`, { ...thankYouScreen, researchId });
};

export default {
  submitScreenerData,
  submitWelcomeScreenData,
  submitImplicitAssociationData,
  submitCognitiveTaskData,
  submitEyeTrackingData,
  submitThankYouScreenData,
};
