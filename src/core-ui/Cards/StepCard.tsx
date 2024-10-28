import { Box, Button, Typography, LinearProgress, Avatar } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import stepCard from '../../assets/stepCard.png';

// Datos de ejemplo
const stepData = {
  stepNumber: 1,
  duration: 15,
  completion: 70,
  users: 47,
  imageUrl: stepCard,
};

export const StepCard = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: 2,
        borderRadius: 2,
        border: '1px solid #e0e0e0',
        width: 800,
        height: 100,
        maxWidth: '800px',
        bgcolor: 'white',
      }}
    >
      {/* Imagen */}
      <Avatar
        variant="rounded"
        src={stepData.imageUrl}
        alt="Step Image"
        sx={{ width: 70, height: 70, marginRight: 2, border: '1px solid #e0e0e0' }}
      />

      {/* Información del paso */}
      <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography fontSize={16} fontWeight={500} color="#9DA9D7">
          Step
        </Typography>
        <Typography fontSize={20} fontWeight={600} color="#262626">
          {stepData.stepNumber}
        </Typography>

        {/* Barra de progreso */}
        <Box sx={{ flexGrow: 1, mx: 2 }}>
          <LinearProgress
            variant="determinate"
            value={stepData.completion}
            sx={{
              height: 10,
              borderRadius: 5,
              backgroundColor: '#E0E7FF',
              '& .MuiLinearProgress-bar': {
                backgroundColor: '#4A3AFF',
                borderRadius: 5,
              },
            }}
          />
        </Box>

        {/* Duración */}
        <Typography fontSize={16} fontWeight={500} color="#9DA9D7">
          {stepData.duration}s
        </Typography>

        {/* Porcentaje de finalización */}
        <Typography fontSize={16} fontWeight={500} color="#4A3AFF">
          {stepData.completion}%
        </Typography>

        {/* Número de usuarios */}
        <Box display="flex" alignItems="center" gap={0.5} ml={1}>
          <GroupIcon fontSize="small" sx={{ color: '#9DA9D7' }} />
          <Typography fontSize={16} fontWeight={500} color="#9DA9D7">
            {stepData.users}
          </Typography>
        </Box>
      </Box>

      {/* Botón de detalles */}
      <Button
        variant="contained"
        sx={{
          backgroundColor: '#4A83FF',
          color: '#FFFFFF',
          textTransform: 'none',
          borderRadius: 3,
          padding: '6px 16px',
          fontWeight: 500,
          fontSize: 16,
          ml: 3,
          '&:hover': { backgroundColor: '#3B73E1' },
        }}
      >
        Show details
      </Button>
    </Box>
  );
};

export default StepCard;
