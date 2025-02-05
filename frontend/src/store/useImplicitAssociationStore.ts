import { create } from "zustand";
import { UploadedImage } from "../types/types";

export interface Target {
  id: number;
  nameOfObject: string;
  imageUploaded: File | null;
  imageFormat: string | null;
  uploadedImage?: UploadedImage | null; // ✅ Agregar `uploadedImage` a cada Target
}

interface TextArea {
  id: number;
  label: string;
  value: string;
}

interface TestConfigurationOption {
  id: number;
  label: string;
  checked: boolean;
}

interface ImplicitAssociationStore {
  required: boolean;
  targets: Target[];
  textAreas: TextArea[];
  testConfigurations: TestConfigurationOption[];

  // Métodos
  setRequired: (value: boolean) => void;
  updateTargetName: (id: number, name: string) => void;
  updateTargetImage: (id: number, file: File) => void;
  updateUploadedImage: (id: number, image: UploadedImage) => void; // ✅ Ahora actualiza un `Target`
  updateTextArea: (id: number, value: string) => void;
  resetTextAreas: () => void;
  toggleTestConfiguration: (id: number) => void;
  getFilesToUpload: () => Array<{ id: number; file: File | null }>;
}

export const useImplicitAssociationStore = create<ImplicitAssociationStore>(
  (set, get) => ({
    required: true,
    targets: [
      { id: 1, nameOfObject: "", imageUploaded: null, imageFormat: null, uploadedImage: null },
      { id: 2, nameOfObject: "", imageUploaded: null, imageFormat: null, uploadedImage: null },
    ],
    textAreas: [
      { id: 1, label: "Exercise instructions", value: "" },
      { id: 2, label: "Test instructions", value: "" },
    ],
    testConfigurations: [
      { id: 1, label: "Shuffle Keys", checked: false },
      { id: 2, label: "Skip Training", checked: false },
      { id: 3, label: "Make test shorter", checked: false },
      { id: 4, label: "Hide test progress bar", checked: false },
    ],

    setRequired: (value) => set(() => ({ required: value })),

    updateTargetName: (id, name) =>
      set((state) => ({
        targets: state.targets.map((target) =>
          target.id === id ? { ...target, nameOfObject: name } : target
        ),
      })),

    updateTargetImage: (id, file) =>
      set((state) => ({
        targets: state.targets.map((target) =>
          target.id === id
            ? { ...target, imageUploaded: file, imageFormat: file.type.split("/")[1] }
            : target
        ),
      })),

    updateUploadedImage: (id, image) =>
      set((state) => ({
        targets: state.targets.map((target) =>
          target.id === id ? { ...target, uploadedImage: image } : target
        ),
      })),

    updateTextArea: (id, value) =>
      set((state) => ({
        textAreas: state.textAreas.map((textArea) =>
          textArea.id === id ? { ...textArea, value } : textArea
        ),
      })),

    resetTextAreas: () =>
      set((state) => ({
        textAreas: state.textAreas.map((textArea) => ({
          ...textArea,
          value: "",
        })),
      })),

    toggleTestConfiguration: (id) =>
      set((state) => ({
        testConfigurations: state.testConfigurations.map((config) =>
          config.id === id ? { ...config, checked: !config.checked } : config
        ),
      })),

    getFilesToUpload: () =>
      get().targets.map(({ id, imageUploaded }) => ({ id, file: imageUploaded })),
  })
);
