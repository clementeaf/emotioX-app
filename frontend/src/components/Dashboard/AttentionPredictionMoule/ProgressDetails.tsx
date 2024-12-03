import { Box, Stack, Typography } from '@mui/material';
import { useState, useEffect } from 'react';

interface ProgressDetailsProps {
  totalImages: number; // Total de imágenes en el proceso
}

export default function ProgressDetails({ totalImages }: ProgressDetailsProps) {
  const durationPerImage = 5000; // 5 segundos por imagen

  const [currentImage, setCurrentImage] = useState<number>(0); // Imagen actual que está procesando
  const [progress, setProgress] = useState<number>(0); // Progreso (0 a 100%) de la imagen actual

  useEffect(() => {
    if (currentImage >= totalImages) return; // Finalizamos cuando se procesan todas las imágenes

    // Animar el progreso de la imagen actual
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval); // Detener progreso al completar la imagen
          setCurrentImage((img) => img + 1); // Pasar a la siguiente imagen
          return 0; // Reiniciar progreso
        }
        return prev + (100 / (durationPerImage / 100)); // Incrementar proporcionalmente
      });
    }, 100); // Incremento cada 100ms

    return () => clearInterval(progressInterval);
  }, [currentImage, totalImages]);

  return (
    <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column' }}>
      <Typography fontWeight={300} mb={2}>
        Details
      </Typography>

      {/* Progreso actual */}
      <Stack
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          mt: 2,
        }}
      >
        {/* Indicador de progreso */}
        <div
          style={{
            width: '1.5px',
            height: '85px',
            backgroundColor: 'green',
          }}
        >
          <div
            style={{
              position: 'relative',
              left: '-6px',
              top: '7px',
              backgroundColor: 'white',
              width: '10px',
              height: '10px',
              borderRadius: '100%',
              border: `2px solid green`,
            }}
          />
        </div>

        {/* Detalles del progreso */}
        <Stack
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            gap: 0.5,
            ml: 2.5,
          }}
        >
          <Typography fontWeight={400} fontSize="14px" lineHeight="22px" color="green">
            {`${currentImage + 1} of ${totalImages} files (${progress.toFixed(0)}%)`}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}
