import mongoose, { Schema, Document, Types } from 'mongoose';

/**
 * Interface para ResearchCreation
 */
export interface IResearchCreation extends Document {
  researchName: string;
  enterpriseName: string;
  selectedResearchType: string;
  selectedResearchModule: string;
  uploadedFiles?: string[];
  selectedProjects: Types.ObjectId[]; // Referencias a Project
  researchTypeSpecificData?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Esquema para ResearchCreation
 */
const ResearchCreationSchema: Schema<IResearchCreation> = new Schema<IResearchCreation>({
  researchName: { type: String, required: true, trim: true },
  enterpriseName: { type: String, required: true, trim: true },
  selectedResearchType: { type: String, required: true, trim: true },
  selectedResearchModule: { type: String, required: true, trim: true },
  uploadedFiles: [{ type: String }], // URLs de las imágenes
  selectedProjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }], // Referencias a Project
  researchTypeSpecificData: { type: Map, of: Schema.Types.Mixed },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Middleware para actualizar `updatedAt`
ResearchCreationSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

// Registrar modelo
const ResearchCreation = mongoose.model<IResearchCreation>('ResearchCreation', ResearchCreationSchema);

export default ResearchCreation;
