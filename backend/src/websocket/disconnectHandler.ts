import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import connectDB from "../config/database";
import Connection from "../config/connectionSchema";

/**
 * Handler para gestionar la desconexión de WebSocket.
 * Elimina el `connectionId` de MongoDB cuando el cliente se desconecta.
 */
export const disconnectHandler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  const { connectionId } = event.requestContext;

  // Verificar que el connectionId exista
  if (!connectionId) {
    console.error("No connectionId found in requestContext");
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Connection ID is missing from request context",
      }),
    };
  }

  try {
    // Conectar a MongoDB
    await connectDB();

    // Eliminar el connectionId de MongoDB
    const result = await Connection.findOneAndDelete({ connectionId });

    if (result) {
      console.log(`Connection deleted successfully: ${connectionId}`);
    } else {
      console.log(`Connection not found for deletion: ${connectionId}`);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Disconnected.",
        connectionId,
        deleted: !!result,
      }),
    };
  } catch (error) {
    // Manejo del error con validación del tipo
    console.error("Error deleting connection ID:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Failed to disconnect.",
        error: error instanceof Error ? error.message : "Unknown error",
      }),
    };
  }
};
