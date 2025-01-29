import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({ region: "us-east-1" });
const bucketName = process.env.S3_BUCKET_NAME || "emotiox-backend-dev-bucket";

if (!bucketName) {
  throw new Error("❌ S3_BUCKET_NAME environment variable is not defined");
}

/**
 * Sube múltiples archivos a S3.
 *
 * @param event Evento de API Gateway.
 * @returns Respuesta con las URLs de los archivos subidos.
 */
export const uploadFilesToS3 = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  try {
    console.log("Event: ", event);

    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "❌ Request body is required" }),
      };
    }

    const { fileName, fileType } = JSON.parse(event.body);

    if (!fileName || !fileType) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "❌ fileName and fileType are required" }),
      };
    }

    // Nombre del archivo con timestamp para evitar colisiones
    const key = `uploads/${Date.now()}-${fileName}`;

    // Crear la URL pre-firmada para subir el archivo
    const putObjectCommand = new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      ContentType: fileType,
    });

    const uploadURL = await getSignedUrl(s3, putObjectCommand, { expiresIn: 300 }); // URL expira en 5 minutos

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "✅ Pre-signed URL generated successfully",
        uploadURL, // URL para subir el archivo
        fileURL: `https://${bucketName}.s3.amazonaws.com/${key}`, // URL del archivo en S3
      }),
    };
  } catch (error) {
    console.error("❌ Error generating pre-signed URL:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "❌ Failed to generate pre-signed URL",
        error: error instanceof Error ? error.message : "Unknown error",
      }),
    };
  }
};
