// src/config/database.ts
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dbUri = process.env.MONGO_URI || 'mongodb+srv://clemente:clemente@blazorappdb.j8v7ctn.mongodb.net/blazorAppDB?retryWrites=true&w=majority';

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log('Using existing database connection');
    return;
  }

  try {
    await mongoose.connect(dbUri);
    isConnected = true;
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Error connecting to database:', error);
    throw new Error('Database connection failed');
  }
};

export default connectDB;
