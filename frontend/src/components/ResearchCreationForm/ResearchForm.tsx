import { useNavigate } from 'react-router-dom';
import { ResearchStep1, ResearchStep2, ResearchStep3 } from './Steps';
import { useResearchStore } from '../../store/useResearchStore';
import { Button, Alert } from '@mui/material';
import FormStepper from '../../core-ui/FormStepper';
import { useMutation } from '@tanstack/react-query';

import { useState } from 'react';
import { createResearch } from '../../services/api';

const steps = ['Name the Research', 'Kind of Research', 'Techniques for Research'];

interface ActionButtonProps {
  step: number;
  handleNext: () => void;
  isButtonDisabled: boolean;
  stepsLength: number;
}

const ActionButton: React.FC<ActionButtonProps> = ({ step, handleNext, isButtonDisabled, stepsLength }) => {
  return (
    <Button
      variant="contained"
      onClick={handleNext}
      sx={{ width: '395px', height: '40px', mt: 3, mb: 4, bgcolor: 'blue', textTransform: 'initial' }}
      disabled={isButtonDisabled}
    >
      {step === stepsLength - 1 ? 'Create Research' : 'Next'}
    </Button>
  );
};


export default function ResearchForm() {
  const { step, setStep, selectedResearchModule, formData } = useResearchStore();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: createResearch,
    onSuccess: (data) => {
      console.log('Research created successfully:', data);
      navigate(`/newResearch/${selectedResearchModule}`);
    },
    onError: (error) => {
      console.error('Failed to create research:', error);
      setErrorMessage('Failed to create research. Please try again.');
    },
  });

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      if (selectedResearchModule) {
        mutation.mutate(formData);
      }
    }
  };

  const handleStepClick = (index: number) => {
    setStep(index);
  };

  const isStepThreeValid = () => {
    return (
      !!selectedResearchModule &&
      !!formData.researchName &&
      !!formData.enterpriseName
    );
  };

  const isButtonDisabled = step === 2 && !isStepThreeValid();

  return (
    <>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      <FormStepper steps={steps} activeStep={step} handleStepClick={handleStepClick} canProceed={!isButtonDisabled}>
        {step === 0 && <ResearchStep1 />}
        {step === 1 && <ResearchStep2 />}
        {step === 2 && <ResearchStep3 />}
        <ActionButton step={step} handleNext={handleNext} isButtonDisabled={isButtonDisabled} stepsLength={0} />
      </FormStepper>
    </>
  );
}
