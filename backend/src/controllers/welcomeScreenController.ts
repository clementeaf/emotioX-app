import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { errorResponse, successResponse, validateFields, MESSAGES } from '../utils';
import connectDB from '../config/database';
import WelcomeScreenModel from '../models/welcomeScreen';

/**
 * Crea una nueva WelcomeScreen asociada a una investigación.
 */
export const createWelcomeScreen = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    await connectDB();

    const { researchId, isRequired, title, message, buttonText } = JSON.parse(event.body || '{}');

    // Validar campos requeridos
    const { isValid, errorMessage } = validateFields(
      { researchId, title, message, buttonText },
      ['researchId', 'title', 'message', 'buttonText']
    );
    if (!isValid) {
      return errorResponse(400, errorMessage || MESSAGES.WELCOME_SCREEN.MISSING_FIELDS);
    }

    // Crear WelcomeScreen
    const welcomeScreen = await WelcomeScreenModel.create({ researchId, isRequired, title, message, buttonText });

    return successResponse(201, welcomeScreen);
  } catch (error) {
    console.error('Error creating welcome screen:', error);
    return errorResponse(500, MESSAGES.WELCOME_SCREEN.FAILED_TO_CREATE);
  }
};

/**
 * Obtiene una WelcomeScreen basada en el `researchId`.
 */
export const getWelcomeScreenByResearch = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    await connectDB();

    const researchId = event.pathParameters?.researchId;

    if (!researchId) {
      return errorResponse(400, MESSAGES.WELCOME_SCREEN.MISSING_FIELDS);
    }

    const welcomeScreen = await WelcomeScreenModel.findOne({ researchId });
    if (!welcomeScreen) {
      return errorResponse(404, MESSAGES.WELCOME_SCREEN.NOT_FOUND);
    }

    return successResponse(200, welcomeScreen);
  } catch (error) {
    console.error('Error fetching welcome screen:', error);
    return errorResponse(500, MESSAGES.WELCOME_SCREEN.FAILED_TO_FETCH);
  }
};

/**
 * Actualiza una WelcomeScreen existente asociada a una investigación.
 */
export const updateWelcomeScreen = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    await connectDB();

    const researchId = event.pathParameters?.researchId;
    const { isRequired, title, message, buttonText } = JSON.parse(event.body || '{}');

    // Validar campos requeridos
    const { isValid, errorMessage } = validateFields(
      { researchId, title, message, buttonText },
      ['researchId', 'title', 'message', 'buttonText']
    );
    if (!isValid) {
      return errorResponse(400, errorMessage || MESSAGES.WELCOME_SCREEN.MISSING_FIELDS);
    }

    const updatedWelcomeScreen = await WelcomeScreenModel.findOneAndUpdate(
      { researchId },
      { isRequired, title, message, buttonText },
      { new: true }
    );

    if (!updatedWelcomeScreen) {
      return errorResponse(404, MESSAGES.WELCOME_SCREEN.NOT_FOUND);
    }

    return successResponse(200, updatedWelcomeScreen);
  } catch (error) {
    console.error('Error updating welcome screen:', error);
    return errorResponse(500, MESSAGES.WELCOME_SCREEN.FAILED_TO_UPDATE);
  }
};

/**
 * Elimina una WelcomeScreen basada en el `welcomeScreenId`.
 */
export const deleteWelcomeScreen = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    await connectDB();

    const welcomeScreenId = event.pathParameters?.welcomeScreenId;

    if (!welcomeScreenId) {
      return errorResponse(400, MESSAGES.WELCOME_SCREEN.MISSING_FIELDS);
    }

    const deletedWelcomeScreen = await WelcomeScreenModel.findByIdAndDelete(welcomeScreenId);

    if (!deletedWelcomeScreen) {
      return errorResponse(404, MESSAGES.WELCOME_SCREEN.NOT_FOUND);
    }

    return successResponse(200, { message: MESSAGES.WELCOME_SCREEN.DELETE_SUCCESS });
  } catch (error) {
    console.error('Error deleting welcome screen:', error);
    return errorResponse(500, MESSAGES.WELCOME_SCREEN.FAILED_TO_DELETE);
  }
};
