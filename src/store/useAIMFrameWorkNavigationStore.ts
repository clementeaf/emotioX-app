import { create } from 'zustand';

interface NavigationState {
  selectedScreen: number;
  setSelectedScreen: (screen: number) => void;
}

export const useAIMFrameWorkNavigationStore = create<NavigationState>((set) => ({
  selectedScreen: 0,
  setSelectedScreen: (screen) => set({ selectedScreen: screen }),
}));
