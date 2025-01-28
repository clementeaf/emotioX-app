import { useScreenerStore } from '../store/useScreenerStore';
import { useWelcomeScreenStore } from '../store/useWelcomeScreenStore';
import { useImplicitAssociationStore } from '../store/useImplicitAssociationStore';
import { useCognitiveTaskStore } from '../store/useCognitiveTaskStore';
import { useEyeTrackingStore } from '../store/useEyeTrackingStore';
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
    console.log('API: ', api )
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
 * Función para enviar los datos de la Implicit Association
 */
export const submitImplicitAssociationData = async (researchId: string): Promise<void> => {
  const implicitAssociationData = useImplicitAssociationStore.getState();
  await api.post(`/implicit-association`, { ...implicitAssociationData, researchId });
};

/**
 * Función para enviar los datos de la Cognitive Task
 */
export const submitCognitiveTaskData = async (researchId: string): Promise<void> => {
  const cognitiveTaskData = useCognitiveTaskStore.getState();
  await api.post(`/cognitive-task`, { ...cognitiveTaskData, researchId });
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
