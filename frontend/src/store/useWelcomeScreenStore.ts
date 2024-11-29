import { create } from "zustand";

interface WelcomeScreenState {
  welcomeScreen: {
    isRequired: boolean; // Estado de "Required" para Welcome Screen
    title: string;
    message: string;
    buttonText: string;
  };
  thankYouScreen: {
    isRequired: boolean; // Estado de "Required" para Thank You Screen
    title: string;
    message: string;
  };

  // Métodos para Welcome Screen
  setWelcomeScreenTitle: (title: string) => void;
  setWelcomeScreenMessage: (message: string) => void;
  setWelcomeScreenButtonText: (buttonText: string) => void;
  setWelcomeScreenIsRequired: (isRequired: boolean) => void;

  // Métodos para Thank You Screen
  setThankYouScreenTitle: (title: string) => void;
  setThankYouScreenMessage: (message: string) => void;
  setThankYouScreenIsRequired: (isRequired: boolean) => void;
}

export const useWelcomeScreenStore = create<WelcomeScreenState>((set) => ({
  welcomeScreen: {
    isRequired: false,
    title: "",
    message: "",
    buttonText: "",
  },
  thankYouScreen: {
    isRequired: false,
    title: "",
    message: "",
  },

  // Métodos para Welcome Screen
  setWelcomeScreenTitle: (title) =>
    set((state) => ({
      welcomeScreen: {
        ...state.welcomeScreen,
        title,
      },
    })),
  setWelcomeScreenMessage: (message) =>
    set((state) => ({
      welcomeScreen: {
        ...state.welcomeScreen,
        message,
      },
    })),
  setWelcomeScreenButtonText: (buttonText) =>
    set((state) => ({
      welcomeScreen: {
        ...state.welcomeScreen,
        buttonText,
      },
    })),
  setWelcomeScreenIsRequired: (isRequired) =>
    set((state) => ({
      welcomeScreen: {
        ...state.welcomeScreen,
        isRequired,
      },
    })),

  // Métodos para Thank You Screen
  setThankYouScreenTitle: (title) =>
    set((state) => ({
      thankYouScreen: {
        ...state.thankYouScreen,
        title,
      },
    })),
  setThankYouScreenMessage: (message) =>
    set((state) => ({
      thankYouScreen: {
        ...state.thankYouScreen,
        message,
      },
    })),
  setThankYouScreenIsRequired: (isRequired) =>
    set((state) => ({
      thankYouScreen: {
        ...state.thankYouScreen,
        isRequired,
      },
    })),
}));
