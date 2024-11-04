// En tu store (useAIMFrameworkStore.ts)
import { create } from 'zustand';
import { arrayMove } from '@dnd-kit/sortable';

type Stage = {
  id: string;
  label: string;
  isSelected: boolean;
};

type AIMFrameworkState = {
  stages: Stage[];
  addStage: (label: string) => void;
  reorderStages: (oldIndex: number, newIndex: number) => void;
};

export const useAIMFrameworkStore = create<AIMFrameworkState>((set) => ({
  stages: [
    { id: '1', label: 'Welcome screen', isSelected: true },
    { id: '2', label: 'Smart VOC', isSelected: false },
    { id: '3', label: 'Cognitive task', isSelected: false },
    { id: '4', label: 'Thank you', isSelected: false },
  ],
  addStage: (label: string) =>
    set((state) => ({
      stages: [...state.stages, { id: String(state.stages.length + 1), label, isSelected: false }],
    })),
  reorderStages: (oldIndex, newIndex) =>
    set((state) => ({
      stages: arrayMove(state.stages, oldIndex, newIndex),
    })),
}));
