import YAML from 'yamljs';
import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const swaggerDocument = YAML.load(path.resolve(__dirname, '../../openapi.yml'));

// Opciones para la configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User Management API',
      version: '0.1.1',
      description: 'API for user management (registration, authentication, etc.)',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Local Development Server',
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

// Generar la especificación Swagger con swagger-jsdoc
const swaggerSpec = swaggerJSDoc(swaggerOptions);

console.log(swaggerSpec);  // Log para verificar si se genera el esquema OpenAPI

export const setupSwagger = (app: Express) => {
  // Configurar Swagger UI
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
