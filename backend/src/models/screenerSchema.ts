import mongoose, { Schema } from 'mongoose';

// Subesquema para las opciones de screener
const screenerOptionSchema = new mongoose.Schema({
  option1: { type: String, required: true },
  selection: { type: String, enum: ['Qualify', 'Disqualify'], required: true },
});

// Esquema principal para Screener
const screenerSchema = new mongoose.Schema({
  researchId: { type: mongoose.Schema.Types.ObjectId, ref: 'ResearchCreation', required: true },
  questionText: { type: String, required: true },
  options: [screenerOptionSchema],
});

// Crear y exportar el modelo
const ScreenerSchema = mongoose.model('Screener', screenerSchema);

export default ScreenerSchema;
