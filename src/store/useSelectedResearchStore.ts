// useSelectedResearchStore.ts
import { create } from 'zustand';

type SelectedResearchState = {
  researchType: 'AIMFramework' | 'BehaviouralResearch'; // Define los tipos específicos en lugar de string
  customFormat: boolean;
  stageIndex: number; // Índice de la etapa seleccionada
  setResearchType: (type: 'AIMFramework' | 'BehaviouralResearch') => void;
  setCustomFormat: (format: boolean) => void;
  setStageIndex: (index: number) => void;
};

export const useSelectedResearchStore = create<SelectedResearchState>((set) => ({
  researchType: 'AIMFramework', // Tipo de investigación por defecto
  customFormat: false,
  stageIndex: 0, // Índice inicial

  setResearchType: (type) => set({ researchType: type }),
  setCustomFormat: (format) => set({ customFormat: format }),
  setStageIndex: (index) => set({ stageIndex: index }), // Función para actualizar el índice de la etapa
}));
