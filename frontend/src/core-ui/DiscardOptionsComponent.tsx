import { useState } from 'react';
import { Box, Typography, Stack } from '@mui/material';

// Lista de opciones de descarte
const discardOptions = [
  'Poor calibration',
  'Poor integrity',
  'Regular calibration',
  'Regular integrity',
];

// Componente principal
export const DiscardOptionsComponent = () => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <Box sx={{ maxWidth: 240, maxHeight: 287 }}>
      {/* Título */}
      <Typography sx={{ py: 1, fontWeight: 'bold', fontSize: 14, color: '#262626' }}>
        Discard ID’s by:
      </Typography>

      {/* Opciones de descarte */}
      <Stack spacing={2}>
        {discardOptions.map((option) => (
          <Box
            key={option}
            component="button"
            onClick={() => setSelected(option)}
            sx={{
              width: 'fit-content',
              height: 40,
              borderRadius: '4px',
              fontWeight: 'light',
              fontSize: '16px',
              color: '#fff',
              bgcolor: '#4ABFFF',
              border: 'none',
              cursor: 'pointer',
              transition: '0.3s',
              textAlign: 'center',
              outline: 'none',
              ...(selected === option && {
                bgcolor: '#3A86FF',
              }),
              '&:hover': {
                bgcolor: '#3A86FF',
              },
            }}
          >
            {option}
          </Box>
        ))}

        {/* Botón de guardar cambios */}
        <Box
          component="button"
          onClick={() => alert('Changes saved')}
          sx={{
            width: 'auto',
            padding: '12px 24px',
            borderRadius: '4px',
            fontWeight: 'light',
            fontSize: '16px',
            color: '#fff',
            bgcolor: '#3A86FF',
            border: 'none',
            cursor: 'pointer',
            transition: '0.3s',
            textAlign: 'center',
            outline: 'none',
            '&:hover': {
              bgcolor: '#0047AB',
            },
          }}
        >
          Save changes
        </Box>
      </Stack>
    </Box>
  );
};

export default DiscardOptionsComponent;
