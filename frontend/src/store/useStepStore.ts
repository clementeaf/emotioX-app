// store/useStepStore.ts
import { create } from 'zustand';

interface StepStore {
  step: number;
  setStep: (step: number) => void;
}

export const useStepStore = create<StepStore>((set) => ({
  step: 0, // Etapa inicial
  setStep: (step) => set({ step }),
}));
