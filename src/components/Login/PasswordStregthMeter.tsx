import { LinearProgress, Typography, Stack } from '@mui/material';

const MAX_PASSWORD_LENGTH = 20;

function calculatePasswordStrength(password: string) {
  let strength = 0;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[^A-Za-z0-9]/.test(password)) strength += 1;
  const lengthBonus = Math.min((password.length / MAX_PASSWORD_LENGTH) * 3, 3);
  strength += lengthBonus;
  return strength;
}

function getStrengthLabel(strength: number) {
  if (strength <= 1) return { label: 'Poor', color: 'red' };
  if (strength <= 3) return { label: 'Medium', color: 'orange' };
  return { label: 'Strong', color: 'green' };
}

export default function PasswordStrengthMeter({ password }: { password: string }) {
  const strength = calculatePasswordStrength(password);
  const { label, color } = getStrengthLabel(strength);
  const progressValue = password.length === 0 ? 10 : Math.min((strength / 5) * 100, 100);

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <LinearProgress
        variant="determinate"
        value={progressValue}
        sx={{
          width: '100%',
          maxWidth: 100,
          height: 15,
          backgroundColor: '#e0e0df',
          '& .MuiLinearProgress-bar': { backgroundColor: color },
        }}
      />
      <Typography variant="body2" color={color}>
        {label}
      </Typography>
    </Stack>
  );
}
