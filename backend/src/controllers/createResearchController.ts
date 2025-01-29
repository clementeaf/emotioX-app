import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import mongoose from 'mongoose';
import connectDB from '../config/database';
import ResearchCreation from '../models/researchCreation';
import Project from '../models/project';

/**
 * Controlador para crear un nuevo documento de investigación, opcionalmente manejando imágenes previamente almacenadas.
 */
export const createResearchWithImages = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  try {
    await connectDB();

    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Request body is required' }),
      };
    }

    const data = JSON.parse(event.body);
    const {
      researchName,
      enterpriseName,
      selectedResearchType,
      selectedResearchModule,
      uploadedFiles = [], // Manejar como un arreglo vacío si no se envía
      selectedProjects = [],
      moduleDetails = {},
    } = data;

    // Validar campos requeridos
    if (!researchName || !enterpriseName || !selectedResearchType || !selectedResearchModule) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing required fields' }),
      };
    }

    // Validar imágenes si el tipo de investigación las requiere
    const researchTypesRequiringImages = ['TypeWithImages1', 'TypeWithImages2'];
    if (researchTypesRequiringImages.includes(selectedResearchType)) {
      if (uploadedFiles.length === 0) {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: 'Uploaded files are required for this type of research' }),
        };
      }

      const invalidFiles = uploadedFiles.filter((file: string) => typeof file !== 'string' || !file.startsWith('https://'));
      if (invalidFiles.length > 0) {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: 'Invalid URLs in uploadedFiles', invalidFiles }),
        };
      }
    }

    // Validar proyectos si se incluyen
    if (selectedProjects.length > 0) {
      const projectIds = selectedProjects.map((id: string) => new mongoose.Types.ObjectId(id));
      const existingProjects = await Project.find({ _id: { $in: projectIds } });
      if (existingProjects.length !== projectIds.length) {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: 'Some projects do not exist', selectedProjects }),
        };
      }
    }

    // Crear el documento en MongoDB
    const newResearch = await ResearchCreation.create({
      researchName,
      enterpriseName,
      selectedResearchType,
      selectedResearchModule,
      uploadedFiles,
      selectedProjects,
      researchTypeSpecificData: moduleDetails,
    });

    const populatedResearch = await ResearchCreation.findById(newResearch._id)
      .populate('selectedProjects') // Expande referencias
      .exec();

    return {
      statusCode: 201,
      body: JSON.stringify({
        message: 'Research created successfully',
        research: populatedResearch || newResearch,
      }),
    };
  } catch (error) {
    console.error('Error creating research:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Failed to create research',
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
    };
  }
};
