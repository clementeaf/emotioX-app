import { create } from 'zustand';

type Task = {
  id: string;
  label: string;
  isHighlighted: boolean;
};

type BehaviouralResearchState = {
  tasks: Task[];
  setHighlightedTask: (id: string) => void;
};

export const useBehaviouralResearchStore = create<BehaviouralResearchState>((set) => ({
  tasks: [
    { id: '1', label: 'Image 001', isHighlighted: true },
    { id: '2', label: 'Image 002', isHighlighted: false },
    { id: '3', label: 'Image 003', isHighlighted: false },
    { id: '4', label: 'Image 004', isHighlighted: false },
  ],
  setHighlightedTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, isHighlighted: !task.isHighlighted } : { ...task, isHighlighted: false }
      ),
    })),
}));
