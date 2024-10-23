import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResearchStep1, ResearchStep2, ResearchStep3 } from './Steps';
import { useResearchStore } from '../../store/useResearchStore';
import { Button } from '@mui/material';
import FormStepper from '../../core-ui/FormStepper';

const steps = ['Name the Research', 'Kind of Research', 'Techniques for Research'];

export default function ResearchForm() {
    const { step, setStep, selectedResearchModule } = useResearchStore();
    const [activeStep, setActiveStep] = useState(0);
    const navigate = useNavigate();

    const handleNext = () => {
        if (activeStep < steps.length - 1) {
            setActiveStep((prev) => prev + 1);
            setStep(step + 1);
        } else {
            if (selectedResearchModule) {
                navigate(`/newResearch/${selectedResearchModule}`);
            }
        }
    };

    const handleStepClick = (index: number) => {
        setActiveStep(index);
        setStep(index);
    };

    const canProceed = selectedResearchModule !== '';

    return (
        <FormStepper steps={steps} activeStep={activeStep} handleStepClick={handleStepClick} canProceed={canProceed}>
            {step === 0 && <ResearchStep1 />}
            {step === 1 && <ResearchStep2 />}
            {step === 2 && <ResearchStep3 />}
            <Button
                variant="contained"
                onClick={handleNext}
                sx={{ width: '395px', height: '40px', mt: 3, mb: 4, bgcolor: 'blue', textTransform: 'initial' }}
                disabled={activeStep === 2 && !selectedResearchModule}
            >
                {activeStep === steps.length - 1 ? 'Create Research' : 'Next'}
            </Button>
        </FormStepper>
    );
}
