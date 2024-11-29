import mongoose, { Schema, Model, Document, Types } from 'mongoose';

/**
 * IResearchCreationDocument
 * Interfaz que extiende el documento de Mongoose y define los campos del esquema.
 */
export interface IResearchCreationDocument extends Document {
  researchName: string;
  enterpriseName: string;
  selectedResearchType: string;
  selectedResearchModule: string;
  uploadedFiles?: Types.Array<string>; // Rutas o nombres de archivos (opcional)
  selectedProjects: Types.Array<Types.ObjectId>; // Referencias a proyectos (otras colecciones)
  researchTypeSpecificData?: Record<string, any>; // Datos específicos según el tipo de investigación
  createdAt: Date;
  updatedAt: Date;
}

/**
 * ResearchCreation Schema
 * Define el esquema de la colección researchCreation.
 */
const ResearchCreationSchema: Schema<IResearchCreationDocument> = new Schema<IResearchCreationDocument>({
  researchName: { type: String, required: true, trim: true },
  enterpriseName: { type: String, required: true, trim: true },
  selectedResearchType: { type: String, required: true, trim: true },
  selectedResearchModule: { type: String, required: true, trim: true },
  uploadedFiles: [{ type: String }], // Campo opcional para almacenar rutas de archivos
  selectedProjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }], // Referencias a otra colección
  researchTypeSpecificData: { type: Map, of: Schema.Types.Mixed }, // Datos adicionales según el tipo de investigación
  createdAt: { type: Date, default: Date.now }, // Fecha de creación
  updatedAt: { type: Date, default: Date.now }, // Última fecha de actualización
});

// Middleware para actualizar `updatedAt` automáticamente
ResearchCreationSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

/**
 * Modelo de Mongoose para la colección `researchCreation`
 */
const ResearchCreation: Model<IResearchCreationDocument> = mongoose.model<IResearchCreationDocument>(
  'ResearchCreation',
  ResearchCreationSchema
);

export default ResearchCreation;
