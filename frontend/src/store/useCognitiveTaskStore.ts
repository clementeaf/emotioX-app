import { create } from "zustand";

export interface Choice {
  id: number;
  textInput: string;
  qualifier: "Qualify" | "Disqualify";
}

export interface UploadedImage {
  fileName: string;
  fileSizeMB: number;
  error: boolean;
  time: number;
}

export interface Question {
  id: number;
  question: string;
  isVisible: boolean;
  required: boolean;
  placeholder: string;
  fileUploadLabel?: string;
  deviceFrameOptions?: string[];
  selectedFrame?: string;
  uploadedFile?: File | null;
  uploadedImages?: UploadedImage[];
  inputText?: string;
  selectedOption?: string;

  showConditionality: boolean;
  choiceType: "singleChoice" | "multipleChoice" | "linearScale" | "multipleImages";
  choices: Choice[];
  randomizeChoices: boolean;
  showOtherOption: boolean;
}

export interface CognitiveTaskStore {
  required: boolean;
  setRequired: (value: boolean) => void;

  questions: Question[];
  toggleVisibility: (id: number) => void;
  setQuestionRequired: (id: number, value: boolean) => void;
  updateQuestionText: (id: number, text: string) => void;
  updateUploadedFile: (id: number, file: File | null) => void;
  updateSelectedOption: (id: number, option: string) => void;
  updateSelectedFrame: (id: number, frame: string) => void;

  toggleConditionality: (id: number) => void;
  setChoiceType: (id: number, type: "singleChoice" | "multipleChoice" | "linearScale" | "multipleImages") => void;
  addChoice: (id: number) => void;
  removeChoice: (id: number, choiceId: number) => void;
  updateChoice: (id: number, choiceId: number, key: keyof Choice, value: string) => void;
  toggleRandomizeChoices: (id: number) => void;
  toggleShowOtherOption: (id: number) => void;

  addUploadedImage: (id: number, newImage: UploadedImage) => void;
  removeUploadedImage: (id: number, fileName: string) => void;
  updateImageTime: (id: number, fileName: string, time: number) => void;
}

export const useCognitiveTaskStore = create<CognitiveTaskStore>((set) => ({
  required: true,

  questions: [
    // 2 Single Choice
    {
      id: 1,
      question: "6.1.- Single Choice Question 1",
      isVisible: true,
      required: false,
      placeholder: "Choose an option...",
      fileUploadLabel: "Click to Upload",
      deviceFrameOptions: ["No Frame", "Device Frame"],
      selectedFrame: "No Frame",
      inputText: "",
      selectedOption: "Single choice",
      uploadedFile: null,
      showConditionality: false,
      choiceType: "singleChoice",
      choices: [
        { id: 1, textInput: "Option A", qualifier: "Qualify" },
        { id: 2, textInput: "Option B", qualifier: "Disqualify" },
      ],
      randomizeChoices: false,
      showOtherOption: false,
    },
    // {
    //   id: 2,
    //   question: "6.2.- Single Choice Question 2",
    //   isVisible: true,
    //   required: true,
    //   placeholder: "Choose an option...",
    //   fileUploadLabel: "Click to Upload",
    //   deviceFrameOptions: ["No Frame", "Device Frame"],
    //   selectedFrame: "Device Frame",
    //   inputText: "",
    //   selectedOption: "Single choice",
    //   uploadedFile: null,
    //   showConditionality: false,
    //   choiceType: "singleChoice",
    //   choices: [
    //     { id: 1, textInput: "Option 1", qualifier: "Qualify" },
    //     { id: 2, textInput: "Option 2", qualifier: "Disqualify" },
    //   ],
    //   randomizeChoices: false,
    //   showOtherOption: false,
    // },

    // // 2 Multiple Choice
    // {
    //   id: 3,
    //   question: "6.3.- Multiple Choice Question 1",
    //   isVisible: true,
    //   required: false,
    //   placeholder: "Choose multiple options...",
    //   fileUploadLabel: "Click to Upload",
    //   deviceFrameOptions: ["No Frame", "Device Frame"],
    //   selectedFrame: "No Frame",
    //   inputText: "",
    //   selectedOption: "Multiple choice",
    //   uploadedFile: null,
    //   showConditionality: true,
    //   choiceType: "multipleChoice",
    //   choices: [
    //     { id: 1, textInput: "Option A", qualifier: "Qualify" },
    //     { id: 2, textInput: "Option B", qualifier: "Disqualify" },
    //     { id: 3, textInput: "Option C", qualifier: "Qualify" },
    //   ],
    //   randomizeChoices: true,
    //   showOtherOption: true,
    // },
    // {
    //   id: 4,
    //   question: "6.4.- Multiple Choice Question 2",
    //   isVisible: true,
    //   required: true,
    //   placeholder: "Choose multiple options...",
    //   fileUploadLabel: "Click to Upload",
    //   deviceFrameOptions: ["No Frame", "Device Frame"],
    //   selectedFrame: "No Frame",
    //   inputText: "",
    //   selectedOption: "Multiple choice",
    //   uploadedFile: null,
    //   showConditionality: false,
    //   choiceType: "multipleChoice",
    //   choices: [
    //     { id: 1, textInput: "Option X", qualifier: "Qualify" },
    //     { id: 2, textInput: "Option Y", qualifier: "Disqualify" },
    //     { id: 3, textInput: "Option Z", qualifier: "Qualify" },
    //   ],
    //   randomizeChoices: false,
    //   showOtherOption: true,
    // },

    // // 1 Linear Scale
    // {
    //   id: 5,
    //   question: "6.5.- Linear Scale Question",
    //   isVisible: true,
    //   required: true,
    //   placeholder: "Define the scale...",
    //   fileUploadLabel: "Click to Upload",
    //   deviceFrameOptions: ["No Frame", "Device Frame"],
    //   selectedFrame: "No Frame",
    //   inputText: "",
    //   selectedOption: "Linear scale",
    //   uploadedFile: null,
    //   showConditionality: false,
    //   choiceType: "linearScale",
    //   choices: [], // No aplica para linear scale
    //   randomizeChoices: false,
    //   showOtherOption: false,
    // },

    // // 1 Multiple Choice without Image
    // {
    //   id: 6,
    //   question: "6.6.- Multiple Choice Without Image",
    //   isVisible: true,
    //   required: false,
    //   placeholder: "Choose multiple options...",
    //   inputText: "",
    //   selectedOption: "Multiple choice",
    //   showConditionality: false,
    //   choiceType: "multipleChoice",
    //   choices: [
    //     { id: 1, textInput: "Option A", qualifier: "Qualify" },
    //     { id: 2, textInput: "Option B", qualifier: "Disqualify" },
    //   ],
    //   randomizeChoices: false,
    //   showOtherOption: false,
    // },

    // // 1 Multiple Images
    // {
    //   id: 7,
    //   question: "What is your preferred testing setup?",
    //   isVisible: true,
    //   required: true,
    //   placeholder: "",
    //   fileUploadLabel: "Upload Images",
    //   deviceFrameOptions: ["No Frame", "Device Frame", "Custom Frame"],
    //   selectedFrame: "No Frame",
    //   uploadedImages: [
    //     {
    //       fileName: "test-image-1.jpg",
    //       fileSizeMB: 1.2,
    //       error: false,
    //       time: 5,
    //     },
    //     {
    //       fileName: "test-image-2.jpg",
    //       fileSizeMB: 2.5,
    //       error: false,
    //       time: 10,
    //     },
    //   ],
    //   inputText: "",
    //   selectedOption: "",
    //   showConditionality: false,
    //   choiceType: "multipleImages",
    //   choices: [],
    //   randomizeChoices: false,
    //   showOtherOption: false,
    // },
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

  updateUploadedFile: (id, file) =>
    set((state) => ({
      questions: state.questions.map((q) =>
        q.id === id ? { ...q, uploadedFile: file } : q
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
        if (q.id === id) {
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
          return { ...q, choiceType: type, choices: updatedChoices };
        }
        return q;
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

  addUploadedImage: (id, newImage) =>
    set((state) => ({
      questions: state.questions.map((q) =>
        q.id === id && q.choiceType === "multipleImages"
          ? {
            ...q,
            uploadedImages: q.uploadedImages
              ? [...q.uploadedImages, newImage]
              : [newImage],
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
            uploadedImages: q.uploadedImages?.filter(
              (img) => img.fileName !== fileName
            ),
          }
          : q
      ),
    })),

  updateImageTime: (id, fileName, time) =>
    set((state) => ({
      questions: state.questions.map((q) =>
        q.id === id && q.choiceType === "multipleImages"
          ? {
            ...q,
            uploadedImages: q.uploadedImages?.map((img) =>
              img.fileName === fileName ? { ...img, time } : img
            ),
          }
          : q
      ),
    })),
}));
