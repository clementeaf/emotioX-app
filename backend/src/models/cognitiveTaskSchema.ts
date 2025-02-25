import mongoose, { Schema } from "mongoose";

// Subesquema para las opciones de selección (`choices`)
const choiceSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    textInput: { type: String, required: true },
    qualifier: { type: String, enum: ["Qualify", "Disqualify"], required: true },
});

// Subesquema para las imágenes subidas
const uploadedImageSchema = new mongoose.Schema({
    fileName: { type: String, required: true },
    url: { 
        type: String, 
        required: true,
        validate: {
            validator: function(v: string) {
                return v.startsWith('https://') && v.includes('.s3.');
            },
            message: (props: { value: string }) => `${props.value} is not a valid S3 URL`
        }
    },
    format: { type: String, required: true },
    size: { type: Number, required: false },
    fileSizeMB: { type: Number, required: false },
    error: { type: Boolean, default: false },
    time: { type: Number, default: 0 },
    uploadedAt: { type: Date, default: Date.now }
});

// Subesquema para las preguntas
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
    
    // Campo unificado para imágenes
    images: {
        type: [uploadedImageSchema],
        default: [],
        validate: [{
            validator: function(this: any, images: any[]) {
                // Para tipos que no son multipleImages, solo permitir una imagen
                if (this.choiceType !== "multipleImages" && images.length > 1) {
                    return false;
                }
                return true;
            },
            message: 'Single choice questions can only have one image'
        }]
    },
    
    showConditionality: { type: Boolean, default: false },
    choices: { type: [choiceSchema], default: [] },
    randomizeChoices: { type: Boolean, default: false },
    showOtherOption: { type: Boolean, default: false },
});

// Esquema principal
const cognitiveTaskSchema = new mongoose.Schema({
    researchId: { type: String, required: true },
    required: { type: Boolean, default: true },
    questions: [questionSchema],
});

const CognitiveTask = mongoose.model("CognitiveTask", cognitiveTaskSchema);

export default CognitiveTask;
