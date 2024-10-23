// src/store/useResearchStore.ts
import { create } from 'zustand';
import { ResearchState } from '../types/types';

export const useResearchStore = create<ResearchState>((set) => ({
  step: 0,
  researchName: '',
  enterpriseName: '',
  selectedResearchType: '',
  selectedResearchModule: '',
  uploadedFiles: [],
  ResearchModule: ['attention-prediction', 'aim-framework', 'behavioural-research'],

  // Función para actualizar el tipo de investigación
  setSelectedResearchType: (type: string) => set({ selectedResearchType: type }),

  // Función para actualizar el módulo según el tipo de investigación
  setResearchModule: (type: string) => {
    let selectedModule = '';

    // Manejando todos los casos posibles
    if (type === 'AIM Framework Stage 3') {
      selectedModule = 'aim-framework';
    } else if (type === "Attention's Prediction") {
      selectedModule = 'attention-prediction';
    } else if (type === 'Biometric, Cognitive and Predictive') {
      selectedModule = 'behavioural-research';
    }

    set({ selectedResearchModule: selectedModule });
  },

  setStep: (step: number) => set({ step }),
  setResearchName: (name: string) => set({ researchName: name }),
  setEnterpriseName: (enterprise: string) => set({ enterpriseName: enterprise }),

  addUploadedFiles: (files: File[]) =>
    set((state) => ({
      uploadedFiles: [...state.uploadedFiles, ...files],
    })),

  removeUploadedFile: (fileName: string) =>
    set((state) => ({
      uploadedFiles: state.uploadedFiles.filter((file) => file.name !== fileName),
    })),

  resetForm: () =>
    set({
      step: 0,
      researchName: '',
      enterpriseName: '',
      selectedResearchType: '',
      selectedResearchModule: '',
      uploadedFiles: [],
    }),
}));
