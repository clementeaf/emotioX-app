import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import ScreenerSchema from '../models/screenerSchema';
import { errorResponse, MESSAGES, successResponse, validateScreenerFields } from '../utils';
import connectDB from '../config/database';

/**
 * Crea un nuevo Screener asociado a una investigación.
 * 
 * @param event - Evento de AWS Lambda que contiene el cuerpo de la solicitud con `researchId`, `questionText` y `options`.
 * @returns {Promise<APIGatewayProxyResult>} 
 * - 201: Screener creado exitosamente.
 * - 400: Faltan campos requeridos.
 * - 500: Error al crear el Screener.
 */
export const createScreener = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    await connectDB();

    const { researchId, questionText, options } = JSON.parse(event.body || '{}');
    console.log('ResearchID: ', researchId);
    console.log('questionText: ', questionText);

    // Validar campos requeridos
    const { isValid, errorMessage } = validateScreenerFields(researchId, questionText, options);
    if (!isValid) {
      return errorResponse(400, errorMessage || MESSAGES.MISSING_FIELDS);
    }

    // Crear el Screener
    const screener = await ScreenerSchema.create({ researchId, questionText, options });
    return successResponse(201, screener);
  } catch (error) {
    console.error('Error creating screener:', error);
    return errorResponse(500, MESSAGES.FAILED_TO_CREATE);
  }
};

/**
 * Obtiene un Screener basado en el `researchId`.
 * 
 * @param event - Evento de AWS Lambda con `pathParameters.researchId` especificado.
 * @returns {Promise<APIGatewayProxyResult>}
 * - 200: Screener encontrado y devuelto.
 * - 400: Faltan campos requeridos (`researchId`).
 * - 404: Screener no encontrado.
 * - 500: Error al buscar el Screener.
 */
export const getScreenerByResearch = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const researchId = event.pathParameters?.researchId;

    if (!researchId) {
      return errorResponse(400, MESSAGES.MISSING_FIELDS);
    }

    const screener = await ScreenerSchema.findOne({ researchId });
    if (!screener) {
      return errorResponse(404, MESSAGES.SCREENER_NOT_FOUND);
    }

    return successResponse(200, screener);
  } catch (error) {
    console.error('Error fetching screener:', error);
    return errorResponse(500, MESSAGES.SCREENER_NOT_FOUND);
  }
};

/**
 * Actualiza un Screener existente asociado a una investigación.
 * 
 * @param event - Evento de AWS Lambda que contiene:
 * - `pathParameters.researchId`: ID de la investigación.
 * - `body`: Objeto JSON con `questionText` y `options`.
 * @returns {Promise<APIGatewayProxyResult>}
 * - 200: Screener actualizado exitosamente.
 * - 400: Faltan campos requeridos o datos inválidos.
 * - 404: Screener no encontrado.
 * - 500: Error al actualizar el Screener.
 */
export const updateScreener = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const researchId = event.pathParameters?.researchId;
    const { questionText, options } = JSON.parse(event.body || '{}');

    // Validar campos requeridos
    const { isValid, errorMessage } = validateScreenerFields(researchId, questionText, options);
    if (!isValid) {
      return errorResponse(400, errorMessage || MESSAGES.MISSING_FIELDS);
    }

    // Actualizar el Screener
    const updatedScreener = await ScreenerSchema.findOneAndUpdate(
      { researchId },
      { questionText, options },
      { new: true }
    );

    if (!updatedScreener) {
      return errorResponse(404, MESSAGES.SCREENER_NOT_FOUND);
    }

    return successResponse(200, updatedScreener);
  } catch (error) {
    console.error('Error updating screener:', error);
    return errorResponse(500, MESSAGES.FAILED_TO_UPDATE);
  }
};

/**
 * Elimina un Screener basado en el `screenerId`.
 * 
 * @param event - Evento de AWS Lambda con `pathParameters.screenerId` especificado.
 * @returns {Promise<APIGatewayProxyResult>}
 * - 200: Screener eliminado exitosamente.
 * - 400: Faltan campos requeridos (`screenerId`).
 * - 404: Screener no encontrado.
 * - 500: Error al eliminar el Screener.
 */
export const deleteScreener = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const screenerId = event.pathParameters?.screenerId;

    if (!screenerId) {
      return errorResponse(400, MESSAGES.MISSING_FIELDS);
    }

    const deletedScreener = await ScreenerSchema.findByIdAndDelete(screenerId);
    if (!deletedScreener) {
      return errorResponse(404, MESSAGES.SCREENER_NOT_FOUND);
    }

    return successResponse(200, { message: MESSAGES.DELETE_SUCCESS });
  } catch (error) {
    console.error('Error deleting screener:', error);
    return errorResponse(500, MESSAGES.FAILED_TO_DELETE);
  }
};
