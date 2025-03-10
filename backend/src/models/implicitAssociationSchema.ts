import mongoose, { Schema } from "mongoose";

// Subesquema para los objetos en `targets`
const targetSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  nameOfObject: { type: String, required: false }, // Cambiado a no requerido
  imageUploaded: { 
    type: String, 
    validate: {
      validator: function(v: string | null) {
        if (v === null || v === '') return true;
        return v.startsWith('https://') && v.includes('.s3.');
      },
      message: (props: { value: string }) => `${props.value} is not a valid S3 URL`
    },
    default: null 
  },
  imageFormat: { type: String, default: null },
  image: {
    fileName: { type: String },
    url: { type: String },
    format: { type: String },
    size: { type: Number },
    uploadedAt: { type: Date },
    error: { type: Boolean, default: false }
  }
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
  researchId: { type: String, required: true },
  required: { type: Boolean, default: true },
  targets: [targetSchema],
  textAreas: [textAreaSchema],
  testConfigurations: [testConfigurationSchema],
});

const ImplicitAssociation = mongoose.model("ImplicitAssociation", implicitAssociationSchema);

export default ImplicitAssociation;
