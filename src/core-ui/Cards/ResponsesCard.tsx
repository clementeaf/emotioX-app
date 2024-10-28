import { Box, Typography, Stack, Avatar, CircularProgress } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

export const ResponsesCard = () => {
  return (
    <Box 
      sx={{ 
        p: 2, 
        border: '1px solid #e0e0e0', 
        bgcolor: 'blue', 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: 178,
        height: '235px'
      }}
    >
      {/* Título y ícono */}
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography sx={{ color: 'gray' }}>
          Responses
        </Typography>
        <Avatar sx={{ bgcolor: 'transparent', width: 24, height: 24 }}>
          <PersonOutlineIcon sx={{ color: 'gray' }} />
        </Avatar>
      </Stack>

      {/* Número de respuestas y tiempo */}
      <Stack direction="row" alignItems="flex-end" spacing={1} mt={1}>
        <Typography>
          28.635
        </Typography>
        <Typography sx={{ color: 'gray' }}>
          26s
        </Typography>
      </Stack>

      {/* Circular Progress con número */}
      <Box sx={{ position: 'relative', display: 'inline-flex', mt: 6 }}>
        <CircularProgress 
          variant="determinate" 
          value={53} 
          size={80} 
          thickness={5} 
          sx={{ color: 'blue', position: 'absolute', zIndex: 1 }}
        />
        <CircularProgress 
          variant="determinate" 
          value={100} 
          size={80} 
          thickness={5} 
          sx={{ color: '#f5f5f5' }}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            53
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
;

// Componente principal
export const ResponsesCardV2 = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 4,
        borderRadius: 4,
        background: 'linear-gradient(135deg, #3A86FF 0%, #073B99 100%)',
        width: 368,
        height: 139,
        color: '#fff',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Contenido de texto */}
      <Box sx={{ zIndex: 1 }}>
        <Typography variant="h6" sx={{ mb: 1, color: '#fff' }}>
          Responses shown
        </Typography>
        <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2, color: '#fff' }}>
          1251
        </Typography>
        <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#fff' }}>
          Closed collection
        </Typography>
      </Box>

      {/* Circular Progress para el gráfico radial */}
      <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 150, height: 150 }}>
        {/* Fondo gris */}
        <CircularProgress
          variant="determinate"
          value={100}
          size={150}
          thickness={3}
          sx={{ color: '#E0E0E0', position: 'absolute' }}
        />
        
        {/* Barra turquesa */}
        <CircularProgress
          variant="determinate"
          value={-11}
          size={150}
          thickness={3}
          sx={{ color: '#00CFFF', position: 'absolute' }}
        />

        {/* Texto superpuesto en el centro */}
        <Box
          sx={{
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#fff' }}>
            89%
          </Typography>
          <Typography variant="body2" sx={{ color: '#fff' }}>
            Valid
          </Typography>
        </Box>
      </Box>

      {/* Capa de fondo con degradado ondulado */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          clipPath: 'ellipse(150% 100% at 50% 100%)',
        }}
      />
    </Box>
  );
};