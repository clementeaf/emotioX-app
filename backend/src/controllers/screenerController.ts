import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import ScreenerSchema from '../models/screenerSchema';
import { errorResponse, MESSAGES, successResponse, validateScreenerFields } from '../utils';
import connectDB from '../config/database';

/**
 * Crea un nuevo Screener asociado a una investigación.
 */
export const createScreener = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    await connectDB();

    const { researchId, questionText, options } = JSON.parse(event.body || '{}');

    // Validar campos requeridos
    const { isValid, errorMessage } = validateScreenerFields(researchId, questionText, options);
    if (!isValid) {
      return errorResponse(400, errorMessage || MESSAGES.SCREENER.MISSING_FIELDS);
    }

    // Crear el Screener
    const screener = await ScreenerSchema.create({ researchId, questionText, options });
    return successResponse(201, screener);
  } catch (error) {
    console.error('Error creating screener:', error);
    return errorResponse(500, MESSAGES.SCREENER.FAILED_TO_CREATE);
  }
};

/**
 * Obtiene un Screener basado en el `researchId`.
 */
export const getScreenerByResearch = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    await connectDB();

    const researchId = event.pathParameters?.researchId;

    if (!researchId) {
      return errorResponse(400, MESSAGES.SCREENER.MISSING_FIELDS);
    }

    const screener = await ScreenerSchema.findOne({ researchId });
    if (!screener) {
      return errorResponse(404, MESSAGES.SCREENER.NOT_FOUND);
    }

    return successResponse(200, screener);
  } catch (error) {
    console.error('Error fetching screener:', error);
    return errorResponse(500, MESSAGES.SCREENER.NOT_FOUND);
  }
};

/**
 * Actualiza un Screener existente asociado a una investigación.
 */
export const updateScreener = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    await connectDB();

    const researchId = event.pathParameters?.researchId;
    const { questionText, options } = JSON.parse(event.body || '{}');

    // Validar campos requeridos
    const { isValid, errorMessage } = validateScreenerFields(researchId, questionText, options);
    if (!isValid) {
      return errorResponse(400, errorMessage || MESSAGES.SCREENER.MISSING_FIELDS);
    }

    const updatedScreener = await ScreenerSchema.findOneAndUpdate(
      { researchId },
      { questionText, options },
      { new: true }
    );

    if (!updatedScreener) {
      return errorResponse(404, MESSAGES.SCREENER.NOT_FOUND);
    }

    return successResponse(200, updatedScreener);
  } catch (error) {
    console.error('Error updating screener:', error);
    return errorResponse(500, MESSAGES.SCREENER.FAILED_TO_UPDATE);
  }
};

/**
 * Elimina un Screener basado en el `screenerId`.
 */
export const deleteScreener = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    await connectDB();

    const screenerId = event.pathParameters?.screenerId;

    if (!screenerId) {
      return errorResponse(400, MESSAGES.SCREENER.MISSING_FIELDS);
    }

    const deletedScreener = await ScreenerSchema.findByIdAndDelete(screenerId);
    if (!deletedScreener) {
      return errorResponse(404, MESSAGES.SCREENER.NOT_FOUND);
    }

    return successResponse(200, { message: MESSAGES.SCREENER.DELETE_SUCCESS });
  } catch (error) {
    console.error('Error deleting screener:', error);
    return errorResponse(500, MESSAGES.SCREENER.FAILED_TO_DELETE);
  }
};
