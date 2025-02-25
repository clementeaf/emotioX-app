import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import CognitiveTask from "../models/cognitiveTaskSchema";
import { errorResponse, successResponse } from "../utils";
import connectDB from "../config/database";

/**
 * Crea un nuevo Cognitive Task asociado a una investigación.
 */
export const createCognitiveTask = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    await connectDB();

    const { researchId, required, questions } = JSON.parse(event.body || "{}");

    // Validar que el researchId esté presente
    if (!researchId) {
      return errorResponse(400, "Research ID is required.");
    }

    // Validar que las preguntas sean válidas
    if (!questions || !Array.isArray(questions) || questions.length === 0) {
      return errorResponse(400, "Questions array is required and must not be empty.");
    }

    // Formatear preguntas y asegurar que tengan los campos obligatorios
    const formattedQuestions = questions.map((q, index) => {
      if (!q.id || !q.question || !q.choiceType) {
        throw new Error(
          `Question at index ${index} is missing required fields: 'id', 'question', or 'choiceType'.`
        );
      }

      const baseQuestion = {
        id: q.id,
        question: q.question,
        choiceType: q.choiceType,
        isVisible: q.isVisible ?? true,
        required: q.required ?? false,
        placeholder: q.placeholder ?? "",
        fileUploadLabel: q.fileUploadLabel ?? "",
        deviceFrameOptions: q.deviceFrameOptions || [],
        selectedFrame: q.selectedFrame || "No Frame",
        inputText: q.inputText || "",
        selectedOption: q.selectedOption || "",
        showConditionality: q.showConditionality ?? false,
        choices: q.choices || [],
        randomizeChoices: q.randomizeChoices ?? false,
        showOtherOption: q.showOtherOption ?? false,
      };

      // Procesar imágenes según el tipo de pregunta
      if (q.choiceType === "multipleImages") {
        return {
          ...baseQuestion,
          images: Array.isArray(q.images) ? q.images : [],
        };
      } else {
        // Para preguntas que no son multipleImages
        return {
          ...baseQuestion,
          images: q.image ? [q.image] : [], // Si hay una imagen única, la convertimos en array
        };
      }
    });

    const cognitiveTask = await CognitiveTask.create({ researchId, required, questions: formattedQuestions });
    return successResponse(201, cognitiveTask);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error creating Cognitive Task:", errorMessage);
    return errorResponse(500, errorMessage || "Failed to create Cognitive Task.");
  }  
};


/**
 * Obtiene un Cognitive Task basado en su `id`.
 */
export const getCognitiveTaskById = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    await connectDB();

    const id = event.pathParameters?.id;

    if (!id) {
      return errorResponse(400, "Cognitive Task ID is required.");
    }

    const cognitiveTask = await CognitiveTask.findById(id);
    if (!cognitiveTask) {
      return errorResponse(404, "Cognitive Task not found.");
    }

    return successResponse(200, cognitiveTask);
  } catch (error) {
    console.error("Error fetching Cognitive Task:", error);
    return errorResponse(500, "Failed to fetch Cognitive Task.");
  }
};

/**
 * Actualiza un Cognitive Task existente.
 */
export const updateCognitiveTask = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    await connectDB();

    const id = event.pathParameters?.id;
    const { researchId, required, questions } = JSON.parse(event.body || "{}");

    if (!id) {
      return errorResponse(400, "Cognitive Task ID is required.");
    }

    if (!researchId) {
      return errorResponse(400, "Research ID is required.");
    }

    if (!questions || !Array.isArray(questions) || questions.length === 0) {
      return errorResponse(400, "Questions array is required and must not be empty.");
    }

    const updatedCognitiveTask = await CognitiveTask.findByIdAndUpdate(
      id,
      { researchId, required, questions },
      { new: true, runValidators: true }
    );

    if (!updatedCognitiveTask) {
      return errorResponse(404, "Cognitive Task not found.");
    }

    return successResponse(200, updatedCognitiveTask);
  } catch (error) {
    console.error("Error updating Cognitive Task:", error);
    return errorResponse(500, "Failed to update Cognitive Task.");
  }
};

/**
 * Elimina un Cognitive Task basado en su `id`.
 */
export const deleteCognitiveTask = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    await connectDB();

    const id = event.pathParameters?.id;

    if (!id) {
      return errorResponse(400, "Cognitive Task ID is required.");
    }

    const deletedCognitiveTask = await CognitiveTask.findByIdAndDelete(id);
    if (!deletedCognitiveTask) {
      return errorResponse(404, "Cognitive Task not found.");
    }

    return successResponse(200, { message: "Cognitive Task deleted successfully." });
  } catch (error) {
    console.error("Error deleting Cognitive Task:", error);
    return errorResponse(500, "Failed to delete Cognitive Task.");
  }
};
