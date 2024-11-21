import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Typography variant="h1" fontWeight={600} color="primary">
        404
      </Typography>
      <Typography variant="h5" color="textSecondary" mt={2}>
        Page Not Found
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 4 }}
        onClick={goToDashboard}
      >
        Go to Dashboard
      </Button>
    </Box>
  );
}
