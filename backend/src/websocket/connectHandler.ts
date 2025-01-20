import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import connectDB from "../config/database";
import Connection from "../config/connectionSchema";

export const connectHandler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  const { connectionId } = event.requestContext;

  try {
    await connectDB();

    const existingConnection = await Connection.findOne({ connectionId });
    if (existingConnection) {
      console.log("Connection already exists:", connectionId);
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Already connected" }),
      };
    }

    const newConnection = new Connection({ connectionId });
    const savedConnection = await newConnection.save();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Connected.",
        connectionId: connectionId,
      }),
    };
  } catch (error) {
    console.error("Error storing connection ID:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Failed to connect",
        error: error instanceof Error ? error.message : "Unknown error",
      }),
    };
  }
};
