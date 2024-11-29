import { create } from 'zustand';
import { ResearchState, Question } from '../types/types';

export const useResearchStore = create<ResearchState>((set) => ({
  // Estado inicial
  step: 0,
  researchName: '',
  enterpriseName: '',
  selectedResearchType: '',
  selectedResearchModule: '',
  uploadedFiles: [],
  selectedProjects: [],
  ResearchModule: ['attention-prediction', 'aim-framework', 'behavioural-research'],
  questions: [
    {
      questionText: "",
      questionType: "Single choice",
      required: false,
    },
  ], // Almacena preguntas configuradas
  formData: {
    researchName: '',
    enterpriseName: '',
    selectedResearchType: '',
    selectedResearchModule: '',
    uploadedFiles: [],
    selectedProjects: [],
  },

  // Métodos para actualizar el estado
  setStep: (step: number) => set(() => ({ step })),

  setResearchName: (name: string) =>
    set((state) => ({
      researchName: name,
      formData: { ...state.formData, researchName: name },
    })),

  setEnterpriseName: (name: string) =>
    set((state) => ({
      enterpriseName: name,
      formData: { ...state.formData, enterpriseName: name },
    })),

  setSelectedResearchType: (type: string) =>
    set((state) => {
      const moduleMap: Record<string, string> = {
        "AIM Framework Stage 3": 'aim-framework',
        "Attention's Prediction": 'attention-prediction',
        'Biometric, Cognitive and Predictive': 'behavioural-research',
      };

      const selectedModule = moduleMap[type] || '';
      return {
        selectedResearchType: type,
        selectedResearchModule: selectedModule,
        formData: {
          ...state.formData,
          selectedResearchType: type,
          selectedResearchModule: selectedModule,
        },
      };
    }),

  setResearchModule: (moduleId: string) => {
    const researchTypes = [
      {
        id: 'behavioural-research',
        title: 'Biometric, Cognitive and Predictive',
        description:
          'Evaluating one or more sections with biometrics, implicit association, and cognitive tasks. You can also have image and video predictions.',
      },
      {
        id: 'aim-framework',
        title: 'AIM Framework Stage 3',
        description: 'Start with VOC Smart or build an upgrade by your own.',
      },
    ];

    const selectedModule = researchTypes.find((module) => module.id === moduleId);

    if (selectedModule) {
      set((state) => ({
        selectedResearchModule: selectedModule.id,
        formData: {
          ...state.formData,
          selectedResearchModule: selectedModule.id,
          moduleDetails: {
            title: selectedModule.title,
            description: selectedModule.description,
          },
        },
      }));
    }
  },

  setSelectedProjects: (projects: string[]) =>
    set((state) => ({
      selectedProjects: projects,
      formData: { ...state.formData, selectedProjects: projects },
    })),

  addUploadedFiles: (files: File[]) =>
    set((state) => {
      const updatedFiles = [...state.uploadedFiles, ...files];
      return {
        uploadedFiles: updatedFiles,
        formData: { ...state.formData, uploadedFiles: updatedFiles },
      };
    }),

  removeUploadedFile: (fileName: string) =>
    set((state) => {
      const updatedFiles = state.uploadedFiles.filter((file) => file.name !== fileName);
      return {
        uploadedFiles: updatedFiles,
        formData: { ...state.formData, uploadedFiles: updatedFiles },
      };
    }),

  resetForm: () =>
    set(() => ({
      step: 0,
      researchName: '',
      enterpriseName: '',
      selectedResearchType: '',
      selectedResearchModule: '',
      uploadedFiles: [],
      selectedProjects: [],
      questions: [],
      formData: {
        researchName: '',
        enterpriseName: '',
        selectedResearchType: '',
        selectedResearchModule: '',
        uploadedFiles: [],
        selectedProjects: [],
      },
    })),

  // Métodos para preguntas
  setQuestions: (questions: Question[]) => set(() => ({ questions })),

  addQuestion: (question: Question) =>
    set((state) => ({
      questions: [...state.questions, question],
    })),

    updateQuestion: (index, updatedData) =>
      set((state) => {
        const updatedQuestions = [...state.questions];
        updatedQuestions[index] = {
          ...updatedQuestions[index],
          ...updatedData,
        };
        return { questions: updatedQuestions };
      }),

  removeQuestion: (index: number) =>
    set((state) => ({
      questions: state.questions.filter((_, i) => i !== index),
    })),
}));
