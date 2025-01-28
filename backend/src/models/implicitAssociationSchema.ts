import mongoose, { Schema } from "mongoose";

// Subesquema para los objetos en `targets`
const targetSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  nameOfObject: { type: String, required: false }, // Cambiado a no requerido
  imageUploaded: { type: Buffer, default: null },
  imageFormat: { type: String, default: null },
});

// Subesquema para los objetos en `textAreas`
const textAreaSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  label: { type: String, required: true },
  value: { type: String, default: "" },
});

const testConfigurationSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  label: { type: String, required: true },
  checked: { type: Boolean, default: false },
});

const implicitAssociationSchema = new mongoose.Schema({
  required: { type: Boolean, default: true },
  targets: [targetSchema],
  textAreas: [textAreaSchema],
  testConfigurations: [testConfigurationSchema],
});

const ImplicitAssociation = mongoose.model("ImplicitAssociation", implicitAssociationSchema);

export default ImplicitAssociation;
