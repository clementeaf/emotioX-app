import { create } from "zustand";
import { UploadedImage } from "../types/types";

export interface Choice {
  id: number;
  textInput: string;
  qualifier: "Qualify" | "Disqualify";
}

export interface QuestionBase {
  id: number;
  question: string;
  isVisible: boolean;
  required: boolean;
  placeholder: string;
  fileUploadLabel?: string;
  deviceFrameOptions?: string[];
  selectedFrame?: string;
  inputText?: string;
  selectedOption?: string;

  showConditionality: boolean;
  choiceType: "singleChoice" | "multipleChoice" | "linearScale" | "multipleImages";
  choices: Choice[];
  randomizeChoices: boolean;
  showOtherOption: boolean;
}

/** ✅ Caso 1: Para preguntas con UNA SOLA imagen */
export interface SingleImageQuestion extends QuestionBase {
  choiceType: "singleChoice" | "multipleChoice" | "linearScale";
  uploadedFile?: File | null; // Archivo temporal antes de la subida a S3
  uploadedImage?: UploadedImage | null; // Referencia en S3 después de la subida
}

/** ✅ Caso 2: Para preguntas con MULTIPLES imágenes */
export interface MultipleImagesQuestion extends QuestionBase {
  choiceType: "multipleImages";
  uploadedImages: UploadedImage[]; // Lista de referencias en S3 después de la subida
}

/** ✅ La interfaz `Question` ahora puede ser de un solo tipo o de múltiples imágenes */
export type Question = SingleImageQuestion | MultipleImagesQuestion;

export interface CognitiveTaskStore {
  required: boolean;
  setRequired: (value: boolean) => void;

  questions: Question[];
  toggleVisibility: (id: number) => void;
  setQuestionRequired: (id: number, value: boolean) => void;
  updateQuestionText: (id: number, text: string) => void;

  /** ✅ Para preguntas con UNA SOLA imagen */
  updateSingleImageFile: (id: number, file: File | null) => void;
  updateSingleImageReference: (id: number, image: UploadedImage | null) => void;

  /** ✅ Para preguntas con MULTIPLES imágenes */
  addUploadedImage: (id: number, newImage: UploadedImage) => void;
  removeUploadedImage: (id: number, fileName: string) => void;
  updateMultipleImageReference: (id: number, updatedImages: UploadedImage[]) => void;
  updateImageTime: (id: number, fileName: string, time: number) => void;

  updateSelectedOption: (id: number, option: string) => void;
  updateSelectedFrame: (id: number, frame: string) => void;

  toggleConditionality: (id: number) => void;
  setChoiceType: (id: number, type: "singleChoice" | "multipleChoice" | "linearScale" | "multipleImages") => void;
  addChoice: (id: number) => void;
  removeChoice: (id: number, choiceId: number) => void;
  updateChoice: (id: number, choiceId: number, key: keyof Choice, value: string) => void;
  toggleRandomizeChoices: (id: number) => void;
  toggleShowOtherOption: (id: number) => void;

  /** ✅ Obtener archivos a subir */
  getFilesToUpload: () => { id: number; file: File; isMultiple: boolean }[];
}

export const useCognitiveTaskStore = create<CognitiveTaskStore>((set, get) => ({
  required: true,

  questions: [
    // 2 Single Choice
    {
      id: 1,
      question: "6.1.- Question _italic_ **bold** - bullet list 1. ordered list",
      isVisible: true,
      required: false,
      placeholder: "Choose an option...",
      fileUploadLabel: "Click to Upload",
      deviceFrameOptions: ["No Frame", "Device Frame"],
      selectedFrame: "No Frame",
      inputText: "",
      selectedOption: "Single choice",
      uploadedImage: null, // ✅ Se almacena la referencia de S3
      showConditionality: false,
      choiceType: "singleChoice",
      choices: [
        { id: 1, textInput: "Option A", qualifier: "Qualify" },
        { id: 2, textInput: "Option B", qualifier: "Disqualify" },
      ],
      randomizeChoices: false,
      showOtherOption: false,
    },
    {
      id: 2,
      question: "6.2.- Question _italic_ **bold** - bullet list 1. ordered list",
      isVisible: true,
      required: true,
      placeholder: "Choose an option...",
      fileUploadLabel: "Click to Upload",
      deviceFrameOptions: ["No Frame", "Device Frame"],
      selectedFrame: "Device Frame",
      inputText: "",
      selectedOption: "Single choice",
      uploadedImage: null, // ✅ Se almacena la referencia de S3
      showConditionality: false,
      choiceType: "singleChoice",
      choices: [
        { id: 1, textInput: "Option 1", qualifier: "Qualify" },
        { id: 2, textInput: "Option 2", qualifier: "Disqualify" },
      ],
      randomizeChoices: false,
      showOtherOption: false,
    },

    // 2 Multiple Choice
    {
      id: 3,
      question: "6.3.- Question _italic_ **bold** - bullet list 1. ordered list",
      isVisible: true,
      required: false,
      placeholder: "Choose multiple options...",
      fileUploadLabel: "Click to Upload",
      deviceFrameOptions: ["No Frame", "Device Frame"],
      selectedFrame: "No Frame",
      inputText: "",
      selectedOption: "Multiple choice",
      uploadedImage: null, // ✅ Se almacena la referencia de S3
      showConditionality: true,
      choiceType: "multipleChoice",
      choices: [
        { id: 1, textInput: "Option A", qualifier: "Qualify" },
        { id: 2, textInput: "Option B", qualifier: "Disqualify" },
        { id: 3, textInput: "Option C", qualifier: "Qualify" },
      ],
      randomizeChoices: true,
      showOtherOption: true,
    },
    {
      id: 4,
      question: "6.4.- Question _italic_ **bold** - bullet list 1. ordered list",
      isVisible: true,
      required: true,
      placeholder: "Choose multiple options...",
      fileUploadLabel: "Click to Upload",
      deviceFrameOptions: ["No Frame", "Device Frame"],
      selectedFrame: "No Frame",
      inputText: "",
      selectedOption: "Multiple choice",
      uploadedImage: null, // ✅ Se almacena la referencia de S3
      showConditionality: false,
      choiceType: "multipleChoice",
      choices: [
        { id: 1, textInput: "Option X", qualifier: "Qualify" },
        { id: 2, textInput: "Option Y", qualifier: "Disqualify" },
        { id: 3, textInput: "Option Z", qualifier: "Qualify" },
      ],
      randomizeChoices: false,
      showOtherOption: true,
    },

    // 1 Linear Scale
    {
      id: 5,
      question: "6.5.- Question _italic_ **bold** - bullet list 1. ordered list",
      isVisible: true,
      required: true,
      placeholder: "Define the scale...",
      fileUploadLabel: "Click to Upload",
      deviceFrameOptions: ["No Frame", "Device Frame"],
      selectedFrame: "No Frame",
      inputText: "",
      selectedOption: "Linear scale",
      uploadedImage: null, // ✅ Se almacena la referencia de S3
      showConditionality: false,
      choiceType: "linearScale",
      choices: [], // No aplica para linear scale
      randomizeChoices: false,
      showOtherOption: false,
    },

    // 1 Multiple Choice without Image
    {
      id: 6,
      question: "6.6.- Question _italic_ **bold** - bullet list 1. ordered list",
      isVisible: true,
      required: false,
      placeholder: "Choose multiple options...",
      inputText: "",
      selectedOption: "Multiple choice",
      showConditionality: false,
      choiceType: "multipleChoice",
      choices: [
        { id: 1, textInput: "Option A", qualifier: "Qualify" },
        { id: 2, textInput: "Option B", qualifier: "Disqualify" },
      ],
      randomizeChoices: false,
      showOtherOption: false,
    },

    // 2 Multiple Images
    {
      id: 7,
      question: "6.7.- Question _italic_ **bold** - bullet list 1. ordered list",
      isVisible: true,
      required: true,
      placeholder: "",
      fileUploadLabel: "Upload Images",
      deviceFrameOptions: ["No Frame", "Device Frame", "Custom Frame"],
      selectedFrame: "No Frame",
      uploadedImages: [], // ✅ Inicializado vacío para esperar subida a S3
      inputText: "",
      selectedOption: "",
      showConditionality: false,
      choiceType: "multipleImages",
      choices: [],
      randomizeChoices: false,
      showOtherOption: false,
    },
    {
      id: 8,
      question: "6.8.- Question _italic_ **bold** - bullet list 1. ordered list",
      isVisible: true,
      required: true,
      placeholder: "",
      fileUploadLabel: "Upload Images",
      deviceFrameOptions: ["No Frame", "Device Frame", "Custom Frame"],
      selectedFrame: "No Frame",
      uploadedImages: [], // ✅ Inicializado vacío para esperar subida a S3
      inputText: "",
      selectedOption: "",
      showConditionality: false,
      choiceType: "multipleImages",
      choices: [],
      randomizeChoices: false,
      showOtherOption: false,
    },
  ],

  setRequired: (value) =>
    set(() => ({
      required: value,
    })),

  toggleVisibility: (id) =>
    set((state) => ({
      questions: state.questions.map((q) =>
        q.id === id
          ? { ...q, isVisible: !q.isVisible }
          : q
      ),
    })),


  setQuestionRequired: (id, value) =>
    set((state) => ({
      questions: state.questions.map((q) =>
        q.id === id ? { ...q, required: value } : q
      ),
    })),

  updateQuestionText: (id, text) =>
    set((state) => ({
      questions: state.questions.map((q) =>
        q.id === id ? { ...q, inputText: text } : q
      ),
    })),

  updateUploadedFile: (id: number, uploadedImage: any) =>
    set((state) => ({
      questions: state.questions.map((q) =>
        q.id === id
          ? { ...q, uploadedImage: uploadedImage } // Asigna directamente el objeto `UploadedImage`
          : q
      ),
    })),

  /** ✅ Métodos para manejo de imágenes únicas */
  updateSingleImageFile: (id, file) =>
    set((state) => ({
      questions: state.questions.map((q) =>
        q.id === id && q.choiceType !== "multipleImages"
          ? { 
              ...q, 
              uploadedFile: file,
              uploadedImage: file ? {
                id: `${Date.now()}-${file.name}`,
                fileName: file.name,
                file: file,
                format: file.type,
                size: file.size,
                uploadedAt: new Date()
              } : null
            }
          : q
      ),
    })),

  updateSingleImageReference: (id, image) =>
    set((state) => ({
      questions: state.questions.map((q) =>
        q.id === id && q.choiceType !== "multipleImages"
          ? { 
              ...q, 
              uploadedImage: image,
              uploadedFile: null  // Limpiamos el archivo temporal
            }
          : q
      ),
    })),

  updateSelectedOption: (id, option) =>
    set((state) => ({
      questions: state.questions.map((q) =>
        q.id === id ? { ...q, selectedOption: option } : q
      ),
    })),

  updateSelectedFrame: (id, frame) =>
    set((state) => ({
      questions: state.questions.map((q) =>
        q.id === id ? { ...q, selectedFrame: frame } : q
      ),
    })),

  toggleConditionality: (id) =>
    set((state) => ({
      questions: state.questions.map((q) =>
        q.id === id ? { ...q, showConditionality: !q.showConditionality } : q
      ),
    })),

  setChoiceType: (id, type) =>
    set((state) => ({
      questions: state.questions.map((q) => {
        if (q.id !== id) return q;

        const updatedChoices =
          type === "singleChoice"
            ? [{ id: 1, textInput: "", qualifier: "Qualify" as "Qualify" }]
            : type === "multipleChoice"
              ? Array.from({ length: 3 }, (_, index) => ({
                id: index + 1,
                textInput: `Option ${index + 1}`,
                qualifier: "Qualify" as "Qualify",
              }))
              : [];

        if (type === "multipleImages") {
          const existingImages = q.choiceType === "multipleImages" 
            ? q.uploadedImages 
            : q.uploadedImage 
              ? [q.uploadedImage]
              : [];

          const multipleImageQuestion: MultipleImagesQuestion = {
            ...q,
            choiceType: type,
            choices: updatedChoices,
            uploadedImages: existingImages,
            question: q.question,
            isVisible: q.isVisible,
            required: q.required,
            placeholder: q.placeholder,
            fileUploadLabel: q.fileUploadLabel,
            deviceFrameOptions: q.deviceFrameOptions,
            selectedFrame: q.selectedFrame,
            inputText: q.inputText,
            selectedOption: q.selectedOption,
            showConditionality: q.showConditionality,
            randomizeChoices: q.randomizeChoices,
            showOtherOption: q.showOtherOption
          };

          return multipleImageQuestion;
        }

        const singleImageQuestion: SingleImageQuestion = {
          ...q,
          choiceType: type as "singleChoice" | "multipleChoice" | "linearScale",
          choices: updatedChoices,
          uploadedFile: q.choiceType !== "multipleImages" ? q.uploadedFile ?? null : null,
          uploadedImage: q.choiceType !== "multipleImages" 
            ? q.uploadedImage ?? null 
            : q.uploadedImages?.[0] ?? null,
          question: q.question,
          isVisible: q.isVisible,
          required: q.required,
          placeholder: q.placeholder,
          fileUploadLabel: q.fileUploadLabel,
          deviceFrameOptions: q.deviceFrameOptions,
          selectedFrame: q.selectedFrame,
          inputText: q.inputText,
          selectedOption: q.selectedOption,
          showConditionality: q.showConditionality,
          randomizeChoices: q.randomizeChoices,
          showOtherOption: q.showOtherOption
        };

        return singleImageQuestion;
      }),
    })),

  addChoice: (id) =>
    set((state) => ({
      questions: state.questions.map((q) => {
        if (q.id === id && q.choiceType === "multipleChoice") {
          const newChoice: Choice = {
            id: q.choices.length + 1,
            textInput: "",
            qualifier: "Qualify",
          };
          return { ...q, choices: [...q.choices, newChoice] };
        }
        return q;
      }),
    })),

  removeChoice: (id, choiceId) =>
    set((state) => ({
      questions: state.questions.map((q) => {
        if (q.id === id) {
          const updatedChoices = q.choices.filter((c) => c.id !== choiceId);
          return {
            ...q,
            choices:
              updatedChoices.length === 0
                ? [{ id: 1, textInput: "", qualifier: "Qualify" }]
                : updatedChoices,
          };
        }
        return q;
      }),
    })),

  updateChoice: (id, choiceId, key, value) =>
    set((state) => ({
      questions: state.questions.map((q) =>
        q.id === id
          ? {
            ...q,
            choices: q.choices.map((c) =>
              c.id === choiceId
                ? {
                  ...c,
                  [key]:
                    key === "qualifier" &&
                      (value === "Qualify" || value === "Disqualify")
                      ? value
                      : c[key],
                }
                : c
            ),
          }
          : q
      ),
    })),

  toggleRandomizeChoices: (id) =>
    set((state) => ({
      questions: state.questions.map((q) =>
        q.id === id ? { ...q, randomizeChoices: !q.randomizeChoices } : q
      ),
    })),

  toggleShowOtherOption: (id) =>
    set((state) => ({
      questions: state.questions.map((q) =>
        q.id === id ? { ...q, showOtherOption: !q.showOtherOption } : q
      ),
    })),

  /** ✅ Métodos para manejo de imágenes múltiples */
  addUploadedImage: (id, newImage) =>
    set((state) => ({
      questions: state.questions.map((q) =>
        q.id === id && q.choiceType === "multipleImages"
          ? { 
              ...q, 
              uploadedImages: [
                ...q.uploadedImages,
                {
                  ...newImage,
                  time: 0,
                  error: false
                }
              ],
              uploadedImage: null  // Aseguramos que no se use uploadedImage en multipleImages
            }
          : q
      ),
    })),

  removeUploadedImage: (id, fileName) =>
    set((state) => ({
      questions: state.questions.map((q) =>
        q.id === id && q.choiceType === "multipleImages"
          ? {
              ...q,
              uploadedImages: q.uploadedImages.filter(
                (img) => img.fileName !== fileName
              ),
            }
          : q
      ),
    })),

  updateMultipleImageReference: (id, updatedImages: UploadedImage[]) =>
    set((state) => ({
      questions: state.questions.map((q) =>
        q.id === id && q.choiceType === "multipleImages"
          ? {
              ...q,
              uploadedImages: [
                ...q.uploadedImages.filter(img => !updatedImages.find(updated => updated.fileName === img.fileName)),
                ...updatedImages.map(image => ({
                  ...image,
                  file: undefined,
                  time: image.time || 0
                }))
              ],
              uploadedImage: null  // Aseguramos que no se use uploadedImage en multipleImages
            }
          : q
      ),
    })),

  /** ✅ Actualiza la imagen única de una pregunta */
  updateUploadedImage: (id: number, image: any) =>
    set((state) => ({
      questions: state.questions.map((q) =>
        q.id === id ? { ...q, uploadedImage: image } : q
      ),
    })),

  updateImageTime: (id, fileName, timeChange) =>
    set((state) => ({
      questions: state.questions.map((q) =>
        q.id === id && q.choiceType === "multipleImages"
          ? {
              ...q,
              uploadedImages: q.uploadedImages.map((img) =>
                img.fileName === fileName 
                  ? { 
                      ...img, 
                      time: Math.max(0, (img.time || 0) + timeChange)
                    }
                  : img
              ),
            }
          : q
      ),
    })),

  /** ✅ Actualiza los datos de una imagen en `uploadedImages` */
  updateUploadedImageData: (id: number, updatedImage: Partial<UploadedImage>) =>
    set((state) => ({
      questions: state.questions.map((q) =>
        q.id === id && q.choiceType === "multipleImages"
          ? {
            ...q,
            uploadedImages: q.uploadedImages.map((img) =>
              img.id === updatedImage.id
                ? { ...img, ...updatedImage } // ✅ Extiende el objeto existente con las nuevas propiedades
                : img
            ),
          }
          : q
      ),
    })),

  /** ✅ Obtener archivos pendientes de subir */
  getFilesToUpload: () => {
    const state = get();
    const filesToUpload: { id: number; file: File; isMultiple: boolean }[] = [];

    state.questions.forEach((q) => {
      if (q.choiceType === "multipleImages") {
        // Para preguntas con múltiples imágenes, recolectamos todas las imágenes pendientes
        const pendingUploads = (q as MultipleImagesQuestion).uploadedImages
          .filter(img => img.file && !img.url) // Solo las que tienen archivo pero no URL de S3
          .map(img => ({
            id: q.id,
            file: img.file!,
            isMultiple: true
          }));
        filesToUpload.push(...pendingUploads);
      } else {
        // Para preguntas con imagen única
        const question = q as SingleImageQuestion;
        if (question.uploadedFile && (!question.uploadedImage?.url)) {
          filesToUpload.push({
            id: q.id,
            file: question.uploadedFile,
            isMultiple: false
          });
        }
      }
    });

    return filesToUpload;
  },
}));
