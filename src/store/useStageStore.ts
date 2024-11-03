// stageStore.ts
import { create } from 'zustand';

interface StageStore {
  selectedStage: number;
  setSelectedStage: (stageId: number) => void;
}

export const useStageStore = create<StageStore>((set) => ({
  selectedStage: 1, // "Smart VOC" seleccionado por defecto
  setSelectedStage: (stageId: number) => set({ selectedStage: stageId }),
}));
