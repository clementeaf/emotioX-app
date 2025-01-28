import { APIGatewayProxyResult } from 'aws-lambda';

/**
 * Validar los campos requeridos para el Screener
 */
export const validateScreenerFields = (
  researchId?: string,
  questionText?: string,
  options?: any[]
): { isValid: boolean; errorMessage?: string } => {
  if (!researchId || !questionText || !options || !Array.isArray(options)) {
    return { isValid: false, errorMessage: 'Missing required fields.' };
  }
  return { isValid: true };
};

/**
 * Respuesta genérica para éxito
 */
export const successResponse = (statusCode: number, body: any): APIGatewayProxyResult => ({
  statusCode,
  body: JSON.stringify(body),
});

/**
 * Respuesta genérica para error
 */
export const errorResponse = (statusCode: number, message: string): APIGatewayProxyResult => ({
  statusCode,
  body: JSON.stringify({ error: message }),
});

/**
 * Mensajes reutilizables
 */
export const MESSAGES = {
  MISSING_FIELDS: 'Missing required fields.',
  SCREENER_NOT_FOUND: 'Screener not found.',
  FAILED_TO_CREATE: 'Failed to create screener.',
  FAILED_TO_UPDATE: 'Failed to update screener.',
  FAILED_TO_DELETE: 'Failed to delete screener.',
  DELETE_SUCCESS: 'Screener deleted successfully.',
};
