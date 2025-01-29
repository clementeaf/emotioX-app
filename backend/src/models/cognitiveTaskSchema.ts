import mongoose, { Schema } from "mongoose";

// Subesquema para las opciones de selección (`choices`)
const choiceSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    textInput: { type: String, required: true },
    qualifier: { type: String, enum: ["Qualify", "Disqualify"], required: true },
});

// Subesquema para las imágenes subidas (`uploadedImages`)
const uploadedImageSchema = new mongoose.Schema({
    fileName: { type: String, required: true },
    fileSizeMB: { type: Number, required: true },
    error: { type: Boolean, required: true },
    time: { type: Number, required: true },
});

// Subesquema para las preguntas (`questions`)
const questionSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    question: { type: String, required: true },
    choiceType: {
        type: String,
        enum: ["singleChoice", "multipleChoice", "linearScale", "multipleImages"],
        required: true,
    },
    isVisible: { type: Boolean, default: true },
    required: { type: Boolean, default: false },
    placeholder: { type: String, default: "" },
    fileUploadLabel: { type: String, default: "" },
    deviceFrameOptions: [{ type: String }],
    selectedFrame: { type: String, default: "No Frame" },
    inputText: { type: String, default: "" },
    selectedOption: { type: String, default: "" },
    uploadedFile: {
        type: Buffer,
        default: null,
        set: (value: any) => {
            if (value && value instanceof ArrayBuffer) {
                return Buffer.from(value);
            }
            return null;
        },
    },
    uploadedImages: [uploadedImageSchema],
    showConditionality: { type: Boolean, default: false },
    choices: { type: [choiceSchema], default: [] },
    randomizeChoices: { type: Boolean, default: false },
    showOtherOption: { type: Boolean, default: false },
});


// Esquema principal para Cognitive Task (`questions` dentro de una tarea)
const cognitiveTaskSchema = new mongoose.Schema({
    required: { type: Boolean, default: true },
    questions: [questionSchema],
});

const CognitiveTask = mongoose.model("CognitiveTask", cognitiveTaskSchema);

export default CognitiveTask;
