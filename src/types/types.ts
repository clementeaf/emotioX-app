export interface ResearchState {
  step: number;
  researchName: string;
  enterpriseName: string;
  selectedResearchType: string;
  selectedResearchModule: string;  // Agregar este campo para manejar el módulo
  uploadedFiles: File[];
  ResearchModule: string[];
  setStep: (step: number) => void;
  setResearchName: (name: string) => void;
  setEnterpriseName: (name: string) => void;
  setSelectedResearchType: (type: string) => void;  // Agregamos la función para el tipo de investigación
  setResearchModule: (type: string) => void;  // Agregamos la función para el módulo
  addUploadedFiles: (files: File[]) => void;
  removeUploadedFile: (fileName: string) => void;
  resetForm: () => void;
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