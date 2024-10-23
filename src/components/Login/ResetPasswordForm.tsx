import { useState } from 'react';
import { Box, Button, Stack, TextField, Typography, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import PasswordStrengthMeter from './PasswordStregthMeter';

export default function ResetPasswordForm({ onReset }: { onReset: () => void }) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <Box>
      <Typography component="h1" variant="h5" fontWeight="bold">
        Reset Password
      </Typography>
      <Typography variant="body2" mb={2} color="gray">
        Please consider the following conditions to create your new password:
      </Typography>
      <ul style={{ fontSize: '12px', marginBottom: '16px', color: 'gray' }}>
        <li><b>Letters.</b> Mix uppercase and lowercase versions.</li>
        <li><b>Numbers.</b> Use 0 to 10.</li>
        <li><b>Special characters.</b> Use symbols like dashes or dollar signs.</li>
      </ul>

      <Stack spacing={2}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Enter your password"
          type={showPassword ? 'text' : 'password'}
          id="new-password"
          placeholder="Min. 8 characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          slotProps={{
            inputLabel: { shrink: true },
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        {/* Barra de progreso */}
        <PasswordStrengthMeter password={password} />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="confirm-password"
          label="Confirm Password"
          type="password"
          id="confirm-password"
          placeholder="Confirm your password"
          slotProps={{ inputLabel: { shrink: true } }}
        />

        <Button fullWidth variant="contained" color="primary" onClick={onReset}>
          Reset Password
        </Button>
      </Stack>
    </Box>
  );
}
