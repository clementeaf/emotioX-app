import { Box } from '@mui/material';
import { useState } from 'react';
import { usePublicStudyStepperStore } from '../../store/usePublicStudyStepperStore';
import RatingStep, { FinishStep, GenderStep, InstructionsStep, OptionsStep, ProblemSolveStep, SelectCityStep, SocialMediaStep, TestAppNavigationStep, TestAppNavigationStepV2 } from './PublishedSteps';
import WelcomeStep from './PublishedSteps';

export default function PublishedStudy() {
    const { activeStep } = usePublicStudyStepperStore();
    const [activateStep, setActivateStep] = useState<number>(0);

    const handleNextStep = () => {
        setActivateStep((prevActiveStep: number) => prevActiveStep + 1);
    };

    const manageStep = () => {
        switch (activateStep || activeStep) {
            case 0:
                return <WelcomeStep handleNextStep={handleNextStep}/>;
            case 1:
                return <SelectCityStep handleNextStep={handleNextStep}/>;
            case 2:
                return <InstructionsStep handleNextStep={handleNextStep}/>;
            case 3:
                return <GenderStep handleNextStep={handleNextStep}/>;
            case 4:
                return <SocialMediaStep handleNextStep={handleNextStep}/>;
            case 5:
                return <ProblemSolveStep handleNextStep={handleNextStep}/>;
            case 6:
                return <RatingStep handleNextStep={handleNextStep}/>;
            case 7:
                return <OptionsStep handleNextStep={handleNextStep}/>;
            case 8:
                return <TestAppNavigationStep handleNextStep={handleNextStep}/>;
            case 9:
                return <TestAppNavigationStepV2 handleNextStep={handleNextStep}/>;
            case 10:
                return <FinishStep />;
            default:
                return <WelcomeStep handleNextStep={handleNextStep}/>;
        }
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            gap: 2,
        }}>
            {manageStep()}
        </Box>
    );
}
