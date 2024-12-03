import mongoose, { Schema, Document, Model } from 'mongoose';

/**
 * Interface para el modelo Project
 */
export interface IProject extends Document {
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Esquema para Project
 */
const ProjectSchema: Schema<IProject> = new Schema<IProject>({
  name: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Middleware para actualizar `updatedAt` automáticamente
ProjectSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

// Registrar modelo
const Project: Model<IProject> = mongoose.model<IProject>('Project', ProjectSchema);

export default Project;
