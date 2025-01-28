import mongoose, { Schema, Document } from 'mongoose';

// Interfaz para TypeScript
export interface IWelcomeScreen extends Document {
  researchId: mongoose.Types.ObjectId; // Relación con la investigación
  isRequired: boolean;
  title: string;
  message: string;
  buttonText: string;
}

// Esquema de Mongoose
const welcomeScreenSchema = new Schema<IWelcomeScreen>({
  researchId: { type: Schema.Types.ObjectId, ref: 'ResearchCreation', required: true },
  isRequired: { type: Boolean, default: false },
  title: { type: String, required: true, trim: true },
  message: { type: String, required: true, trim: true },
  buttonText: { type: String, required: true, trim: true },
});

// Modelo de Mongoose
const WelcomeScreenModel = mongoose.model<IWelcomeScreen>('WelcomeScreen', welcomeScreenSchema);

export default WelcomeScreenModel;
