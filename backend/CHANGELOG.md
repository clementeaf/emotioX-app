# Changelog

Todos los cambios notables en este proyecto serán documentados en este archivo.

El formato se basa en [Keep a Changelog](https://keepachangelog.com/es/1.0.0/), y este proyecto sigue [Semantic Versioning](https://semver.org/lang/es/).

## [0.1.1] - 2024-09-29

### Añadido
- **Middleware de Manejo de Errores Asincrónicos (`asyncHandler`):**
  - Implementado para manejar errores de manera eficiente en las rutas que utilizan funciones asíncronas.
  - **Archivos Modificados/Agregados:**
    - `src/middlewares/asyncHandler.ts`
  - **Funcionalidad:**  
    - Envolvimiento de las funciones asíncronas para capturar y propagar errores automáticamente a la capa de manejo de errores.

- **Rutas de Usuario:**
  - Añadidos endpoints para gestionar las operaciones relacionadas con usuarios (`/register`, `/login`, `/update/:id`, `/delete/:id`, `/update-password/:id`).
  - **Archivos Modificados/Agregados:**
    - `src/routes/user.routes.ts`
    - `src/controllers/user.controller.ts`
  - **Funcionalidad:**
    - **Registro de Usuario (`/register`):** Registra nuevos usuarios cifrando la contraseña antes de almacenarla.
    - **Login de Usuario (`/login`):** Autentica usuarios devolviendo un token JWT.
    - **Actualización de Usuario (`/update/:id`):** Actualiza información de perfil (sin modificar la contraseña).
    - **Eliminación de Usuario (`/delete/:id`):** Elimina un usuario por su ID.
    - **Actualización de Contraseña (`/update-password/:id`):** Permite actualizar la contraseña sin verificar la antigua.
  
- **Modelos y Servicios Relacionados con Usuarios:**
  - Creación del modelo de `User` y las correspondientes funciones de servicio para la interacción con la base de datos.
  - **Archivos Modificados/Agregados:**
    - `src/models/user.model.ts`
    - `src/services/database.service.ts`
  - **Funcionalidad:**
    - Métodos de `comparePassword` para verificar contraseñas y `generatePasswordResetToken` para generación de tokens de restablecimiento de contraseña.
    - Funciones de servicio para agregar, actualizar, buscar y eliminar usuarios en la base de datos.

- **Middleware para Cifrado de Contraseñas (`hashPasswordMiddleware`):**
  - Implementado para cifrar automáticamente las contraseñas antes de guardar un usuario.
  - **Archivos Modificados/Agregados:**
    - `src/middlewares/hashPassword.middleware.ts`
  - **Funcionalidad:**  
    - Cifra la contraseña antes de cada operación de guardado usando `bcryptjs`.

- **Controlador de Aplicación (`app.ts`):**
  - Configuración del servidor Express, rutas de usuario y manejo de errores genéricos.
  - **Archivos Modificados/Agregados:**
    - `src/app.ts`
  - **Funcionalidad:**  
    - Manejo de peticiones HTTP, rutas relacionadas con los usuarios y middleware para gestionar errores del servidor.

- **Archivo de Inicialización del Servidor (`server.ts`):**
  - Implementación del punto de entrada que levanta el servidor Express en el puerto especificado.
  - **Archivos Modificados/Agregados:**
    - `src/server.ts`
  - **Funcionalidad:**  
    - Inicia el servidor en el puerto definido por la variable de entorno `PORT` o por defecto en el puerto `3000`.

### Actualizado
- **Integración de MongoDB:**
  - Se aseguraron las conexiones a la base de datos para las operaciones CRUD de los usuarios.
  - **Dependencias Utilizadas:**
    - `mongoose` para la conexión y manejo de los documentos de MongoDB.

---

## [0.1.0] - 2024-09-28

### Añadido
- **Endpoint de Registro de Usuario:** Implementado el endpoint `/register` que permite el registro de nuevos usuarios en la base de datos.  
  - **Funcionalidad:**  
    - Recibe `username`, `email` y `password` como datos de entrada.
    - Verifica si el correo electrónico ya está registrado.
    - Cifra la contraseña antes de guardarla en la base de datos.
    - Devuelve una respuesta exitosa con los datos del usuario registrado (sin la contraseña).
  - **Archivos Modificados/Agregados:**
    - `src/controllers/auth.controller.ts`
    - `src/services/auth.service.ts`
    - `src/routes/auth.routes.ts`
    - `src/models/user.model.ts`
  - **Dependencias Utilizadas:**
    - `bcryptjs` para el cifrado de contraseñas.
    - `mongoose` para la interacción con la base de datos MongoDB.

---

Este es el comienzo del historial de cambios para este proyecto. A medida que se añadan nuevas funcionalidades, correcciones de errores, y otras modificaciones, se documentarán aquí para mantener un registro claro y actualizado.
