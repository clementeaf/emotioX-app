export interface ResearchState {
  // Estado general del formulario
  step: number; // Paso actual del formulario
  researchName: string; // Nombre de la investigación
  enterpriseName: string; // Nombre de la empresa
  selectedResearchType: string; // Tipo de investigación seleccionada
  selectedResearchModule: string; // Módulo de investigación seleccionado
  uploadedFiles: File[]; // Lista de archivos cargados
  selectedProjects: string[]; // Proyectos seleccionados en ClientsBenchmark
  ResearchModule: string[]; // Lista de módulos de investigación disponibles

  // Métodos para actualizar el estado
  setStep: (step: number) => void; // Establece el paso actual
  setResearchName: (name: string) => void; // Establece el nombre de la investigación
  setEnterpriseName: (name: string) => void; // Establece el nombre de la empresa
  setSelectedResearchType: (type: string) => void; // Establece el tipo de investigación
  setResearchModule: (moduleId: string) => void; // Establece el módulo de investigación
  setSelectedProjects: (projects: string[]) => void; // Establece los proyectos seleccionados
  addUploadedFiles: (files: File[]) => void; // Agrega archivos cargados
  removeUploadedFile: (fileName: string) => void; // Elimina un archivo cargado
  resetForm: () => void; // Resetea el formulario a su estado inicial

  // Consolidado de datos del formulario
  formData: FormDataState; // Estado detallado del formulario
}

// Subtipo para los datos consolidados del formulario
export interface FormDataState {
  researchName?: string; // Nombre de la investigación
  enterpriseName?: string; // Nombre de la empresa
  selectedResearchType?: string; // Tipo de investigación seleccionada
  selectedResearchModule?: string; // Módulo de investigación seleccionado
  moduleDetails?: {
    title: string; // Título del módulo seleccionado
    description: string; // Descripción del módulo seleccionado
  };
  uploadedFiles?: File[]; // Lista de archivos cargados
  selectedProjects?: string[]; // Proyectos seleccionados
}

export interface PublicStudyStepperStore {
  activeStep: number;
  setActiveStep: (step: number) => void;
  nextStep: () => void;
}

export interface StepProps {
  handleNextStep: () => void;
  label?: string;
}