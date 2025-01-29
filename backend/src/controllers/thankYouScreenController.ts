import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { errorResponse, successResponse } from "../utils";
import connectDB from "../config/database";
import ThankYouScreen from "../models/thankYouSchema";

/**
 * Crea una nueva Thank You Screen.
 */
export const createThankYouScreen = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    await connectDB();

    const { isRequired, title, message } = JSON.parse(event.body || "{}");

    const thankYouScreen = await ThankYouScreen.create({
      isRequired,
      title,
      message,
    });

    return successResponse(201, thankYouScreen);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error creating Thank You Screen:", errorMessage);
    return errorResponse(500, errorMessage || "Failed to create Thank You Screen.");
  }
};

/**
 * Obtiene una Thank You Screen por su `id`.
 */
export const getThankYouScreenById = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    await connectDB();

    const id = event.pathParameters?.id;

    if (!id) {
      return errorResponse(400, "Thank You Screen ID is required.");
    }

    const thankYouScreen = await ThankYouScreen.findById(id);
    if (!thankYouScreen) {
      return errorResponse(404, "Thank You Screen not found.");
    }

    return successResponse(200, thankYouScreen);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error fetching Thank You Screen:", errorMessage);
    return errorResponse(500, errorMessage || "Failed to fetch Thank You Screen.");
  }
};

/**
 * Actualiza una Thank You Screen existente.
 */
export const updateThankYouScreen = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    await connectDB();

    const id = event.pathParameters?.id;
    const updateData = JSON.parse(event.body || "{}");

    if (!id) {
      return errorResponse(400, "Thank You Screen ID is required.");
    }

    const updatedThankYouScreen = await ThankYouScreen.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedThankYouScreen) {
      return errorResponse(404, "Thank You Screen not found.");
    }

    return successResponse(200, updatedThankYouScreen);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error updating Thank You Screen:", errorMessage);
    return errorResponse(500, errorMessage || "Failed to update Thank You Screen.");
  }
};

/**
 * Elimina una Thank You Screen por su `id`.
 */
export const deleteThankYouScreen = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    await connectDB();

    const id = event.pathParameters?.id;

    if (!id) {
      return errorResponse(400, "Thank You Screen ID is required.");
    }

    const deletedThankYouScreen = await ThankYouScreen.findByIdAndDelete(id);
    if (!deletedThankYouScreen) {
      return errorResponse(404, "Thank You Screen not found.");
    }

    return successResponse(200, { message: "Thank You Screen deleted successfully." });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error deleting Thank You Screen:", errorMessage);
    return errorResponse(500, errorMessage || "Failed to delete Thank You Screen.");
  }
};
