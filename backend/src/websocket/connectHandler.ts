import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import mongoose from 'mongoose';
import connectDB from '../config/database';

// Define un modelo de MongoDB para almacenar los connectionIds
const ConnectionSchema = new mongoose.Schema({
    connectionId: { type: String, required: true, unique: true },
    connectedAt: { type: Date, default: Date.now },
  });
  
const Connection = mongoose.model('Connection', ConnectionSchema);

/**
 * Handler para gestionar la conexión de WebSocket.
 * Almacena el `connectionId` en DynamoDB para futuras interacciones.
 */
export const connectHandler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  const { connectionId } = event.requestContext;

  try {
        // Conectar a MongoDB
    await connectDB();
    // Guardar el connectionId en DynamoDB

    const newConnection = new Connection({ connectionId });
    const savedConnection = await newConnection.save();
    console.log('Connection saved:', savedConnection);

    console.log('Connection successful:', connectionId, savedConnection);

    return {
        statusCode: 200,
        body: JSON.stringify({
          message: 'Connected.',
          connectionId: connectionId,
          savedConnection,
        }),
      };
  } catch (error) {
    console.error('Error storing connection ID:', error);

    return {
      statusCode: 500,
      body: 'Failed to connect.',
    };
  }
};
