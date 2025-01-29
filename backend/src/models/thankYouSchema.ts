import mongoose from "mongoose";

// Subesquema para la pantalla de agradecimiento (`thankYouScreen`)
const thankYouScreenSchema = new mongoose.Schema({
  isRequired: { type: Boolean, default: false },
  title: { type: String, default: "" }, // Permite valores en blanco
  message: { type: String, default: "" }, // Permite valores en blanco
});

// Modelo de Mongoose
const ThankYouScreen = mongoose.model("ThankYouScreen", thankYouScreenSchema);

export default ThankYouScreen;