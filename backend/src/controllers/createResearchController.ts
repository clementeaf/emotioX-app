import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import mongoose from 'mongoose';
import connectDB from '../config/database';
import ResearchCreation from '../models/researchCreation';
import Project from '../models/project';

/**
 * Tipos de investigación que requieren imágenes.
 */
const researchTypesRequiringImages = ['TypeWithImages1', 'TypeWithImages2'];

/**
 * Controlador para crear un nuevo documento de investigación, opcionalmente manejando imágenes previamente almacenadas.
 */
export const createResearchWithImages = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  try {
    // Conectar a la base de datos
    await connectDB();

    // Validar el cuerpo de la solicitud
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
      uploadedFiles, // Lista de URLs de archivos ya almacenados en S3
      selectedProjects,
      moduleDetails,
    } = data;

    // Validar campos requeridos
    if (!researchName || !enterpriseName || !selectedResearchType || !selectedResearchModule) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing required fields' }),
      };
    }

    // Validar imágenes si el tipo de investigación las requiere
    if (researchTypesRequiringImages.includes(selectedResearchType)) {
      if (!uploadedFiles || !Array.isArray(uploadedFiles) || uploadedFiles.length === 0) {
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

    // Validar que los proyectos referenciados existen en la base de datos
    if (selectedProjects && selectedProjects.length > 0) {
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
      uploadedFiles: uploadedFiles || [],
      selectedProjects: selectedProjects || [],
      researchTypeSpecificData: moduleDetails || {},
    });

    // Realizar un "populate" para expandir referencias
    const populatedResearch = await ResearchCreation.findById(newResearch._id)
      .populate('selectedProjects') // Expande las referencias de Project
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
