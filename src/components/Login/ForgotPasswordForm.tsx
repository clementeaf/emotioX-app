import { Box, Button, Stack, TextField, Typography } from '@mui/material';

interface ForgotPasswordFormProps {
  onSubmit: () => void;
  emailSent?: boolean; // Condición para verificar si ya se envió el correo
}

export default function ForgotPasswordForm({ onSubmit, emailSent }: ForgotPasswordFormProps) {
  return (
    <Box>
      {emailSent ? (
        <>
          <Typography component="h1" variant="h5" fontWeight="bold">
            Hi, Check Your Mail
          </Typography>
          <Typography textAlign="center" variant="body1" mb={2}>
            We have sent password recovery instructions to your email.
          </Typography>
          <Button fullWidth variant="contained" color="primary" onClick={onSubmit}>
            Back to Sign In
          </Button>
        </>
      ) : (
        <>
          <Typography component="h1" variant="h5" fontWeight="bold">
            Forgot Password?
          </Typography>
          <Stack spacing={2}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              placeholder="Enter your email"
            />
            <Button fullWidth variant="contained" color="primary" onClick={onSubmit}>
              Submit
            </Button>
          </Stack>
        </>
      )}
    </Box>
  );
}
