import { ApiGatewayManagementApiClient, PostToConnectionCommand } from "@aws-sdk/client-apigatewaymanagementapi";
import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";

export const sendMessageHandler = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  try {
    console.log("Handler started");
    console.log("Environment Variables:", JSON.stringify(process.env));

    const websocketEndpoint = process.env.WEBSOCKET_ENDPOINT?.replace("wss://", "https://");
    console.log("Transformed WEBSOCKET_ENDPOINT:", websocketEndpoint);

    if (!websocketEndpoint) {
      throw new Error("WEBSOCKET_ENDPOINT is not defined.");
    }

    const client = new ApiGatewayManagementApiClient({ endpoint: websocketEndpoint });

    const connectionId = event.requestContext.connectionId;
    console.log("Connection ID:", connectionId);

    if (!connectionId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "ConnectionId is undefined." }),
      };
    }

    const body = JSON.parse(event.body || "{}");
    console.log("Parsed body:", body);

    if (!body.data) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "No 'data' property in message body." }),
      };
    }

    const command = new PostToConnectionCommand({
      ConnectionId: connectionId,
      Data: `Message received: ${body.data}`,
    });

    console.log("Sending command to ApiGatewayManagementApiClient...");
    await client.send(command);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Message sent successfully!" }),
    };
  } catch (error) {
    console.error("Error in sendMessageHandler:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Failed to send message.",
        error: error instanceof Error ? error.message : "Unknown error",
      }),
    };
  }
};
