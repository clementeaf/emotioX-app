import { useNavigate } from 'react-router-dom';
import { ResearchStep1, ResearchStep2, ResearchStep3 } from './Steps';
import { useResearchStore } from '../../store/useResearchStore';
import { Button, Typography } from '@mui/material';
import FormStepper from '../../core-ui/FormStepper';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { createResearch } from '../../services/api';
import { ActionButtonProps, FormDataState, ResearchResponse } from '../../types/types';
import { steps } from '../../utils';

const ActionButton: React.FC<ActionButtonProps> = ({ step, handleNext, stepsLength }) => {
  return (
    <Button
      variant="contained"
      onClick={handleNext}
      sx={{ width: '395px', height: '40px', mt: 3, mb: 4, bgcolor: 'blue', textTransform: 'initial' }}
    >
      {step === stepsLength - 1 ? 'Create Research' : 'Next'}
    </Button>
  );
};

export default function ResearchForm() {
  const { step, setStep, selectedResearchModule, formData } = useResearchStore();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const mutation = useMutation<ResearchResponse, Error, FormDataState>({
    mutationFn: createResearch,
    onSuccess: (data) => {
      const { message, research } = data;

      if (message.length > 0) {
        setSuccessMessage('Research created successfully! Redirecting...');
      }

      setTimeout(() => {
        navigate(`/newResearch/${research.selectedResearchModule}`);
      }, 2000);
    },
    onError: (error) => {
      console.error('Failed to create research:', error);

      const serverErrorMessage =
        error instanceof Error
          ? error.message || 'An unexpected error occurred. Please try again later.'
          : 'Failed to create research. Please try again.';

      setErrorMessage(serverErrorMessage);
    },
  });


  const isStepValid = (currentStep: number, formData: FormDataState): { isValid: boolean; error?: string } => {
    switch (currentStep) {
      case 0:
        if (!formData.researchName || !formData.enterpriseName) {
          return { isValid: false, error: 'Research Name and Enterprise Name are required.' };
        }
        return { isValid: true };
      case 1:
        if (!formData.selectedResearchType) {
          return { isValid: false, error: 'Research Type is required.' };
        }
        return { isValid: true };
      case 2:
        if ((formData.uploadedFiles?.length ?? 0) === 0) {
          return { isValid: false, error: 'At least one file must be uploaded.' };
        }
        return { isValid: true };
      default:
        return { isValid: false, error: 'Unknown validation step.' };
    }
  };


  const handleNext = () => {
    if (isStepValid(step, { ...formData, selectedResearchModule })) {
      if (step < steps.length - 1) {
        setStep(step + 1);
      } else {
        if (!formData.researchName || !formData.enterpriseName || !formData.selectedResearchType || !selectedResearchModule) {
          setErrorMessage('Please ensure all fields are complete.');
          return;
        }
        mutation.mutate({ ...formData, selectedResearchModule });
      }
    } else {
      setErrorMessage('Please complete the required fields before proceeding.');
    }
  };



  const handleStepClick = (index: number) => {
    if (index <= step && isStepValid(index, formData)) {
      setStep(index);
    } else {
      setErrorMessage('Please complete the current step before proceeding.');
    }
  };

  return (
    <>
      <FormStepper
        steps={steps}
        activeStep={step}
        handleStepClick={handleStepClick}
        canProceed={isStepValid(step, formData)?.isValid}
        formData={formData}
      >
        {errorMessage && <Typography color='red'>{errorMessage}</Typography>}
        {successMessage && <Typography color='green'>{successMessage}</Typography>}
        {step === 0 && <ResearchStep1 />}
        {step === 1 && <ResearchStep2 />}
        {step === 2 && <ResearchStep3 />}
        <ActionButton
          step={step}
          handleNext={handleNext}
          stepsLength={steps.length}
        />
      </FormStepper>
    </>

  );
}
