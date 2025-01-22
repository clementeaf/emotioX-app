import { create } from "zustand";
import { nanoid } from "nanoid";

// Interfaces
export interface Question {
  questionText: string;
  questionType: string;
  required: boolean;
  isRequired: boolean; // Estado para manejar "requerido" por pregunta
}

export interface SorteableQuestion {
  id: string;
  option1: string;
  placeholder?: string; // Para manejar valores predeterminados
  selection: string[]; // ["Qualify", "Disqualify"]
  required: boolean;
}

// Interfaz para Zustand Store
export interface ScreenerStore {
  screenerRequired: boolean; // Estado para el toggle principal (TitleRow)
  setScreenerRequired: (required: boolean) => void; // Método para alternar screenerRequired

  questionRequired: boolean; // Estado del switch de la pregunta
  setQuestionRequired: (required: boolean) => void; // Controlador para el switch de pregunta

  sorteableRequired: boolean; // Estado del switch de opciones sorteables
  setSorteableRequired: (required: boolean) => void; // Controlador para el switch de opciones sorteables

  questions: Question[]; // Lista de preguntas del formulario
  sorteableQuestions: SorteableQuestion[]; // Lista de preguntas sorteables
  showOtherOption: boolean; // Estado para mostrar la opción "Otros"
  randomizeTheOrderOfQuestions: boolean; // Estado para randomizar preguntas sorteables

  // Métodos globales
  setShowOtherOption: (show: boolean) => void; // Cambia el estado "Otros"
  setRandomizeTheOrder: (randomize: boolean) => void; // Cambia el estado de randomización

  // Métodos para preguntas simples
  addQuestion: (question: Partial<Question>) => void; // Agrega una nueva pregunta
  updateQuestion: (index: number, updatedData: Partial<Question>) => void; // Actualiza una pregunta específica
  toggleRequired: (index: number) => void; // Alterna el estado "required" en una pregunta
  toggleQuestionRequired: (index: number) => void; // Alterna el estado `required` de una pregunta
  removeQuestion: (index: number) => void; // Elimina una pregunta por índice

  // Métodos para preguntas sorteables
  addSorteableQuestion: (question?: Partial<SorteableQuestion>) => void; // Agrega una pregunta sorteable
  updateSorteableQuestion: (id: string, updatedData: Partial<SorteableQuestion>) => void; // Actualiza una pregunta sorteable
  removeSorteableQuestion: (id: string) => void; // Elimina una pregunta sorteable
  setSorteableQuestionsOrder: (update: (prev: SorteableQuestion[]) => SorteableQuestion[]) => void; // Reordena preguntas sorteables

  // Resetear preguntas
  resetQuestions: () => void; // Resetea preguntas y opciones al estado inicial
  resetToDefaultSorteableQuestions: () => void; // Restaura las opciones sorteables predeterminadas
}

// Estado inicial para el store
const initialState: Pick<
  ScreenerStore,
  | "screenerRequired"
  | "questionRequired"
  | "sorteableRequired"
  | "questions"
  | "sorteableQuestions"
  | "showOtherOption"
  | "randomizeTheOrderOfQuestions"
> = {
  screenerRequired: false,
  questionRequired: false,
  sorteableRequired: false,
  questions: [
    {
      questionText: "",
      questionType: "Single choice",
      required: false,
      isRequired: true,
    },
  ],
  sorteableQuestions: Array.from({ length: 3 }, (_, i) => ({
    id: nanoid(),
    option1: "",
    placeholder: `Option ${i + 1}`,
    selection: ["Qualify", "Disqualify"],
    required: false,
  })),
  showOtherOption: false,
  randomizeTheOrderOfQuestions: false,
};

const createSorteableQuestion = (
  question: Partial<SorteableQuestion> = {}
): SorteableQuestion => ({
  id: nanoid(),
  option1: question.option1 || "",
  placeholder: question.placeholder || "New Option",
  selection: question.selection || ["Qualify", "Disqualify"],
  required: question.required ?? false,
});

// Función para crear una nueva pregunta
const createQuestion = (data: Partial<Question>): Question => ({
  questionText: data.questionText || "",
  questionType: data.questionType || "Single choice",
  required: data.required ?? false,
  isRequired: data.isRequired ?? true,
});

// Zustand Store
export const useScreenerStore = create<ScreenerStore>((set) => ({
  ...initialState,

  // Controladores independientes para los toggles
  setScreenerRequired: (required: boolean) =>
    set(() => ({ screenerRequired: required })),
  setQuestionRequired: (required: boolean) =>
    set(() => ({ questionRequired: required })),
  setSorteableRequired: (required: boolean) =>
    set(() => ({ sorteableRequired: required })),

  // Métodos globales
  setShowOtherOption: (show) => set(() => ({ showOtherOption: show })),
  setRandomizeTheOrder: (randomize) =>
    set(() => ({ randomizeTheOrderOfQuestions: randomize })),

  // Métodos para preguntas simples
  addQuestion: (question) =>
    set((state) => ({
      questions: [...state.questions, createQuestion(question)],
    })),

  updateQuestion: (index, updatedData) =>
    set((state) => {
      if (index < 0 || index >= state.questions.length) {
        console.error(`Invalid question index: ${index}`);
        return state;
      }
      const updatedQuestions = [...state.questions];
      updatedQuestions[index] = {
        ...updatedQuestions[index],
        ...updatedData,
      };
      return { questions: updatedQuestions };
    }),

  toggleRequired: (index) =>
    set((state) => {
      if (index < 0 || index >= state.questions.length) {
        console.error(`Invalid question index: ${index}`);
        return state;
      }
      const updatedQuestions = [...state.questions];
      updatedQuestions[index].isRequired = !updatedQuestions[index].isRequired;
      return { questions: updatedQuestions };
    }),

  removeQuestion: (index) =>
    set((state) => {
      if (index < 0 || index >= state.questions.length) {
        console.error(`Invalid question index: ${index}`);
        return state;
      }
      return {
        questions: state.questions.filter((_, i) => i !== index),
      };
    }),

  // Métodos para preguntas sorteables
  addSorteableQuestion: (question) =>
    set((state) => ({
      sorteableQuestions: [
        ...state.sorteableQuestions,
        createSorteableQuestion(question),
      ],
    })),

  updateSorteableQuestion: (id, updatedData) =>
    set((state) => ({
      sorteableQuestions: state.sorteableQuestions.map((q) =>
        q.id === id ? { ...q, ...updatedData } : q
      ),
    })),

  removeSorteableQuestion: (id: string) =>
    set((state) => {
      if (state.sorteableQuestions.length <= 1) {
        console.warn("Cannot remove the last remaining question.");
        return state;
      }
      return {
        sorteableQuestions: state.sorteableQuestions.filter((q) => q.id !== id),
      };
    }),

    setSorteableQuestionsOrder: (update) =>
      set((state) => ({
        sorteableQuestions: update(state.sorteableQuestions),
      })),

  resetToDefaultSorteableQuestions: () =>
    set(() => ({
      sorteableQuestions: Array.from({ length: 3 }, (_, i) => ({
        id: nanoid(),
        option1: "",
        placeholder: `Option ${i + 1}`,
        selection: ["Qualify", "Disqualify"],
        required: false,
      })),
    })),

  resetQuestions: () => set(() => initialState),
  toggleQuestionRequired: (index) =>
    set((state) => {
      if (index < 0 || index >= state.questions.length) {
        console.error(`Invalid question index: ${index}`);
        return state;
      }
      const updatedQuestions = [...state.questions];
      updatedQuestions[index].required = !updatedQuestions[index].required;
      return { questions: updatedQuestions };
    }),
}));
