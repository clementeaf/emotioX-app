import { create } from 'zustand';
import { ResearchState } from '../types/types';

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
  formData: {
    researchName: '',
    enterpriseName: '',
    selectedResearchType: '',
    selectedResearchModule: '',
    uploadedFiles: [],
    selectedProjects: [],
  },

  // Métodos para actualizar el estado

  // Actualizar el paso actual
  setStep: (step: number) => set(() => ({ step })),

  // Actualizar el nombre de la investigación
  setResearchName: (name: string) =>
    set((state) => ({
      researchName: name,
      formData: { ...state.formData, researchName: name },
    })),

  // Actualizar el nombre de la empresa
  setEnterpriseName: (name: string) =>
    set((state) => ({
      enterpriseName: name,
      formData: { ...state.formData, enterpriseName: name },
    })),

  // Actualizar el tipo de investigación
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

  // Actualizar el módulo seleccionado
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

  // Actualizar los proyectos seleccionados
  setSelectedProjects: (projects: string[]) =>
    set((state) => ({
      selectedProjects: projects,
      formData: { ...state.formData, selectedProjects: projects },
    })),

  // Manejar los archivos subidos
  addUploadedFiles: (files: File[]) =>
    set((state) => {
      const updatedFiles = [...state.uploadedFiles, ...files];
  
      // Aseguramos sincronización con formData
      return {
        uploadedFiles: updatedFiles,
        formData: {
          ...state.formData,
          uploadedFiles: updatedFiles, // Aquí se sincroniza correctamente
        },
      };
    }),
  

  // Eliminar archivos subidos
  removeUploadedFile: (fileName: string) =>
    set((state) => {
      const updatedFiles = state.uploadedFiles.filter((file) => file.name !== fileName);
      return {
        uploadedFiles: updatedFiles,
        formData: { ...state.formData, uploadedFiles: updatedFiles },
      };
    }),

  // Resetear el formulario
  resetForm: () =>
    set(() => ({
      step: 0,
      researchName: '',
      enterpriseName: '',
      selectedResearchType: '',
      selectedResearchModule: '',
      uploadedFiles: [],
      selectedProjects: [],
      formData: {
        researchName: '',
        enterpriseName: '',
        selectedResearchType: '',
        selectedResearchModule: '',
        uploadedFiles: [],
        selectedProjects: [],
      },
    })),
}));