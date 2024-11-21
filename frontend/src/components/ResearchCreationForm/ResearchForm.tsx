import { useNavigate } from 'react-router-dom';
import { ResearchStep1, ResearchStep2, ResearchStep3 } from './Steps';
import { useResearchStore } from '../../store/useResearchStore';
import { Button, Typography } from '@mui/material';
import FormStepper from '../../core-ui/FormStepper';

const steps = ['Name the Research', 'Kind of Research', 'Techniques for Research'];

export default function ResearchForm() {
  const { step, setStep, selectedResearchModule, formData } = useResearchStore(); // Usamos el estado global
  const navigate = useNavigate();

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1); // Actualizar paso global
    } else {
      // Enviar datos al backend o proceder con la navegación
      if (selectedResearchModule) {
        console.log('Payload to send:', formData); // Aquí puedes enviar al backend
        navigate(`/newResearch/${selectedResearchModule}`);
      }
    }
  };

  const handleStepClick = (index: number) => {
    setStep(index); // Cambiar paso directamente en el estado global
  };

  // Validaciones para habilitar el botón
  const isButtonDisabled =
    step === 2 && // Validación específica del paso 3
    (
      !selectedResearchModule || // Verificar que el módulo esté seleccionado
      !(formData.uploadedFiles && formData.uploadedFiles.length > 0) || // Verificar que haya archivos
      !formData.researchName || // Verificar que el nombre de la investigación no esté vacío
      !formData.enterpriseName // Verificar que el nombre de la empresa no esté vacío
    );


  console.log('Form Data:', formData);

  return (
    <FormStepper steps={steps} activeStep={step} handleStepClick={handleStepClick} canProceed={!isButtonDisabled}>
      {/* Renderizado condicional basado en el paso actual */}
      {step === 0 && <ResearchStep1 />}
      {step === 1 && <ResearchStep2 />}
      {step === 2 && <ResearchStep3 />}

      {/* Botón para avanzar o completar */}
      <Button
        variant="contained"
        onClick={handleNext}
        sx={{ width: '395px', height: '40px', mt: 3, mb: 4, bgcolor: 'blue', textTransform: 'initial' }}
        // disabled={isButtonDisabled}
      >
        {step === steps.length - 1 ? 'Create Research' : 'Next'}
      </Button>
    </FormStepper>
  );
}
