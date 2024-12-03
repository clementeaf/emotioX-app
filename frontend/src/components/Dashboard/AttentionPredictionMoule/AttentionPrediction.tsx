import { useState, useEffect } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import ProgressDetails from './ProgressDetails';
import ProgressBar from '../../../core-ui/Progress/ProgressBar';
import { Modal } from './Modal';
import { ConfigModal } from './ConfigModal';

export default function AttentionPrediction() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isDisplay, setIsDisplay] = useState(false);
  const [progressBarValue, setProgressBarValue] = useState(0); // Estado para el valor de la barra de progreso
  const totalImages = 4; // Total de imágenes
  const durationPerImage = 5000; // Tiempo por imagen (5 segundos)
  const totalDuration = totalImages * durationPerImage; // Tiempo total para procesar todas las imágenes

  const handleModalOpen = () => {
    setIsDisplay(true);
  };

  const handleModalClose = () => {
    setIsDisplay(false);
  };

  const handleNext = () => {
    setCurrentStep(2);
  };

  // Manejar el progreso de la barra
  useEffect(() => {
    if (progressBarValue >= 100) return; // Finalizar cuando llegue al 100%

    const interval = setInterval(() => {
      setProgressBarValue((prev) => {
        const increment = (100 / totalDuration) * 100; // Incremento proporcional al tiempo
        const nextValue = prev + increment;
        if (nextValue >= 100) {
          clearInterval(interval); // Detener al llegar a 100%
          return 100;
        }
        return nextValue;
      });
    }, 100); // Actualizar cada 100ms

    return () => clearInterval(interval);
  }, [progressBarValue, totalDuration]);

  return (
    <Box>
      <>
        <Typography fontSize="20px" fontWeight={700} color="#262626">
          Prediction of visual attention
        </Typography>
        <Box
          mt={3}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: 1,
            border: `1px solid ${grey[300]}`,
            bgcolor: 'white',
            height: 'auto',
            pb: 5,
          }}
        >
          <Typography fontSize="16px" fontWeight={700} color="#212121" mt={2} ml={2} alignSelf="flex-start">
            1.0.- Eye Tracking Prediction
          </Typography>
          <div
            style={{
              height: '1px',
              width: '100%',
              backgroundColor: grey[300],
            }}
          />
          {currentStep === 1 && (
            <Box
              sx={{
                mt: 2,
                ml: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                height: '100%',
              }}
            >
              <Stack
                sx={{
                  width: '426px',
                  height: '481px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography fontSize="14px" fontWeight={500} lineHeight="22px" color="#262626">
                  General status
                </Typography>
                <Typography fontSize="12px" fontWeight={400} lineHeight="20px" color="#8C8C8C" mt={0.5}>
                  This process may take a long time. We will notify you when the process is complete. You can continue browsing without any problems.
                </Typography>
                <ProgressBar value={progressBarValue} />
                <ProgressDetails totalImages={totalImages} />
              </Stack>
            </Box>
          )}
          {currentStep === 2 && <Modal handleOpen={handleModalOpen} />}
          {isDisplay && <ConfigModal handleClose={handleModalClose} />}
        </Box>
        <Button onClick={handleNext}>Next</Button>
      </>
    </Box>
  );
}
