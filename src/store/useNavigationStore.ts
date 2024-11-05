import { create } from 'zustand';

interface NavigationState {
  selectedScreen: number;
  frameworkType: 'BehaviouralResearch' | 'AIMFramework';
  setSelectedScreen: (screen: number) => void;
  setFrameworkType: (type: 'BehaviouralResearch' | 'AIMFramework') => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
  selectedScreen: 0, // Default to "Build"
  frameworkType: 'BehaviouralResearch', // Default framework type
  setSelectedScreen: (screen) => set({ selectedScreen: screen }),
  setFrameworkType: (type) => set({ frameworkType: type }),
}));
