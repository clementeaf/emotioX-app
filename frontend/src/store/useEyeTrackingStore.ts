import { create } from "zustand";

export interface UploadedFile {
    fileName: string;
    fileSize: number;
}

interface EyeTrackingStore {
    required: boolean;
    setRequired: (value: boolean) => void;

    taskInstruction: string;
    setTaskInstruction: (value: string) => void;

    uploadedFiles: UploadedFile[];
    addUploadedFiles: (files: UploadedFile[]) => void;
    removeUploadedFile: (fileName: string) => void;

    randomize: boolean;
    setRandomize: (value: boolean) => void;

    // Estados para los checkboxes de configuración
    isShelfTask: boolean;
    setIsShelfTask: (value: boolean) => void;

    resizeImage: boolean;
    setResizeImage: (value: boolean) => void;

    useEyeTrackingDevice: boolean;
    setUseEyeTrackingDevice: (value: boolean) => void;

    useWebcamBasedTracking: boolean;
    setUseWebcamBasedTracking: (value: boolean) => void;

    enableClickMeasurement: boolean;
    setEnableClickMeasurement: (value: boolean) => void;

    finishOnAnyKey: boolean;
    setFinishOnAnyKey: (value: boolean) => void;

    holdDeviceVertical: boolean;
    setHoldDeviceVertical: (value: boolean) => void;

    holdDeviceHorizontal: boolean;
    setHoldDeviceHorizontal: (value: boolean) => void;

    displayTime: string;
    setDisplayTime: (value: string) => void;
}

export const useEyeTrackingStore = create<EyeTrackingStore>((set) => ({
    required: false,
    setRequired: (value) => set({ required: value }),

    taskInstruction: "",
    setTaskInstruction: (value) => set({ taskInstruction: value }),

    uploadedFiles: [],
    addUploadedFiles: (files) =>
        set((state) => ({
            uploadedFiles: [...state.uploadedFiles, ...files],
        })),
    removeUploadedFile: (fileName) =>
        set((state) => ({
            uploadedFiles: state.uploadedFiles.filter((file) => file.fileName !== fileName),
        })),

    randomize: false,
    setRandomize: (value) => set({ randomize: value }),

    isShelfTask: false,
    setIsShelfTask: (value) => set({ isShelfTask: value }),

    resizeImage: false,
    setResizeImage: (value) => set({ resizeImage: value }),

    useEyeTrackingDevice: false,
    setUseEyeTrackingDevice: (value) => set({ useEyeTrackingDevice: value }),

    useWebcamBasedTracking: false,
    setUseWebcamBasedTracking: (value) => set({ useWebcamBasedTracking: value }),

    enableClickMeasurement: false,
    setEnableClickMeasurement: (value) => set({ enableClickMeasurement: value }),

    finishOnAnyKey: false,
    setFinishOnAnyKey: (value) => set({ finishOnAnyKey: value }),

    holdDeviceVertical: false,
    setHoldDeviceVertical: (value) => set({ holdDeviceVertical: value }),

    holdDeviceHorizontal: false,
    setHoldDeviceHorizontal: (value) => set({ holdDeviceHorizontal: value }),

    displayTime: "10 secs",
    setDisplayTime: (value) => set({ displayTime: value }),
}));
