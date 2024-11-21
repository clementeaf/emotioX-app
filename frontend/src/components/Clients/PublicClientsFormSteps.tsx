// src/components/PublicClientsFormSteps.tsx

import { Box } from '@mui/material';
import { useState } from 'react';
import { usePublicStudyStepperStore } from '../../store/usePublicStudyStepperStore';
import stepConfig from '../../config/stepConfig';

export default function PublicClientsFormSteps() {
    const { activeStep } = usePublicStudyStepperStore();
    const [activateStep, setActivateStep] = useState<number>(0);

    const handleNextStep = () => {
        setActivateStep((prevStep) => Math.min(prevStep + 1, stepConfig.length - 1));
    };

    const StepComponent = stepConfig[activateStep || activeStep]?.component || stepConfig[0].component;

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
            <StepComponent handleNextStep={handleNextStep} />
        </Box>
    );
}
