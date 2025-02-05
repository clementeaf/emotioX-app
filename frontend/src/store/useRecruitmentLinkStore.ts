import { create } from "zustand";

export interface RecruitmentLinkState {
  demographicQuestionsRequired: boolean;
  demographicQuestions: {
    age: boolean;
    country: boolean;
    gender: boolean;
    educationLevel: boolean;
    annualHouseholdIncome: boolean;
    employmentStatus: boolean;
    dailyHoursOnline: boolean;
    technicalProficiency: boolean;
  };
  linkConfiguration: {
    allowMobileDevices: boolean;
    trackLocation: boolean;
    multipleSessionsAllowed: boolean;
  };
  participantLimit: number;

  setDemographicQuestionsRequired: (value: boolean) => void;
  toggleDemographicQuestion: (key: keyof RecruitmentLinkState["demographicQuestions"]) => void;
  setLinkConfiguration: (key: keyof RecruitmentLinkState["linkConfiguration"], value: boolean) => void;
  setParticipantLimit: (value: number) => void;
}

export interface ResearchConfigurationState {
  backlinks: {
    complete: string;
    disqualified: string;
    overquota: string;
  };
  researchURL: string;
  parametersToSave: string;

  setBacklink: (key: keyof ResearchConfigurationState["backlinks"], value: string) => void;
  setResearchURL: (value: string) => void;
  setParametersToSave: (value: string) => void;
}

export const useRecruitmentLinkStore = create<RecruitmentLinkState>((set) => ({
  demographicQuestionsRequired: false,
  demographicQuestions: {
    age: false,
    country: false,
    gender: false,
    educationLevel: false,
    annualHouseholdIncome: false,
    employmentStatus: false,
    dailyHoursOnline: false,
    technicalProficiency: false,
  },
  linkConfiguration: {
    allowMobileDevices: false,
    trackLocation: false,
    multipleSessionsAllowed: false,
  },
  participantLimit: 50,
  setDemographicQuestionsRequired: (value) => set({ demographicQuestionsRequired: value }),
  toggleDemographicQuestion: (key) =>
    set((state) => ({
      demographicQuestions: {
        ...state.demographicQuestions,
        [key]: !state.demographicQuestions[key],
      },
    })),
  setLinkConfiguration: (key, value) =>
    set((state) => ({
      linkConfiguration: {
        ...state.linkConfiguration,
        [key]: value,
      },
    })),
  setParticipantLimit: (value) => set({ participantLimit: value }),
}));

export const useResearchConfigurationStore = create<ResearchConfigurationState>((set) => ({
  backlinks: {
    complete: "",
    disqualified: "",
    overquota: "",
  },
  researchURL: "",
  parametersToSave: "",
  setBacklink: (key, value) =>
    set((state) => ({
      backlinks: {
        ...state.backlinks,
        [key]: value,
      },
    })),
  setResearchURL: (value) => set({ researchURL: value }),
  setParametersToSave: (value) => set({ parametersToSave: value }),
}));
