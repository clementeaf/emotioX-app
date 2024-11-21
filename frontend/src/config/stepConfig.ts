// src/config/stepConfig.ts

import RatingStep, {
    InitialEvaluationStep,
    InstructionsStep,
    GenderStep,
    SocialMediaStep,
    ProblemSolveStep,
    OptionsStep,
    TestAppNavigationStep,
    TestAppNavigationStepV2,
    FinishStep
} from '../components/Clients/PublishedSteps';
import { StepProps } from '../types/types';

type StepConfig = {
    component: React.ComponentType<StepProps>;
    label?: string;
};

const stepConfig: StepConfig[] = [
    { component: InitialEvaluationStep },
    { component: RatingStep },
    { component: InstructionsStep },
    { component: GenderStep },
    { component: SocialMediaStep },
    { component: ProblemSolveStep },
    { component: RatingStep },
    { component: OptionsStep },
    { component: TestAppNavigationStep },
    { component: TestAppNavigationStepV2 },
    { component: FinishStep }
];

export default stepConfig;
