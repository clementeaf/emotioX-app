import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import ImplicitAssociation from '../models/implicitAssociationSchema';
import { errorResponse, successResponse, validateImplicitAssociationFields } from '../utils';
import connectDB from '../config/database';

/**
 * Crea un nuevo ImplicitAssociation.
 */
export const createImplicitAssociation = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    await connectDB();

    const { required, targets, textAreas, testConfigurations } = JSON.parse(event.body || '{}');

    // Validar campos requeridos
    const { isValid, errorMessage } = validateImplicitAssociationFields(required, targets, textAreas, testConfigurations);
    if (!isValid) {
      return errorResponse(400, errorMessage || 'Missing required fields for Implicit Association.');
    }

    // Crear el ImplicitAssociation
    const implicitAssociation = await ImplicitAssociation.create({ required, targets, textAreas, testConfigurations });
    return successResponse(201, implicitAssociation);
  } catch (error) {
    console.error('Error creating ImplicitAssociation:', error);
    return errorResponse(500, 'Failed to create Implicit Association.');
  }
};

/**
 * Obtiene un ImplicitAssociation basado en su `id`.
 */
export const getImplicitAssociationById = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    await connectDB();

    const id = event.pathParameters?.id;

    if (!id) {
      return errorResponse(400, 'Missing Implicit Association ID.');
    }

    const implicitAssociation = await ImplicitAssociation.findById(id);
    if (!implicitAssociation) {
      return errorResponse(404, 'Implicit Association not found.');
    }

    return successResponse(200, implicitAssociation);
  } catch (error) {
    console.error('Error fetching ImplicitAssociation:', error);
    return errorResponse(500, 'Failed to fetch Implicit Association.');
  }
};

/**
 * Actualiza un ImplicitAssociation existente.
 */
export const updateImplicitAssociation = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    await connectDB();

    const id = event.pathParameters?.id;
    const { required, targets, textAreas, testConfigurations } = JSON.parse(event.body || '{}');

    // Validar campos requeridos
    const { isValid, errorMessage } = validateImplicitAssociationFields(required, targets, textAreas, testConfigurations);
    if (!isValid) {
      return errorResponse(400, errorMessage || 'Missing required fields for Implicit Association.');
    }

    const updatedImplicitAssociation = await ImplicitAssociation.findByIdAndUpdate(
      id,
      { required, targets, textAreas, testConfigurations },
      { new: true, runValidators: true }
    );

    if (!updatedImplicitAssociation) {
      return errorResponse(404, 'Implicit Association not found.');
    }

    return successResponse(200, updatedImplicitAssociation);
  } catch (error) {
    console.error('Error updating ImplicitAssociation:', error);
    return errorResponse(500, 'Failed to update Implicit Association.');
  }
};

/**
 * Elimina un ImplicitAssociation basado en su `id`.
 */
export const deleteImplicitAssociation = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    await connectDB();

    const id = event.pathParameters?.id;

    if (!id) {
      return errorResponse(400, 'Missing Implicit Association ID.');
    }

    const deletedImplicitAssociation = await ImplicitAssociation.findByIdAndDelete(id);
    if (!deletedImplicitAssociation) {
      return errorResponse(404, 'Implicit Association not found.');
    }

    return successResponse(200, { message: 'Implicit Association deleted successfully.' });
  } catch (error) {
    console.error('Error deleting ImplicitAssociation:', error);
    return errorResponse(500, 'Failed to delete Implicit Association.');
  }
};
