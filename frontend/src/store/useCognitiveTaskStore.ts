import { create } from "zustand";
import { UploadedImage } from "../types/types";

export interface Choice {
  id: number;
  textInput: string;
  qualifier: "Qualify" | "Disqualify";
}

export interface Question {
  id: number;
  question: string;
  isVisible: boolean;
  required: boolean;
  placeholder: string;
  inputText: string;
  selectedOption: string;
  showConditionality: boolean;
  choiceType: "singleChoice" | "multipleChoice" | "linearScale" | "multipleImages";
  choices: Choice[];
  randomizeChoices: boolean;
  showOtherOption: boolean;
  images: UploadedImage[];
  deviceFrameOptions?: string[];
  selectedFrame?: string;
  fileUploadLabel?: string;
}

export interface CognitiveTaskStore {
  required: boolean;
  questions: Question[];
  isUploading: boolean;
  setRequired: (value: boolean) => void;
  toggleVisibility: (id: number) => void;
  setQuestionRequired: (id: number, value: boolean) => void;
  updateQuestionText: (id: number, text: string) => void;
  updateImageFile: (id: number, file: File, isMultiple: boolean) => void;
  updateUploadedImage: (id: number, image: UploadedImage) => void;
  removeImage: (id: number, fileName: string) => void;
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
  getFilesToUpload: () => { id: number; file: File; isMultiple: boolean }[];
  addQuestion: () => void;
  setIsUploading: (status: boolean) => void;
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
      showConditionality: false,
      choiceType: "singleChoice" as const,
      choices: [
        { id: 1, textInput: "Option A", qualifier: "Qualify" as const },
        { id: 2, textInput: "Option B", qualifier: "Disqualify" as const },
      ],
      randomizeChoices: false,
      showOtherOption: false,
      images: [] as UploadedImage[]
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
      showConditionality: false,
      choiceType: "singleChoice" as const,
      choices: [
        { id: 1, textInput: "Option 1", qualifier: "Qualify" as const },
        { id: 2, textInput: "Option 2", qualifier: "Disqualify" as const },
      ],
      randomizeChoices: false,
      showOtherOption: false,
      images: [] as UploadedImage[]
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
      showConditionality: true,
      choiceType: "multipleChoice" as const,
      choices: [
        { id: 1, textInput: "Option A", qualifier: "Qualify" as const },
        { id: 2, textInput: "Option B", qualifier: "Disqualify" as const },
        { id: 3, textInput: "Option C", qualifier: "Qualify" as const },
      ],
      randomizeChoices: true,
      showOtherOption: true,
      images: [] as UploadedImage[]
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
      showConditionality: false,
      choiceType: "multipleChoice" as const,
      choices: [
        { id: 1, textInput: "Option X", qualifier: "Qualify" as const },
        { id: 2, textInput: "Option Y", qualifier: "Disqualify" as const },
        { id: 3, textInput: "Option Z", qualifier: "Qualify" as const },
      ],
      randomizeChoices: false,
      showOtherOption: true,
      images: [] as UploadedImage[]
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
      showConditionality: false,
      choiceType: "linearScale" as const,
      choices: [], // No aplica para linear scale
      randomizeChoices: false,
      showOtherOption: false,
      images: [] as UploadedImage[]
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
      choiceType: "multipleChoice" as const,
      choices: [
        { id: 1, textInput: "Option A", qualifier: "Qualify" as const },
        { id: 2, textInput: "Option B", qualifier: "Disqualify" as const },
      ],
      randomizeChoices: false,
      showOtherOption: false,
      images: [] as UploadedImage[]
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
      inputText: "",
      selectedOption: "",
      showConditionality: false,
      choiceType: "multipleImages" as const,
      choices: [],
      randomizeChoices: false,
      showOtherOption: false,
      images: [] as UploadedImage[]
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
      inputText: "",
      selectedOption: "",
      showConditionality: false,
      choiceType: "multipleImages" as const,
      choices: [],
      randomizeChoices: false,
      showOtherOption: false,
      images: [] as UploadedImage[]
    },
  ],
  isUploading: false,

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

  updateImageFile: (id, file, isMultiple) => {
    console.log("🔍 updateImageFile - Entrada:", { id, fileName: file.name, isMultiple });
    set((state) => {
      const newState = {
        questions: state.questions.map((q) =>
          q.id === id
            ? {
                ...q,
                images: isMultiple
                  ? [...q.images, {
                      fileName: file.name,
                      format: file.type,
                      size: file.size,
                      tempFile: file,
                      error: false,
                      uploadedAt: new Date()
                    }]
                  : [{
                      fileName: file.name,
                      format: file.type,
                      size: file.size,
                      tempFile: file,
                      error: false,
                      uploadedAt: new Date()
                    }]
              }
            : q
        ),
      };
      console.log("🔍 updateImageFile - Estado actualizado:", 
        newState.questions.find(q => q.id === id)?.images
      );
      return newState;
    });
  },

  updateUploadedImage: (id, image) => {
    console.log("🔍 updateUploadedImage - Entrada:", { id, image });
    set((state) => {
      const question = state.questions.find(q => q.id === id);
      if (!question) {
        console.log("❌ Question not found:", id);
        return state;
      }

      console.log("🔍 Current question state:", {
        id: question.id,
        choiceType: question.choiceType,
        currentImages: question.images
      });

      const newState = {
        questions: state.questions.map((q) =>
          q.id === id
            ? {
                ...q,
                images: q.choiceType === "multipleImages"
                  ? q.images.map(img => 
                      img.fileName === image.fileName 
                        ? { ...image, tempFile: undefined }
                        : img
                    )
                  : [{ ...image, tempFile: undefined }]
              }
            : q
        ),
      };

      const updatedQuestion = newState.questions.find(q => q.id === id);
      console.log("🔍 Updated question state:", {
        id: updatedQuestion?.id,
        choiceType: updatedQuestion?.choiceType,
        updatedImages: updatedQuestion?.images
      });

      return newState;
    });
  },

  removeImage: (id, fileName) =>
    set((state) => ({
      questions: state.questions.map((q) =>
        q.id === id
          ? {
              ...q,
              images: q.images.filter((img) => img.fileName !== fileName)
            }
          : q
      ),
    })),

  updateImageTime: (id, fileName, time) =>
    set((state) => ({
      questions: state.questions.map((q) =>
        q.id === id
          ? {
              ...q,
              images: q.images.map((img) =>
                img.fileName === fileName
                  ? { ...img, time: Math.max(0, time) }
                  : img
              )
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
            ? [{ id: 1, textInput: "", qualifier: "Qualify" as const }]
            : type === "multipleChoice"
              ? Array.from({ length: 3 }, (_, index) => ({
                id: index + 1,
                textInput: `Option ${index + 1}`,
                qualifier: "Qualify" as const,
              }))
              : [];

        const baseQuestion: Question = {
          ...q,
          choiceType: type,
          choices: updatedChoices,
          images: type === "multipleImages" ? q.images : q.images.slice(0, 1),
          question: q.question,
          isVisible: q.isVisible,
          required: q.required,
          placeholder: q.placeholder,
          fileUploadLabel: q.fileUploadLabel || "",
          deviceFrameOptions: q.deviceFrameOptions || [],
          selectedFrame: q.selectedFrame || "No Frame",
          inputText: q.inputText,
          selectedOption: q.selectedOption,
          showConditionality: q.showConditionality,
          randomizeChoices: q.randomizeChoices,
          showOtherOption: q.showOtherOption
        };

        return baseQuestion;
      }),
    })),

  addChoice: (id) =>
    set((state) => ({
      questions: state.questions.map((q) => {
        if (q.id === id && q.choiceType === "multipleChoice") {
          const newChoice: Choice = {
            id: q.choices.length + 1,
            textInput: "",
            qualifier: "Qualify" as const,
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
                ? [{ id: 1, textInput: "", qualifier: "Qualify" as const }]
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

  getFilesToUpload: () => {
    const state = get();
    return state.questions
      .flatMap(q => 
        q.images
          .filter(img => img && img.tempFile instanceof File)
          .map(img => ({
            id: q.id,
            file: img.tempFile as File,
            isMultiple: q.choiceType === "multipleImages"
          }))
      );
  },

  addQuestion: () =>
    set((state) => ({
      questions: [
        ...state.questions,
        {
          id: Date.now(),
          question: "",
          isVisible: true,
          required: false,
          placeholder: "",
          inputText: "",
          selectedOption: "",
          showConditionality: false,
          choiceType: "singleChoice",
          choices: [{ id: 1, textInput: "", qualifier: "Qualify" }],
          randomizeChoices: false,
          showOtherOption: false,
          images: []
        }
      ],
    })),

  setIsUploading: (status: boolean) => set({ isUploading: status }),
}));
