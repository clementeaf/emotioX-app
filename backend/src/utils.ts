import { APIGatewayProxyResult } from 'aws-lambda';

/**
 * Valida los campos requeridos para cualquier entidad.
 */
interface ValidationResult {
  isValid: boolean;
  errorMessage?: string;
}

export const validateFields = (
  fields: Record<string, any>, // Objeto con los campos a validar
  requiredFields: string[] // Lista de campos requeridos
): ValidationResult => {
  for (const field of requiredFields) {
    if (!fields[field]) {
      return { isValid: false, errorMessage: `Field "${field}" is missing or invalid.` };
    }
  }
  return { isValid: true };
};

/**
 * Valida los campos requeridos para un Screener.
 */
export const validateScreenerFields = (
  researchId?: string,
  questionText?: string,
  options?: Array<{ option1: string; selection: string }>
): { isValid: boolean; errorMessage?: string } => {
  if (!researchId) return { isValid: false, errorMessage: 'Field "researchId" is missing.' };
  if (!questionText) return { isValid: false, errorMessage: 'Field "questionText" is missing.' };
  if (!options || !Array.isArray(options)) return { isValid: false, errorMessage: 'Field "options" is invalid.' };

  for (const option of options) {
    if (!option.option1) return { isValid: false, errorMessage: 'Each option must have an "option1" field.' };
    if (!['Qualify', 'Disqualify'].includes(option.selection))
      return { isValid: false, errorMessage: 'Each option must have a valid "selection" field.' };
  }

  return { isValid: true };
};

export const validateImplicitAssociationFields = (
  required: boolean,
  targets: any[],
  textAreas: any[],
  testConfigurations: any[]
) => {
  // Validar el campo required
  if (typeof required !== 'boolean') {
    return { isValid: false, errorMessage: 'The "required" field must be a boolean.' };
  }

  // Validar targets
  if (!Array.isArray(targets) || !targets.length) {
    return { isValid: false, errorMessage: 'The "targets" field must be a non-empty array.' };
  }

  // Validar la estructura de cada target
  for (const target of targets) {
    if (!target.id || typeof target.id !== 'number') {
      return { isValid: false, errorMessage: 'Each target must have a numeric id.' };
    }

    if (target.nameOfObject && typeof target.nameOfObject !== 'string') {
      return { isValid: false, errorMessage: 'Target nameOfObject must be a string.' };
    }

    if (target.imageUploaded && typeof target.imageUploaded !== 'string') {
      return { isValid: false, errorMessage: 'Target imageUploaded must be a string.' };
    }

    if (target.image) {
      if (typeof target.image !== 'object') {
        return { isValid: false, errorMessage: 'Target image must be an object.' };
      }

      if (target.image.fileName && typeof target.image.fileName !== 'string') {
        return { isValid: false, errorMessage: 'Target image fileName must be a string.' };
      }

      if (target.image.url && typeof target.image.url !== 'string') {
        return { isValid: false, errorMessage: 'Target image url must be a string.' };
      }

      if (target.image.format && typeof target.image.format !== 'string') {
        return { isValid: false, errorMessage: 'Target image format must be a string.' };
      }

      if (target.image.size && typeof target.image.size !== 'number') {
        return { isValid: false, errorMessage: 'Target image size must be a number.' };
      }
    }
  }

  // Validar textAreas
  if (!Array.isArray(textAreas) || !textAreas.length) {
    return { isValid: false, errorMessage: 'The "textAreas" field must be a non-empty array.' };
  }

  // Validar la estructura de cada textArea
  for (const textArea of textAreas) {
    if (!textArea.id || typeof textArea.id !== 'number') {
      return { isValid: false, errorMessage: 'Each textArea must have a numeric id.' };
    }

    if (!textArea.label || typeof textArea.label !== 'string') {
      return { isValid: false, errorMessage: 'Each textArea must have a string label.' };
    }

    if (textArea.value && typeof textArea.value !== 'string') {
      return { isValid: false, errorMessage: 'TextArea value must be a string.' };
    }
  }

  // Validar testConfigurations
  if (!Array.isArray(testConfigurations) || !testConfigurations.length) {
    return { isValid: false, errorMessage: 'The "testConfigurations" field must be a non-empty array.' };
  }

  // Validar la estructura de cada testConfiguration
  for (const config of testConfigurations) {
    if (!config.id || typeof config.id !== 'number') {
      return { isValid: false, errorMessage: 'Each testConfiguration must have a numeric id.' };
    }

    if (!config.label || typeof config.label !== 'string') {
      return { isValid: false, errorMessage: 'Each testConfiguration must have a string label.' };
    }

    if (typeof config.checked !== 'boolean') {
      return { isValid: false, errorMessage: 'Each testConfiguration must have a boolean checked field.' };
    }
  }

  return { isValid: true };
};


/**
 * Crea una respuesta genérica.
 */
interface ApiResponseOptions {
  statusCode: number;
  body: any;
  headers?: Record<string, string>;
}

export const createResponse = ({ statusCode, body, headers }: ApiResponseOptions): APIGatewayProxyResult => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json',
    ...headers,
  },
  body: JSON.stringify(body),
});

/**
 * Respuesta genérica para éxito.
 */
export const successResponse = (statusCode: number, body: any): APIGatewayProxyResult =>
  createResponse({ statusCode, body });

/**
 * Respuesta genérica para error.
 */
export const errorResponse = (statusCode: number, message: string): APIGatewayProxyResult =>
  createResponse({ statusCode, body: { error: message } });

/**
 * Mensajes reutilizables.
 */
export const MESSAGES = {
  SCREENER: {
    MISSING_FIELDS: 'Missing required fields for screener.',
    NOT_FOUND: 'Screener not found.',
    FAILED_TO_CREATE: 'Failed to create screener.',
    FAILED_TO_UPDATE: 'Failed to update screener.',
    FAILED_TO_DELETE: 'Failed to delete screener.',
    DELETE_SUCCESS: 'Screener deleted successfully.',
  },
  WELCOME_SCREEN: {
    MISSING_FIELDS: 'Missing required fields for WelcomeScreen.',
    NOT_FOUND: 'WelcomeScreen not found.',
    FAILED_TO_CREATE: 'Failed to create WelcomeScreen.',
    FAILED_TO_UPDATE: 'Failed to update WelcomeScreen.',
    FAILED_TO_FETCH: 'Failed to fetch WelcomeScreen.',
    FAILED_TO_DELETE: 'Failed to delete WelcomeScreen.',
    DELETE_SUCCESS: 'WelcomeScreen deleted successfully.',
  },
  GENERAL: {
    INVALID_REQUEST: 'Invalid request parameters.',
    UNKNOWN_ERROR: 'An unknown error occurred.',
  },
};

/**
 * Genera un mensaje dinámico a partir de una plantilla.
 */
export const dynamicMessage = (template: string, values: Record<string, string>): string =>
  template.replace(/\{\{(.*?)\}\}/g, (_, key) => values[key] || '');
