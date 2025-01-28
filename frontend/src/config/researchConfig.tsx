import { ReactNode } from 'react';
import { WelcomeScreenContainer } from '../core-ui/WelcomeScreenContainer';
import { ThankYouScreenContainer } from '../components/Dashboard/AIMFrameworkModule/BuildViewComponents/ThankYouScreenContainer';
import { SmartVocFormV2 } from '../components/Dashboard/AIMFrameworkModule/BuildViewComponents/SmartVocFormV2';
import { CognitiveTaskFormV2 } from '../components/Dashboard/AIMFrameworkModule/BuildViewComponents/CongnitiveTaskFormV2';
import { ScreenerScreenContainer } from '../core-ui/ScreenerScreenContainer';
import ImplicitAssociationView from '../components/Dashboard/BehaviouralResearch/BuildViewComponents/ImplicitAssociationView';
import CognitiveTaskView from '../components/Dashboard/BehaviouralResearch/BuildViewComponents/CognitiveTaskView';
import EyeTrackingView from '../components/Dashboard/BehaviouralResearch/BuildViewComponents/EyeTrackingView';
import ResumenComponent from '../components/Dashboard/BehaviouralResearch/ResultsViewComponents/ResumenComponent';
import ImplicitAssociationResultsComponent from '../components/Dashboard/BehaviouralResearch/ResultsViewComponents/ImplicitAssociationResultsComponent';
import ResultsMainScreenV2 from '../components/Dashboard/AIMFrameworkModule/ResultsViewComponents/ResultsMainScreenV2';
import EyeTrackingResults from '../components/Dashboard/BehaviouralResearch/ResultsViewComponents/EyeTrackingResults';
import { useWelcomeScreenStore } from '../store/useWelcomeScreenStore';
import { useScreenerStore } from '../store/useScreenerStore';
import { useImplicitAssociationStore } from '../store/useImplicitAssociationStore';
import { useCognitiveTaskStore } from '../store/useCognitiveTaskStore';
import { useEyeTrackingStore } from '../store/useEyeTrackingStore';

type ResearchStage = {
  label: string;
  component: ReactNode;
  getStore?: () => any;
};

export const researchStagesConfig: Record<'AIMFramework' | 'BehaviouralResearch', 
{
  Build: ResearchStage[];
  Recruit: ResearchStage[];
  Result: ResearchStage[];
}
> = {
  AIMFramework: {
    Build: [
      { label: 'Welcome Screen', component: <WelcomeScreenContainer />, getStore: () => useWelcomeScreenStore.getState() },
      { label: 'Smart VOC', component: <SmartVocFormV2 /> },
      { label: 'Cognitive Task', component: <CognitiveTaskFormV2 /> },
      { label: 'Thank You', component: <ThankYouScreenContainer /> },
    ],
    Recruit: [
      { label: 'Screener', component: <ScreenerScreenContainer /> },
      { label: 'Welcome screen', component: <WelcomeScreenContainer /> },
      { label: 'Implicit Association', component: <ImplicitAssociationView /> },
      { label: 'Cognitive Task', component: <CognitiveTaskFormV2 /> },
      { label: 'Eye Tracking', component: <EyeTrackingView /> },
      { label: 'Thank You', component: <ThankYouScreenContainer /> },
    ],
    Result: [
      { label: 'Smart VOC', component: <ResultsMainScreenV2 /> },
      { label: 'Cognitive Task', component: <ResultsMainScreenV2 /> },
    ],
  },
  BehaviouralResearch: {
    Build: [
      { label: 'Screener', component: <ScreenerScreenContainer />, getStore: () => useScreenerStore.getState().getStringsAndSelection() },
      { label: 'Welcome screen', component: <WelcomeScreenContainer />, getStore: () => useWelcomeScreenStore.getState().welcomeScreen },
      { label: 'Implicit Association', component: <ImplicitAssociationView />, getStore: () => useImplicitAssociationStore.getState() },
      { label: 'Cognitive task', component: <CognitiveTaskView />,  getStore: () => useCognitiveTaskStore.getState()},
      { label: 'Eye Tracking', component: <EyeTrackingView />, getStore: () => useEyeTrackingStore.getState() },
      { label: 'Thank you screen', component: <ThankYouScreenContainer />, getStore: () => () => useWelcomeScreenStore.getState().thankYouScreen },
    ],
    Recruit: [
      { label: 'Screener', component: <ScreenerScreenContainer /> },
      { label: 'Welcome screen', component: <WelcomeScreenContainer /> },
      { label: 'Implicit Association', component: <ImplicitAssociationView /> },
      { label: 'Cognitive task', component: <CognitiveTaskView /> },
      { label: 'Eye Tracking', component: <EyeTrackingView /> },
      { label: 'Thank you screen', component: <ThankYouScreenContainer /> },
    ],
    Result: [
      { label: 'Resumen', component: <ResumenComponent /> },
      { label: 'Implicit Association Results', component: <ImplicitAssociationResultsComponent /> },
      { label: 'Cognitive task', component: <CognitiveTaskView /> },
      { label: 'Eye Tracking', component: <EyeTrackingResults /> },
    ],
  },
};
