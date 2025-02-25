import { create } from "zustand";
import { UploadedImage } from "../types/types";

export interface EyeTrackingImage {
    id: number;
    fileName: string;
    fileSize: number;
    tempFile?: File | null;
    uploadedImage?: UploadedImage | null;
    time?: number;
    error?: boolean;
}

export interface EyeTrackingStore {
    required: boolean;
    setRequired: (value: boolean) => void;

    taskInstruction: string;
    setTaskInstruction: (value: string) => void;

    uploadedImages: EyeTrackingImage[];
    addTempImage: (file: File) => void;
    updateUploadedImage: (fileName: string, image: UploadedImage) => void;
    removeImage: (fileName: string) => void;
    updateImageTime: (fileName: string, time: number) => void;

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

    // Obtener archivos pendientes de subir
    getFilesToUpload: () => Array<{ id: number; file: File; isMultiple: boolean }>;
}

export const useEyeTrackingStore = create<EyeTrackingStore>((set, get) => ({
    required: false,
    setRequired: (value) => set({ required: value }),

    taskInstruction: "",
    setTaskInstruction: (value) => set({ taskInstruction: value }),

    uploadedImages: [],
    addTempImage: (file: File) =>
        set((state) => ({
            uploadedImages: [
                ...state.uploadedImages,
                {
                    id: Date.now(),
                    fileName: file.name,
                    fileSize: file.size,
                    tempFile: file,
                    uploadedImage: null,
                    time: 0,
                    error: false
                }
            ],
        })),

    updateUploadedImage: (fileName, image) =>
        set((state) => ({
            uploadedImages: state.uploadedImages.map((img) =>
                img.fileName === fileName
                    ? {
                        ...img,
                        uploadedImage: image,
                        tempFile: null // Limpiamos el archivo temporal una vez subido
                    }
                    : img
            ),
        })),

    removeImage: (fileName) =>
        set((state) => ({
            uploadedImages: state.uploadedImages.filter(
                (img) => img.fileName !== fileName
            ),
        })),

    updateImageTime: (fileName, time) =>
        set((state) => ({
            uploadedImages: state.uploadedImages.map((img) =>
                img.fileName === fileName
                    ? { ...img, time: Math.max(0, time) }
                    : img
            ),
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

    getFilesToUpload: () => {
        const state = get();
        return state.uploadedImages
            .filter((img): img is EyeTrackingImage & { tempFile: File } => 
                img.tempFile instanceof File
            )
            .map(img => ({
                id: img.id,
                file: img.tempFile,
                isMultiple: true
            }));
    },
}));
