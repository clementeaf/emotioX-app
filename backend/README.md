# **Auth Backend - Proyecto de Autenticación de Usuarios**

Este proyecto implementa un backend para el registro y autenticación de usuarios utilizando Node.js, TypeScript, Serverless Framework y MongoDB. Proporciona funcionalidades clave como registro de usuario, autenticación, generación de Bearer Tokens, renovación de tokens y cierre de sesión.

## **Requisitos Previos**

Para configurar y ejecutar este proyecto, necesitas tener instaladas las siguientes herramientas:

- **Node.js** (v18.x o superior): Plataforma de JavaScript para el desarrollo del servidor.  
  [Descargar Node.js](https://nodejs.org/)
- **npm**: Administrador de paquetes de Node.js (instalado automáticamente con Node.js).
- **Serverless Framework**: Herramienta para desarrollar y desplegar aplicaciones serverless en AWS Lambda.  
  Instala Serverless Framework globalmente:
  ```bash
  npm install -g serverless

## Estructura del Proyecto 
La arquitectura del proyecto está organizada de manera modular para mantener la separación de responsabilidades y la escalabilidad:

/backend
├── src
│   ├── controllers       # Controladores para manejar la lógica de las rutas
│   │   ├── auth.controller.ts
│   ├── middlewares       # Middlewares para validaciones y autenticaciones
│   │   ├── auth.middleware.ts
│   ├── models            # Modelos de datos y esquemas de Mongoose
│   │   ├── user.model.ts
│   │   ├── revokedToken.model.ts
│   ├── routes            # Definición de rutas de la API
│   │   ├── auth.routes.ts
│   ├── services          # Servicios que contienen la lógica de negocio
│   │   ├── auth.service.ts
│   ├── utils             # Utilidades y funciones de ayuda
│   │   ├── jwt.utils.ts
│   ├── index.ts          # Punto de entrada principal del backend
├── .env                  # Variables de entorno
├── .gitignore            # Archivos y carpetas a ignorar por git
├── serverless.yml        # Configuración de Serverless Framework para despliegue
├── tsconfig.json         # Configuración de TypeScript
└── package.json          # Dependencias y scripts del proyecto
## Descripción de los Componentes

Controllers: Controlan la lógica de entrada y salida de las rutas, coordinando el flujo de la aplicación.
Middlewares: Verifican autenticaciones y manejan errores antes de que las solicitudes lleguen a los controladores.
Models: Definen los esquemas de la base de datos y la interacción con MongoDB mediante Mongoose.
Routes: Gestionan las rutas de la API y conectan los endpoints con sus respectivos controladores.
Services: Contienen la lógica de negocio central, como la creación de usuarios, generación de tokens, etc.
Utils: Funciones auxiliares, como generación y verificación de tokens JWT.
Endpoints Principales
POST /register: Registra un nuevo usuario.
POST /login: Autentica un usuario y devuelve un JWT.
POST /refresh: Renueva un JWT antes de que expire.
POST /logout: Cierra la sesión revocando el token actual.

## Comandos Útiles
Despliegue en AWS:

serverless deploy
Ejecución en Modo Local: Para probar el proyecto localmente utilizando serverless-offline:

serverless offline
Compilación del Proyecto: Compila el proyecto TypeScript a JavaScript.

npm run build
Próximos Pasos
Implementar Pruebas: Añadir pruebas unitarias y de integración.
Añadir Documentación de API: Utilizar herramientas como Swagger para documentar los endpoints de la API.
Optimizar Seguridad: Añadir medidas adicionales de seguridad para la protección de datos y tokens.

# Instrucciones para Desplegar EmotioX Backend

## Requisitos previos
1. Instala [Node.js](https://nodejs.org/).
2. Instala [AWS CLI](https://aws.amazon.com/cli/) y asegúrate de que esté en el PATH.
3. Solicita tus credenciales de AWS IAM con los permisos adecuados.

## Configuración inicial
1. Copia tus credenciales de AWS en un archivo llamado `aws-credentials.json` con el siguiente formato:
   ```json
   {
     "aws_access_key_id": "USER_AWS_ACCESS_KEY_ID",
     "aws_secret_access_key": "USER_AWS_SECRET_ACCESS_KEY",
     "region": "us-east-1"
   }


node setup-aws.js --credentials=custom-aws-credentials.json
