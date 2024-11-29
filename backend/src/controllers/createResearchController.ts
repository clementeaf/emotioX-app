import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import connectDB from '../config/database';
import ResearchCreation from '../models/researchCreation';

/**
 * Controlador para crear un nuevo documento de investigación (ResearchCreation)
 * @param event Evento de API Gateway que contiene los datos en el cuerpo de la solicitud
 * @returns Respuesta HTTP con el resultado de la operación
 */
export const createResearch = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  try {
    // Conectar a la base de datos
    await connectDB();

    // Verificar que el cuerpo de la solicitud no esté vacío
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Request body is required' }),
      };
    }

    // Parsear los datos del cuerpo de la solicitud
    const data = JSON.parse(event.body);

    // Validar los campos requeridos
    const { researchName, enterpriseName, selectedResearchType, selectedResearchModule } = data;

    if (!researchName || !enterpriseName || !selectedResearchType || !selectedResearchModule) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing required fields' }),
      };
    }

    // Crear el documento en la base de datos
    const newResearch = await ResearchCreation.create({
      researchName,
      enterpriseName,
      selectedResearchType,
      selectedResearchModule,
      uploadedFiles: data.uploadedFiles || [], // Opcional
      selectedProjects: data.selectedProjects || [], // Opcional
      researchTypeSpecificData: data.moduleDetails || {}, // Guardar datos específicos del módulo
    });

    // Retornar la respuesta exitosa
    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'Research created successfully', research: newResearch }),
    };
  } catch (error) {
        if (error instanceof Error) {
            console.error('Error creating research:', error);

            // Manejo de errores genéricos
            return {
                statusCode: 500,
                body: JSON.stringify({ message: 'Failed to create research', error: error.message }),
            };
        } else {
            console.error('Unknown error type:', error);

            return {
                statusCode: 500,
                body: JSON.stringify({ message: 'Failed to create research', error: 'Unknown error' }),
            };
        }
    }
};
