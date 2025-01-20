import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async (): Promise<void> => {
  const mongoURI = process.env.MONGO_URI || 'mongodb+srv://clemente:clemente@blazorappdb.j8v7ctn.mongodb.net/blazorAppDB?retryWrites=true&w=majority';
  if (!mongoURI) {
    throw new Error("MONGO_URI is not defined in environment variables");
  }

  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected successfully");
  } else {
    console.log("Using existing MongoDB connection");
  }
};

export default connectDB;

