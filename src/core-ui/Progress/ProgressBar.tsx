import { Box, LinearProgress } from '@mui/material';

export default function ProgressBar({value}: {value: number}) {
  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      <LinearProgress
        variant="determinate"
        value={value}
        sx={{
          height: 5,
          backgroundColor: '#E0E0E0',
          '& .MuiLinearProgress-bar': {
            backgroundColor: '#3f51b5',
          },
        }}
      />
    </Box>
  );
}
