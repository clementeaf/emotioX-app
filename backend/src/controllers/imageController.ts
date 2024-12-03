import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import AWS from 'aws-sdk';

const s3 = new AWS.S3({ region: 'us-east-1' });
const bucketName = process.env.S3_BUCKET_NAME || "emotiox-backend-dev-bucket";

if (!bucketName) {
  throw new Error("S3_BUCKET_NAME environment variable is not defined");
}

/**
 * Endpoint para subir imágenes directamente a S3
 *
 * @param event Evento de API Gateway
 * @returns Resultado de la subida
 */
export const uploadFilesToS3 = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Request body is required' }),
      };
    }

    const { files } = JSON.parse(event.body);

    if (!files || !Array.isArray(files)) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'An array of files is required',
        }),
      };
    }

    // Subir cada archivo a S3
    const uploadedFiles = await Promise.all(
      files.map(async (file: { fileName: string; fileContent: string; contentType: string }) => {
        if (!file.fileName || !file.fileContent || !file.contentType) {
          throw new Error('Each file must have fileName, fileContent, and contentType');
        }

        // Decodificar el contenido del archivo (asumiendo que está en base64)
        const decodedFile = Buffer.from(file.fileContent, 'base64');

        const params = {
          Bucket: 'emotiox-backend-dev-bucket',
          Key: `uploads/${file.fileName}`,
          Body: decodedFile,
          ContentType: file.contentType,
        };

        // Subir el archivo al bucket
        await s3.putObject(params).promise();

        // Retornar la URL pública del archivo
        const fileUrl = `https://emotiox-backend-dev-bucket.s3.amazonaws.com/uploads/${file.fileName}`;
        return { fileName: file.fileName, fileUrl };
      })
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Files uploaded successfully',
        files: uploadedFiles,
      }),
    };
  } catch (error) {
    console.error('Error uploading files to S3:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Failed to upload files',
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
    };
  }
};
