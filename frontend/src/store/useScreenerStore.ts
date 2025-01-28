import { create } from "zustand";
import { nanoid } from "nanoid";

export interface SorteableQuestion {
  id: string;
  option1: string;
  placeholder?: string;
  selection: string;
}

export interface ScreenerStore {
  screenerView: boolean | {};
  titleRequired: boolean; 
  questionText: string | null;
  questionType: string | null;
  isRequired: boolean;
  options: SorteableQuestion[];

  setTitleRequired: (required: boolean) => void;
  setScreenerView: (view: boolean | {}) => void;
  setQuestionText: (text: string | null) => void;
  setQuestionType: (type: string | null) => void;
  setIsRequired: (required: boolean) => void;

  addOption: () => void;
  updateOption: (id: string, updatedData: Partial<SorteableQuestion>) => void;
  deleteOption: (id: string) => void;
  resetOptions: () => void;

  resetToDefaultSorteableQuestions: () => void;
  getPreparedData: () => { questionText: string; questionType: string; options: SorteableQuestion[] } | null;

  getStringsAndSelection: () => {
    questionText: string | null;
    options: { option1: string; selection: string }[];
  };
}

export const useScreenerStore = create<ScreenerStore>((set, get) => ({
  screenerView: {},
  titleRequired: false,
  questionText: null,
  questionType: "Single choice",
  isRequired: false,
  options: [
    {
      id: nanoid(),
      option1: "",
      placeholder: "Option 1",
      selection: "Qualify",
    },
  ],

  getStringsAndSelection: () => {
    const { questionText, options } = get();
    return {
      questionText,
      options: options.map(({ option1, selection }) => ({
        option1,
        selection,
      })),
    };
  },
  

  setScreenerView: (view) => set(() => ({ screenerView: view })),
  setTitleRequired: (required) =>
    set(() => {
      if (!required) {
        return {
          titleRequired: false,
          screenerView: {},
          questionText: null,
          questionType: "Single choice",
          isRequired: false,
          options: [
            {
              id: nanoid(),
              option1: "",
              placeholder: "Option 1",
              selection: "Qualify",
            },
          ],
        };
      }
      return { titleRequired: true };
    }),
  setQuestionText: (text) =>
    set(() => ({
      questionText: get().isRequired && get().titleRequired ? text : null,
    })),
  setQuestionType: (type) =>
    set(() => {
      const options =
        type === "Multiple choice"
          ? Array.from({ length: 3 }, (_, i) => ({
              id: nanoid(),
              option1: "",
              placeholder: `Option ${i + 1}`,
              selection: "Qualify",
            }))
          : [
              {
                id: nanoid(),
                option1: "",
                placeholder: "Option 1",
                selection: "Qualify",
              },
            ];

      return {
        questionType: get().isRequired && get().titleRequired ? type : null,
        options,
      };
    }),
  setIsRequired: (required) =>
    set(() => ({
      isRequired: required,
      questionText: required && get().titleRequired ? get().questionText : null,
      questionType: required && get().titleRequired ? get().questionType : "Single choice",
      options: required && get().titleRequired
        ? get().options
        : [
            {
              id: nanoid(),
              option1: "",
              placeholder: "Option 1",
              selection: "Qualify",
            },
          ],
    })),
  addOption: () =>
    set((state) => ({
      options: [
        ...state.options,
        { id: nanoid(), option1: "", placeholder: `Option ${state.options.length + 1}`, selection: "Qualify" },
      ],
    })),
  updateOption: (id, updatedData) =>
    set((state) => ({
      options: state.options.map((option) =>
        option.id === id ? { ...option, ...updatedData } : option
      ),
    })),
  deleteOption: (id) =>
    set((state) => {
      const updatedOptions = state.options.filter((option) => option.id !== id);
      const isSingleChoice = updatedOptions.length === 1;
      return {
        options: updatedOptions,
        questionType: isSingleChoice ? "Single choice" : state.questionType,
      };
    }),
  resetOptions: () =>
    set(() => ({
      options: [
        {
          id: nanoid(),
          option1: "",
          placeholder: "Option 1",
          selection: "Qualify",
        },
      ],
    })),
  resetToDefaultSorteableQuestions: () =>
    set(() => ({
      options: Array.from({ length: 3 }, (_, i) => ({
        id: nanoid(),
        option1: "",
        placeholder: `Option ${i + 1}`,
        selection: "Qualify",
      })),
    })),
  getPreparedData: () => {
    const { screenerView, titleRequired, isRequired, questionText, questionType, options } = get();

    if (screenerView && titleRequired && isRequired) {
      const sanitizedOptions = options.map(({ id, option1, selection }) => ({
        id,
        option1,
        selection,
      }));

      return {
        questionText: questionText!,
        questionType: questionType!,
        options: sanitizedOptions,
      };
    }
    return null;
  },
}));
