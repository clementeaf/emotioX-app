import { Stack, Stepper, Step, StepLabel, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import back from '../../src/assets/back.png';
import { FormStepperProps } from '../types/types';

export default function FormStepper({ steps, activeStep, handleStepClick, children, canProceed, formData }: FormStepperProps) {
  const isStepValid = (currentStep: number): boolean => {
    switch (currentStep) {
      case 0:
        return !!formData.researchName && !!formData.enterpriseName;
      case 1:
        return !!formData.researchType;
      case 2:
        return (formData.uploadedFiles?.length ?? 0) > 0;
      default:
        return false;
    }
  };
  
  
  
  return (
    <Stack
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        placeSelf: 'flex-start',
        gap: 1.7,
        fontWeight: 600,
      }}>
        <img src={back} alt="back" />
        Form Home
      </Typography>
      <Stack
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          bgcolor: 'white',
          width: '836px',
          height: 'auto',
          mt: 2,
          border: `1px solid ${grey[200]}`,
        }}
      >
        <Stack
          sx={{
            bgcolor: 'blue',
            width: '100%',
            height: '100%',
          }}
        >
          <Typography color="white" p={2}>
            Step {activeStep + 1} of {steps.length}
          </Typography>
        </Stack>

        <Stepper activeStep={activeStep} sx={{ bgcolor: grey[100], width: '100%' }}>
          {steps.map((label, index) => (
            <Step key={index} sx={{ p: 3 }}>
              <StepLabel
                onClick={() => (isStepValid(activeStep) && (index <= activeStep || canProceed)) ? handleStepClick(index) : null}
                sx={{
                  cursor: isStepValid(activeStep) && (index <= activeStep || canProceed) ? 'pointer' : 'not-allowed',
                  color: isStepValid(activeStep) && (index <= activeStep || canProceed) ? 'inherit' : grey[400],
                }}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        <Stack width="395px" display="flex" flexDirection="column" alignItems="center" justifyContent="center" mt={3}>
          {children}
        </Stack>
      </Stack>
    </Stack>
  );
}

