import { useNavigate } from 'react-router-dom';
import { ResearchStep1, ResearchStep2, ResearchStep3 } from './Steps';
import { useResearchStore } from '../../store/useResearchStore';
import { Typography } from '@mui/material';
import FormStepper from '../../core-ui/FormStepper';
import { useMutation } from '@tanstack/react-query';
import { useMemo, useCallback } from 'react';
import { createResearch } from '../../services/api';
import { FormDataState, ResearchResponse } from '../../types/types';
import { steps, validateStep } from '../../utils';
import { ActionButton } from '../../core-ui/Buttons';
import { useMessage } from '../../hooks/useMessage';

// Subcomponente para el contenido de cada paso
const StepContent: React.FC<{ step: number }> = ({ step }) => {
  switch (step) {
    case 0:
      return <ResearchStep1 />;
    case 1:
      return <ResearchStep2 />;
    case 2:
      return <ResearchStep3 />;
    default:
      return null;
  }
};

const MessageDisplay: React.FC<{ message: { type: 'error' | 'success'; text: string } | null }> = ({ message }) => {
  if (!message) return null;
  return <Typography color={message.type === 'error' ? 'red' : 'green'}>{message.text}</Typography>;
};

export default function ResearchForm() {
  const { step, setStep, selectedResearchModule, formData } = useResearchStore();
  const navigate = useNavigate();
  const { message, setError, setSuccess } = useMessage();

  const mutation = useMutation<ResearchResponse, Error, FormDataState>({
    mutationFn: createResearch,
    onSuccess: (data) => {
      localStorage.setItem('currentResearchId', data.research._id);
      setSuccess('Research created successfully! Redirecting...');
      setTimeout(() => navigate(`/newResearch/${data.research.selectedResearchModule}`), 2000);
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Error
          ? error.message || 'An unexpected error occurred. Please try again later.'
          : 'Failed to create research. Please try again.';
      setError(errorMessage);
    },
  });

  // Validar el paso actual con memoización
  const currentValidation = useMemo(
    () => validateStep(step, { ...formData, selectedResearchModule }),
    [step, formData, selectedResearchModule]
  );

  // Función para avanzar al siguiente paso
  const handleNext = useCallback(() => {
    if (!currentValidation.isValid) {
      setError(currentValidation.error || 'An unknown error occurred.');
      return;
    }

    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      mutation.mutate({ ...formData, selectedResearchModule });
    }
  }, [currentValidation, step, formData, selectedResearchModule, mutation, setStep, setError]);

  // Función para navegar entre pasos
  const handleStepClick = useCallback(
    (index: number) => {
      const { isValid, error } = validateStep(index, formData);
      if (index <= step && isValid) {
        setStep(index);
      } else if (!isValid) {
        setError(error || 'An unknown error occurred.');
      }
    },
    [step, formData, setStep, setError]
  );

  return (
    <FormStepper
      steps={steps}
      activeStep={step}
      handleStepClick={handleStepClick}
      canProceed={currentValidation.isValid}
      formData={formData}
    >
      <MessageDisplay message={message} />
      <StepContent step={step} />
      <ActionButton step={step} handleNext={handleNext} stepsLength={steps.length} />
    </FormStepper>
  );
}

