import { Box, Typography } from '@mui/material';

const GradientBar = () => {
  return (
    <Box sx={{ width: '100%', maxWidth: 600, mt: 2 }}>
      {/* Título */}
      <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
        Atención promedio
      </Typography>

      {/* Barra de gradiente */}
      <Box
        sx={{
          width: '100%',
          height: 20,
          background: 'linear-gradient(to right, red, orange, yellow, lime, green, cyan, blue, purple)',
          border: '1px solid black',
          borderRadius: 1,
          position: 'relative',
        }}
      >
        {/* Línea negra en el centro */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: 2,
            backgroundColor: 'black',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        />
      </Box>
    </Box>
  );
};

export default GradientBar;
