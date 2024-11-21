import { create } from 'zustand';
import { PublicStudyStepperStore } from '../types/types';

export const usePublicStudyStepperStore = create<PublicStudyStepperStore>((set) => ({
  activeStep: 0,
  setActiveStep: (step: number) => set({ activeStep: step }),
  nextStep: () => set((state) => ({ activeStep: state.activeStep + 1 })),
}));
