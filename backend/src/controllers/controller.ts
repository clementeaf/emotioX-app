import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import crypto from 'crypto';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import connectDB from '../config/database';
import User from '../models/user';
import mongoose from 'mongoose';
import { IUserDocument } from '../types/user.interface';
import TemporaryPasswordModel from '../models/temporaryPassword';

dotenv.config();
const sesClient = new SESClient({ region: "us-east-1" });

/**
 * Registers a new user in the database
 * @param event - AWS Lambda event object, expects user data in JSON format in the body
 * @returns The created user or an error message
 */
export const registerUser = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.body) {
      throw new Error('Missing user data in request body');
    }

    const { name, lastname, email, username, password } = JSON.parse(event.body);

    await connectDB(); // Asegúrate de que la conexión esté abierta

    // Verificar si ya existe un usuario con el mismo email o username
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'Email or username already exists' }),
      };
    }

    // Hashear la contraseña usando argon2
    const hashedPassword = await argon2.hash(password);

    // Crear el nuevo usuario con la contraseña hasheada
    const newUser = await User.create({
      name,
      lastname,
      email,
      username,
      password: hashedPassword,
    });

    return {
      statusCode: 201,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    };
  } catch (error) {
    console.error('Error registering user:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Registration failed' }),
    };
  }
};

/**
 * Retrieves all users from the database
 * @param event - AWS Lambda event object
 * @returns A list of all users or an error message
 */
export const getAllUsers = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  try {
    // Conectar a la base de datos
    await connectDB();

    // Obtener todos los usuarios usando el modelo de Mongoose
    const users = await User.find({});

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(users),
    };
  } catch (error) {
    console.error('Error retrieving users:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Failed to retrieve users' }),
    };
  }
};

/**
 * Retrieves a single user from the database by ID
 * @param event - AWS Lambda event object, expects an "id" parameter
 * @returns The user data or an error message
 */
export const getUserById = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  try {
    // Conectar a la base de datos
    await connectDB();

    // Obtener el ID del usuario de los parámetros de la ruta
    const userId = event.pathParameters?.id;

    if (!userId) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'User ID is required' }),
      };
    }

    // Verificar que el ID sea válido
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'Invalid user ID' }),
      };
    }

    // Buscar el usuario por ID usando el modelo de Mongoose
    const user = await User.findById(userId);

    if (!user) {
      return {
        statusCode: 404,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'User not found' }),
      };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    };
  } catch (error) {
    console.error('Error retrieving user by ID:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Failed to retrieve user' }),
    };
  }
};

/**
 * Deletes a user from the database by ID
 * @param event - AWS Lambda event object, expects an "id" parameter
 * @returns A success message or an error message
 */
export const deleteUserById = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  try {
    // Conectar a la base de datos
    await connectDB();

    // Obtener el ID del usuario de los parámetros de la ruta
    const userId = event.pathParameters?.id;

    if (!userId) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'User ID is required' }),
      };
    }

    // Verificar que el ID sea válido
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'Invalid user ID' }),
      };
    }

    // Eliminar el usuario por ID usando el modelo de Mongoose
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return {
        statusCode: 404,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'User not found' }),
      };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'User deleted successfully', user: deletedUser }),
    };
  } catch (error) {
    console.error('Error deleting user by ID:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Failed to delete user' }),
    };
  }
};

/**
 * Updates a user's data in the database by ID
 * @param event - AWS Lambda event object, expects an "id" parameter and user data in the body
 * @returns The updated user data or an error message
 */
export const updateUserById = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  try {
    // Conectar a la base de datos
    await connectDB();

    // Obtener el ID del usuario de los parámetros de la ruta
    const userId = event.pathParameters?.id;

    if (!userId) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'User ID is required' }),
      };
    }

    // Verificar que el ID sea válido
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'Invalid user ID' }),
      };
    }

    // Verificar si el cuerpo de la solicitud contiene datos
    if (!event.body) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'Request body is required' }),
      };
    }

    // Parsear los datos del cuerpo
    const updatedData = JSON.parse(event.body);

    // Verificar si se está actualizando la contraseña
    if (updatedData.password) {
      updatedData.password = await argon2.hash(updatedData.password); // Hashear la nueva contraseña
    }

    // Buscar y actualizar el usuario
    const user = await User.findByIdAndUpdate(userId, updatedData, {
      new: true, // Devuelve el documento actualizado
      runValidators: true, // Ejecuta validaciones en los datos actualizados
    });

    if (!user) {
      return {
        statusCode: 404,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'User not found' }),
      };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'User updated successfully', user }),
    };
  } catch (error) {
    console.error('Error updating user by ID:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Failed to update user' }),
    };
  }
};

/**
 * Authenticates a user based on username or email and password
 * @param event - AWS Lambda event object, expects username/email and password in the body
 * @returns A success message with user data or an error message
 */
export const loginUser = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.body) {
      throw new Error('Missing user data in request body');
    }

    const { identifier, password } = JSON.parse(event.body);

    await connectDB();

    const user = (await User.findOne({ $or: [{ email: identifier }, { username: identifier }] })) as IUserDocument | null;

    if (!user) {
      return {
        statusCode: 404,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'User not found' }),
      };
    }

    const isPasswordValid = await argon2.verify(user.password, password);

    if (!isPasswordValid) {
      return {
        statusCode: 401,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'Invalid password' }),
      };
    }

    // Convertir explícitamente _id a string
    const { accessToken, refreshToken } = generateTokens((user._id as mongoose.Types.ObjectId).toHexString());

    user.refreshToken = refreshToken;
    await user.save();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        message: 'Login successful',
        accessToken: `Bearer ${accessToken}`,
        refreshToken,
        user: {
          id: user._id,
          name: user.name,
          lastname: user.lastname,
          email: user.email,
          username: user.username,
        },
      }),
    };
  } catch (error) {
    console.error('Error during login:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Login failed' }),
    };
  }
};


/**
 * Logs out a user by updating their last session and optionally revoking the token
 * @param event - AWS Lambda event object
 * @returns A success message or an error message
 */
export const logoutUser = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  try {
    await connectDB();

    // Obtener el token de autorización del encabezado y eliminar el prefijo "Bearer "
    const authHeader = event.headers.Authorization || event.headers.authorization;
    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

    if (!token) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'Authorization token is required' }),
      };
    }

    // Decodificar el token para extraer el ID del usuario
    const decodedToken = decodeToken(token);
    const userId = decodedToken?.id;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'Invalid token or user ID' }),
      };
    }

    // Buscar el usuario por ID y actualizar su última sesión
    const user = await User.findByIdAndUpdate(
      userId,
      { lastSession: new Date() },
      { new: true }
    );

    if (!user) {
      return {
        statusCode: 404,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'User not found' }),
      };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Logout successful', user: { id: user._id, lastSession: user.lastSession } }),
    };
  } catch (error) {
    console.error('Error during logout:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Failed to logout' }),
    };
  }
};

// Función refresh token
export const refreshToken = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  try {
    // Conectar a la base de datos
    await connectDB();

    const { refreshToken } = JSON.parse(event.body || '{}');
    console.log('refreshToken: ', refreshToken)

    if (!refreshToken) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'Refresh token is required' }),
      };
    }

    // Verificar el refresh token
    console.log('Verificando ...')
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || 'mi_refresh_secreto') as { id: string };
    console.log('decodificando ...', decoded.id)
    const user = await User.findById(decoded.id);
    console.log('Decodificado: ', user)


    if (!user || user.refreshToken !== refreshToken) {
      return {
        statusCode: 403,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'Invalid refresh token' }),
      };
    }

    // Generar nuevo access token
    const newAccessToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'access_secret',
      { expiresIn: '15m' }
    );

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accessToken: newAccessToken }),
    };
  } catch (error) {
    console.error('Error refreshing token:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Failed to refresh token' }),
    };
  }
};

// Función para decodificar el token
const decodeToken = (token: string): { id: string } | null => {
  try {
    const jwtSecret = process.env.JWT_SECRET || 'mi_secreto';
    if (!jwtSecret) {
      console.error('JWT_SECRET not defined');
      return null;
    }
    const decoded = jwt.verify(token, jwtSecret) as { id: string };
    return decoded;
  } catch (error) {
    console.error('Invalid token');
    return null;
  }
};

// Función para generar access token y refresh token
const generateTokens = (userId: string) => {
  const accessToken = jwt.sign(
    { id: userId },
    process.env.JWT_SECRET || 'mi_secreto',
    { expiresIn: '15m' } // access token expira en 15 minutos
  );

  const refreshToken = jwt.sign(
    { id: userId },
    process.env.JWT_REFRESH_SECRET || 'mi_refresh_secreto',
    { expiresIn: '7d' } // refresh token expira en 7 días
  );

  return { accessToken, refreshToken };
};

function generateTemporaryPassword(length: number = 8): string {
  return crypto.randomBytes(length).toString('hex');
}

// Función para enviar la contraseña temporal y guardarla en la base de datos
export const sendTemporaryPassword = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  try {
      await connectDB();
      // Parseamos el body para obtener la dirección de correo
      const { email } = JSON.parse(event.body || "{}");

      if (!email) {
          return {
              statusCode: 400,
              body: JSON.stringify({ message: "El campo 'email' es requerido en el cuerpo de la solicitud" }),
          };
      }

      // Generamos una contraseña temporal
      const temporaryPassword = generateTemporaryPassword(8);

      // Guardamos o actualizamos la contraseña temporal en la base de datos
      await TemporaryPasswordModel.findOneAndUpdate(
          { email }, // Buscamos por email
          { email, temporaryPassword, createdAt: new Date() }, // Actualizamos la contraseña y fecha de creación
          { upsert: true, new: true } // Si no existe, creamos un nuevo documento
      );

      // Configuramos los parámetros del correo
      const params = {
          Destination: {
              ToAddresses: [email], // Usamos el correo proporcionado por el cliente
          },
          Message: {
              Body: {
                  Text: { Data: `Tu contraseña temporal es: ${temporaryPassword}. Esta contraseña es válida por 15 minutos.` },
              },
              Subject: { Data: "Tu contraseña temporal de EmotioX" },
          },
          Source: "carriagadafalcone@gmail.com", // Cambia a tu dirección verificada en SES
      };

      // Enviamos el correo usando SES
      const command = new SendEmailCommand(params);
      await sesClient.send(command);

      // Respuesta exitosa
      return {
          statusCode: 200,
          body: JSON.stringify({
              message: "Correo enviado exitosamente",
          }),
      };
  } catch (error) {
      console.error("Error al enviar correo:", error);
      return {
          statusCode: 500,
          body: JSON.stringify({ message: "Error al enviar correo" }),
      };
  }
};