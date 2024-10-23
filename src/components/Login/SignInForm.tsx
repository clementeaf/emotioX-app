import { Button, Stack, TextField, Typography, Link, FormControlLabel, Checkbox } from '@mui/material';

interface SignInFormProps {
  onForgotPassword: () => void;
}

export default function SignInForm({ onForgotPassword }: SignInFormProps) {
  return (
    <Stack spacing={2}>
      <Typography component="h1" variant="h5" fontWeight="bold">
        Sign In
      </Typography>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        placeholder="email@usermotion.com"
        name="email"
        autoComplete="email"
        autoFocus
        slotProps={{ inputLabel: { shrink: true } }}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        placeholder="Min. 8 characters"
        slotProps={{ inputLabel: { shrink: true } }}
      />
      <FormControlLabel control={<Checkbox />} label="Keep me logged in" />

      <Button type="submit" fullWidth variant="contained" color="primary">
        Sign in
      </Button>

      <Link onClick={onForgotPassword} style={{ cursor: 'pointer' }}>
        Forgot password?
      </Link>
    </Stack>
  );
}
