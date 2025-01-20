import {
  APIGatewayEvent,
  APIGatewayProxyResult,
  ScheduledEvent,
} from "aws-lambda";
import { ApiGatewayManagementApi } from "aws-sdk";
import jwt from "jsonwebtoken";
import connectDB from "../config/database";
import Connection from "../config/connectionSchema";

/**
 * Handler para refrescar las conexiones WebSocket.
 * Envía un nuevo token JWT a todas las conexiones activas.
 */
export const refreshHandler = async (
  event: APIGatewayEvent | ScheduledEvent
): Promise<APIGatewayProxyResult> => {
  try {
    // Validar el WebSocket Endpoint desde las variables de entorno
    const websocketEndpoint = process.env.WEBSOCKET_ENDPOINT;
    if (!websocketEndpoint) {
      console.error("WebSocket endpoint is not configured.");
      throw new Error("WEBSOCKET_ENDPOINT is missing from environment variables");
    }

    console.log("WebSocket Endpoint:", websocketEndpoint);

    // Crear cliente de API Gateway para WebSocket
    const apiGateway = new ApiGatewayManagementApi({ endpoint: websocketEndpoint });

    // Conectar a MongoDB
    await connectDB();

    // Obtener todas las conexiones activas
    const connections = await Connection.find({});
    console.log("Active connections found:", connections.length);

    // Generar un nuevo token de acceso JWT
    const jwtSecret = process.env.JWT_SECRET || "default_secret";
    const accessToken = jwt.sign({ message: "New Access Token" }, jwtSecret, {
      expiresIn: "15m",
    });

    // Enviar el token a cada conexión activa
    const sendPromises = connections.map(async (connection) => {
      try {
        await apiGateway
          .postToConnection({
            ConnectionId: connection.connectionId,
            Data: JSON.stringify({ accessToken }),
          })
          .promise();

        console.log(`Token sent to connection ${connection.connectionId}`);
      } catch (error) {
        handlePostToConnectionError(error, connection.connectionId);
      }
    });

    // Esperar que todas las promesas se resuelvan
    await Promise.all(sendPromises);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Tokens sent successfully",
        connections: connections.length,
      }),
    };
  } catch (error) {
    console.error("Error sending tokens:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Failed to send tokens",
        error: error instanceof Error ? error.message : "Unknown error",
      }),
    };
  }
};

/**
 * Maneja los errores al enviar mensajes a las conexiones WebSocket.
 * Si la conexión es inválida, se elimina de la base de datos.
 */
const handlePostToConnectionError = async (error: unknown, connectionId: string) => {
  if (error instanceof Error) {
    console.error(`Error sending message to connection ${connectionId}:`, error.message);

    // Si el error indica que la conexión está obsoleta, elimínala
    if ((error as any).statusCode === 410) {
      console.log(`Connection ${connectionId} is stale and will be removed.`);
      await Connection.deleteOne({ connectionId });
    }
  } else {
    console.error(`Unknown error sending message to connection ${connectionId}:`, error);
  }
};
