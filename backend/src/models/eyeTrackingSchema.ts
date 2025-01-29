import mongoose, { Schema } from "mongoose";

// Subesquema para los archivos subidos (`uploadedFiles`)
const uploadedFileSchema = new mongoose.Schema({
  fileName: { type: String, required: false }, // Ahora no es obligatorio
  fileSize: { type: Number, required: false }, // Ahora no es obligatorio
});

// Esquema principal para Eye Tracking
const eyeTrackingSchema = new mongoose.Schema({
  required: { type: Boolean, default: false },
  taskInstruction: { type: String, default: "" },
  uploadedFiles: [uploadedFileSchema], // Lista de archivos subidos
  randomize: { type: Boolean, default: false },
  isShelfTask: { type: Boolean, default: false },
  resizeImage: { type: Boolean, default: false },
  useEyeTrackingDevice: { type: Boolean, default: false },
  useWebcamBasedTracking: { type: Boolean, default: false },
  enableClickMeasurement: { type: Boolean, default: false },
  finishOnAnyKey: { type: Boolean, default: false },
  holdDeviceVertical: { type: Boolean, default: false },
  holdDeviceHorizontal: { type: Boolean, default: false },
  displayTime: { type: String, default: "10 secs" },
});

const EyeTracking = mongoose.model("EyeTracking", eyeTrackingSchema);

export default EyeTracking;
