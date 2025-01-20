import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";

export const defaultHandler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
    console.log("Default route triggered with event:", event);
  
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Default route executed." }),
    };
  };
  