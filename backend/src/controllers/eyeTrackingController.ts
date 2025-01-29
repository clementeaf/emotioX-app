import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import EyeTracking from "../models/eyeTrackingSchema";
import { errorResponse, successResponse } from "../utils";
import connectDB from "../config/database";

/**
 * Crea un nuevo Eye Tracking Task.
 */
export const createEyeTrackingTask = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    await connectDB();

    const {
      required,
      taskInstruction,
      uploadedFiles,
      randomize,
      isShelfTask,
      resizeImage,
      useEyeTrackingDevice,
      useWebcamBasedTracking,
      enableClickMeasurement,
      finishOnAnyKey,
      holdDeviceVertical,
      holdDeviceHorizontal,
      displayTime,
    } = JSON.parse(event.body || "{}");

    const eyeTrackingTask = await EyeTracking.create({
      required,
      taskInstruction,
      uploadedFiles,
      randomize,
      isShelfTask,
      resizeImage,
      useEyeTrackingDevice,
      useWebcamBasedTracking,
      enableClickMeasurement,
      finishOnAnyKey,
      holdDeviceVertical,
      holdDeviceHorizontal,
      displayTime,
    });

    return successResponse(201, eyeTrackingTask);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error creating Eye Tracking Task:", errorMessage);
    return errorResponse(500, errorMessage || "Failed to create Eye Tracking Task.");
  }
};

/**
 * Obtiene un Eye Tracking Task basado en su `id`.
 */
export const getEyeTrackingTaskById = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    await connectDB();

    const id = event.pathParameters?.id;

    if (!id) {
      return errorResponse(400, "Eye Tracking Task ID is required.");
    }

    const eyeTrackingTask = await EyeTracking.findById(id);
    if (!eyeTrackingTask) {
      return errorResponse(404, "Eye Tracking Task not found.");
    }

    return successResponse(200, eyeTrackingTask);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error fetching Eye Tracking Task:", errorMessage);
    return errorResponse(500, errorMessage || "Failed to fetch Eye Tracking Task.");
  }
};

/**
 * Actualiza un Eye Tracking Task existente.
 */
export const updateEyeTrackingTask = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    await connectDB();

    const id = event.pathParameters?.id;
    const updateData = JSON.parse(event.body || "{}");

    if (!id) {
      return errorResponse(400, "Eye Tracking Task ID is required.");
    }

    const updatedEyeTrackingTask = await EyeTracking.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedEyeTrackingTask) {
      return errorResponse(404, "Eye Tracking Task not found.");
    }

    return successResponse(200, updatedEyeTrackingTask);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error updating Eye Tracking Task:", errorMessage);
    return errorResponse(500, errorMessage || "Failed to update Eye Tracking Task.");
  }
};

/**
 * Elimina un Eye Tracking Task basado en su `id`.
 */
export const deleteEyeTrackingTask = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    await connectDB();

    const id = event.pathParameters?.id;

    if (!id) {
      return errorResponse(400, "Eye Tracking Task ID is required.");
    }

    const deletedEyeTrackingTask = await EyeTracking.findByIdAndDelete(id);
    if (!deletedEyeTrackingTask) {
      return errorResponse(404, "Eye Tracking Task not found.");
    }

    return successResponse(200, { message: "Eye Tracking Task deleted successfully." });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error deleting Eye Tracking Task:", errorMessage);
    return errorResponse(500, errorMessage || "Failed to delete Eye Tracking Task.");
  }
};
