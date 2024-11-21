import { Box, Typography, LinearProgress, Avatar, Tooltip, IconButton } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export const ProjectCard = () => {
  const progressValue = 85; // Valor de la barra de progreso
  const cognitiveScore = 56.0; // Puntaje cognitivo
  const implicitScore = 'N/A'; // Puntaje implícito

  return (
    <Box
      sx={{
        border: '1px solid #E0E0E0',
        borderRadius: 2,
        p: 2,
        maxWidth: 300,
        bgcolor: '#fff',
      }}
    >
      {/* Avatar e Información del Proyecto */}
      <Box display="flex" alignItems="center" mb={1}>
        <Avatar sx={{ width: 40, height: 40, bgcolor: '#F5F5F5', mr: 2 }}>
          <Typography variant="body2" color="textSecondary">
            <i className="fas fa-user" />
          </Typography>
        </Avatar>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Project #001
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Visual Attractiveness
          </Typography>
        </Box>
      </Box>

      {/* Barra de Progreso */}
      <Box display="flex" alignItems="center" my={2}>
        <LinearProgress
          variant="determinate"
          value={progressValue}
          sx={{
            height: 8,
            borderRadius: 5,
            flexGrow: 1,
            mr: 1,
            bgcolor: '#E0E0E0',
            '& .MuiLinearProgress-bar': {
              bgcolor: '#1E1EFF',
            },
          }}
        />
        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
          {progressValue}%
        </Typography>
      </Box>

      {/* Opción e Información */}
      <Box display="flex" alignItems="center" mb={1}>
        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
          Option #2 - Route #1
        </Typography>
        <Tooltip title="Information about the option">
          <IconButton size="small" sx={{ ml: 0.5 }}>
            <InfoOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Puntajes Cognitivo e Implícito */}
      <Box display="flex" justifyContent="space-between">
        <Typography variant="body2" color="textSecondary">
          Cognitive <strong>{cognitiveScore}%</strong>
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Implicit <strong>{implicitScore}</strong>
        </Typography>
      </Box>
    </Box>
  );
};

