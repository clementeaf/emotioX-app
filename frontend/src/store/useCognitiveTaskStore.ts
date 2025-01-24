import { create } from "zustand";

export interface Choice {
  id: number;
  textInput: string;
  qualifier: "qualify" | "disqualify";
}

export interface Question {
  id: number;
  question: string;
  isVisible: boolean;
  required: boolean;
  placeholder: string;
  fileUploadLabel: string;
  deviceFrameOptions: string[];
  selectedFrame: string;
  uploadedFile?: File | null;
  inputText?: string;
  selectedOption?: string;

  showConditionality: boolean;
  choiceType: "singleChoice" | "multipleChoice" | "linearScale";
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

  // Métodos adicionales
  toggleConditionality: (id: number) => void;
  setChoiceType: (id: number, type: "singleChoice" | "multipleChoice" | "linearScale") => void;
  addChoice: (id: number) => void;
  removeChoice: (id: number, choiceId: number) => void;
  updateChoice: (id: number, choiceId: number, key: keyof Choice, value: string) => void;
  toggleRandomizeChoices: (id: number) => void;
  toggleShowOtherOption: (id: number) => void;
}

export const useCognitiveTaskStore = create<CognitiveTaskStore>((set) => ({
  required: true,

  questions: [
    {
      id: 1,
      question: "6.1.- Question _italic_ **bold** - bullet list 1. ordered list",
      isVisible: true,
      required: false,
      placeholder: "Ask something...",
      fileUploadLabel: "Click to Upload",
      deviceFrameOptions: ["No Frame", "Device Frame"],
      selectedFrame: "No Frame",
      inputText: "",
      selectedOption: "Single choice",
      uploadedFile: null,

      showConditionality: false,
      choiceType: "singleChoice",
      choices: [
        { id: 1, textInput: "Option 1", qualifier: "qualify" },
        { id: 2, textInput: "Option 2", qualifier: "disqualify" },
      ],
      randomizeChoices: false,
      showOtherOption: false,
    },
    {
      id: 2,
      question: "6.2.- Question _italic_ **bold** - bullet list 1. ordered list",
      isVisible: true,
      required: false,
      placeholder: "Ask something...",
      fileUploadLabel: "Click to Upload",
      deviceFrameOptions: ["No Frame", "Device Frame"],
      selectedFrame: "No Frame",
      inputText: "",
      selectedOption: "Single choice",
      uploadedFile: null,

      showConditionality: false,
      choiceType: "singleChoice",
      choices: [
        { id: 1, textInput: "Option 1", qualifier: "qualify" },
        { id: 2, textInput: "Option 2", qualifier: "disqualify" },
      ],
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
        q.id === id ? { ...q, isVisible: !q.isVisible } : q
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
          const updatedChoices: Choice[] =
            type === "singleChoice"
              ? [{ id: 1, textInput: "", qualifier: "qualify" }]
              : type === "multipleChoice"
              ? Array.from({ length: 3 }, (_, index) => ({
                  id: index + 1,
                  textInput: `Option ${index + 1}`,
                  qualifier: "qualify",
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
            qualifier: "qualify",
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
                ? [{ id: 1, textInput: "", qualifier: "qualify" }]
                : updatedChoices,
          };
        }
        return q;
      }),
    })),

  updateChoice: (id, choiceId, key, value) =>
    set((state) => ({
      questions: state.questions.map((q) => {
        if (q.id === id) {
          const updatedChoices = q.choices.map((c) =>
            c.id === choiceId ? { ...c, [key]: value } : c
          );
          return { ...q, choices: updatedChoices };
        }
        return q;
      }),
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
}));

