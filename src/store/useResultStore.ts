// store/resultsStore.ts
import { create } from 'zustand';

type FrameworkType = 'BehaviouralResearch' | 'AIMFramework' | string;

export interface Section {
  label: string;
  id: string;
}

export interface ResultsStore {
  frameworkType: FrameworkType;
  selectedSection: string;
  sections: Section[];
  setFrameworkType: (type: FrameworkType) => void;
  setSections: (sections: Section[]) => void;
  setSelectedSection: (section: string) => void;
}

export const useResultsStore = create<ResultsStore>((set) => {
  // Define la configuración inicial basada en el frameworkType por defecto
  const initialFrameworkType: FrameworkType = 'AIMFramework';
  const initialSections: Section[] = initialFrameworkType === 'BehaviouralResearch'
    ? [
        { label: 'Data Summary', id: 'data_summary' },
        { label: 'Emotion Mapping', id: 'emotion_mapping' },
      ]
    : [
        { label: 'Smart VOC', id: 'smart_voc' },
        { label: 'Cognitive Task', id: 'cognitive_task' },
      ];

  return {
    frameworkType: initialFrameworkType,
    selectedSection: 'Smart VOC',
    sections: initialSections, // Inicializa sections basado en el frameworkType

    setFrameworkType: (type) =>
      set({
        frameworkType: type,
        selectedSection: '',
        sections: type === 'BehaviouralResearch'
          ? [
              { label: 'Data Summary', id: 'data_summary' },
              { label: 'Emotion Mapping', id: 'emotion_mapping' },
            ]
          : [
              { label: 'Smart VOC', id: 'smart_voc' },
              { label: 'Cognitive Task', id: 'cognitive_task' },
            ],
      }),

    setSections: (sections) => set({ sections }),

    setSelectedSection: (section) => 
      set((state) => state.selectedSection !== section ? { selectedSection: section } : state),
  };
});
