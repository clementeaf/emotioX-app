import {
  APIGatewayEvent,
  APIGatewayProxyResult,
  ScheduledEvent,
} from "aws-lambda";
import { ApiGatewayManagementApi } from "aws-sdk";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import connectDB from "../config/database";

// Definición del esquema para las conexiones WebSocket
const ConnectionSchema = new mongoose.Schema({
  connectionId: { type: String, required: true, unique: true },
  connectedAt: { type: Date, default: Date.now },
});

const Connection = mongoose.model("Connection", ConnectionSchema);

export const refreshHandler = async (
  event: APIGatewayEvent | ScheduledEvent
): Promise<APIGatewayProxyResult> => {
  try {
    // Validar que el endpoint esté configurado
    const websocketEndpoint = process.env.WEBSOCKET_ENDPOINT;
    console.log("WebSocket Endpoint:", websocketEndpoint);
    if (!websocketEndpoint) {
      throw new Error(
        "WebSocket endpoint is not configured in the environment variables"
      );
    }

    // Crear cliente de API Gateway para WebSocket
    const apiGateway = new ApiGatewayManagementApi({
      endpoint: websocketEndpoint,
    });

    // Conectar a MongoDB
    await connectDB();

    // Obtener todas las conexiones activas
    const connections = await Connection.find({});
    console.log("Active connections:", connections.length);

    // Generar un nuevo token de acceso
    const accessToken = jwt.sign(
      { message: "New Access Token" },
      process.env.JWT_SECRET || "default_secret",
      {
        expiresIn: "15m",
      }
    );

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
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(
            `Error sending message to ${connection.connectionId}:`,
            error.message
          );

          // Opcional: Eliminar conexiones inválidas
          if ((error as any).statusCode === 410) {
            console.log(
              `Connection ${connection.connectionId} is stale and will be removed.`
            );
            await Connection.deleteOne({ connectionId: connection.connectionId });
          } else {
            console.log(`Error for connection ${connection.connectionId}:`, error);
          }
        } else {
          console.error(
            `Error sending message to ${connection.connectionId}: Unknown error`
          );
        }
      }
    });

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

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Failed to send tokens",
        error: errorMessage,
      }),
    };
  }
};
