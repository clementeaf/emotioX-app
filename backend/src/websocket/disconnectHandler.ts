import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import mongoose from 'mongoose';
import connectDB from '../config/database';

// Modelo de MongoDB para almacenar los connectionIds
const ConnectionSchema = new mongoose.Schema({
  connectionId: { type: String, required: true, unique: true },
  connectedAt: { type: Date, default: Date.now },
});

const Connection = mongoose.model('Connection', ConnectionSchema);

/**
 * Handler para gestionar la desconexión de WebSocket.
 * Elimina el `connectionId` de MongoDB cuando el cliente se desconecta.
 */
export const disconnectHandler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  const { connectionId } = event.requestContext;

  try {
    // Conectar a MongoDB
    await connectDB();

    // Eliminar el connectionId de MongoDB
    const result = await Connection.findOneAndDelete({ connectionId });

    if (result) {
      console.log('Connection deleted:', connectionId);
    } else {
      console.log('Connection not found for deletion:', connectionId);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Disconnected.',
        connectionId,
        deleted: !!result,
      }),
    };
  } catch (error) {
    console.error('Error deleting connection ID:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Failed to disconnect.',
        error: (error instanceof Error) ? error.message : 'Unknown error',
      }),
    };
  }
};
