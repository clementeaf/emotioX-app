import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import AWS from 'aws-sdk';

const s3 = new AWS.S3();
const BUCKET_NAME = process.env.S3_BUCKET_NAME as string;

export const generatePresignedUrls = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.body) {
      return {
        statusCode: 400,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ message: "Request body is required" }),
      };
    }

    const { fileName, fileType } = JSON.parse(event.body);
    if (!fileName || !fileType) {
      return {
        statusCode: 400,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ message: "fileName and fileType are required" }),
      };
    }

    const params = {
      Bucket: BUCKET_NAME,
      Key: `research-uploads/${Date.now()}-${fileName}`,
      Expires: 300, // Expira en 5 minutos
      ContentType: fileType,
    };

    const uploadURL = await s3.getSignedUrlPromise("putObject", params);

    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({
        uploadURL,
        fileURL: `https://${BUCKET_NAME}.s3.amazonaws.com/${params.Key}`,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({
        message: "Error generating URL",
        error: error instanceof Error ? error.message : "Unknown error",
      }),
    };
  }
};
