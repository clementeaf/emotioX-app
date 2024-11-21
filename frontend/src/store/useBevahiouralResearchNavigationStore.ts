import { create } from 'zustand';

interface NavigationState {
  selectedScreen: number;
  setSelectedScreen: (screen: number) => void;
}

export const useBevahiouralResearchNavigationStore = create<NavigationState>((set) => ({
  selectedScreen: 0,
  setSelectedScreen: (screen) => set({ selectedScreen: screen }),
}));
