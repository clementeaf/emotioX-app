// store/useSelectedResearchStore.ts
import { create } from 'zustand';

type ResearchType = 'BehaviouralResearch' | 'AIMFramework';

interface SelectedResearchStore {
  researchType: ResearchType;
  stageIndex: number;
  setResearchType: (type: ResearchType) => void;
  setStageIndex: (index: number) => void;
}

export const useSelectedResearchStore = create<SelectedResearchStore>((set) => ({
  researchType: 'BehaviouralResearch',
  stageIndex: 0,
  setResearchType: (type) => set({ researchType: type, stageIndex: 0 }),
  setStageIndex: (index) => set({ stageIndex: index }),
}));
