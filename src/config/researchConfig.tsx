// researchConfig.ts
import { ReactNode } from 'react';
import { WelcomeScreenContainer } from '../core-ui/WelcomeScreenContainer';
import { ThankYouScreenContainer } from '../components/Dashboard/AIMFrameworkModule/BuildViewComponents/ThankYouScreenContainer';
import { SmartVocFormV2 } from '../components/Dashboard/AIMFrameworkModule/BuildViewComponents/SmartVocFormV2';
import { CognitiveTaskFormV2 } from '../components/Dashboard/AIMFrameworkModule/BuildViewComponents/CongnitiveTaskFormV2';

type ResearchStage = {
  label: string;
  component: ReactNode;
};

export const researchStagesConfig: Record<'AIMFramework' | 'BehaviouralResearch', ResearchStage[]> = {
  AIMFramework: [
    { label: 'Welcome Screen', component: <WelcomeScreenContainer /> },
    { label: 'Smart VOC', component: <SmartVocFormV2 /> },
    { label: 'Cognitive Task', component: <CognitiveTaskFormV2 /> },
    { label: 'Thank You', component: <ThankYouScreenContainer /> },
  ],
  BehaviouralResearch: [
    { label: 'Stage 1', component: <WelcomeScreenContainer /> },
    { label: 'Stage 2', component: <SmartVocFormV2 /> },
    { label: 'Stage 3', component: <CognitiveTaskFormV2 /> },
    { label: 'Stage 4', component: <ThankYouScreenContainer /> },
  ],
};
