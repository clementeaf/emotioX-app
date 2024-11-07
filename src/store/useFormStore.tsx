import { create } from "zustand";

interface FormState {
  responses: { [key: string]: string | string[] | number };
  setResponse: (id: string, value: string | string[] | number) => void;
}

export const useFormStore = create<FormState>((set) => ({
  responses: {},
  setResponse: (id, value) =>
    set((state) => ({
      responses: {
        ...state.responses,
        [id]: value,
      },
    })),
}));
