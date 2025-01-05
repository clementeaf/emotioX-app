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

  // Preguntas configuradas
  questions: Question[]; // Lista de preguntas en el formulario

  // Consolidado de datos del formulario
  formData: FormDataState; // Estado detallado del formulario

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

  // Métodos para preguntas
  setQuestions: (questions: Question[]) => void; // Establece la lista de preguntas
  addQuestion: (question: Question) => void; // Agrega una nueva pregunta
  updateQuestion: (index: number, updatedQuestion: Partial<Question>) => void; // Actualiza una pregunta
  removeQuestion: (index: number) => void; // Elimina una pregunta por índice
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
  researchType?: string;
  selectedProjects?: string[]; // Proyectos seleccionados
}

export interface Question {
  questionText: string; // Texto de la pregunta
  questionType: string; // Tipo de la pregunta (e.g., "Single choice", "Multiple choice")
  required: boolean; // Indica si la pregunta es obligatoria
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

export interface LoginForm {
  identifier: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}

export interface FormStepperProps {
  steps: string[];
  activeStep: number;
  handleStepClick: (index: number) => void;
  children: React.ReactNode;
  canProceed: boolean;
  formData: {
    researchName?: string;
    enterpriseName?: string;
    researchType?: string;
    uploadedFiles?: File[];
  };
}

export interface ActionButtonProps {
  step: number;
  handleNext: () => void;
  stepsLength: number;
}

// Implicit Association View
export interface InstructionFieldProps {
  label: string;
  placeholder: string;
  maxChars: number;
  value: string;
  onChange: (value: string) => void;
};

export interface ImageUploadProps {
  id: number;
  handleImageUpload: (id: number, file: File, format: string) => void;
};

export interface TargetCardProps {
  id: number;
  title: string;
  text: string;
  nameOfObject: string;
  titleAssigned: string;
  imageUploaded: File | null;
  updateTargetTitleAssigned: (id: number, value: string) => void;
  handleImageUpload: (id: number, file: File, format: string) => void;
};

export interface InputAttribute {
  id: number;
  title: string;
  inputData: string;
};

export interface DimensionsInputProps {
  sectionTitle: string;
  inputsAttributes: InputAttribute[];
  onInputChange: (id: number, value: string) => void;
};

// Criteria Table
export interface TableData {
  columnName: string;
  columnData: (string | number)[];
};

export interface ShowResults {
  checkboxTitle: string;
  checkboxSelection: boolean;
};

export interface CriteriaTableProps {
  timeSelection: 300 | 400 | 500;
  table: TableData[];
  showResults: ShowResults;
  onTimeSelectionChange: (time: 300 | 400 | 500) => void;
  onEditCell: (columnName: string, index: number, value: string | number) => void;
  onToggleShowResults: (checked: boolean) => void;
};


// InstructionFieldsContainer
export interface Instruction {
  title: string;
  textAreaData: string;
  placeHolder: string;
};

export interface InstructionFieldsProps {
  exerciseInstruction: Instruction;
  testInstruction: Instruction;
  onExerciseChange: (text: string) => void;
  onTestChange: (text: string) => void;
};

// TestConfiguration
export interface CheckboxOption {
  id: number;
  title: string;
  selection: boolean;
};

export interface TestConfigurationProps {
  title: string;
  note: string;
  checkboxsSelection: CheckboxOption[];
  onSelectionChange: (id: number, selection: boolean) => void;
};