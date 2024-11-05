import { Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function SidebarHeader() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/dashboard');
  };
  return (
    <Stack
      onClick={handleClick}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        p: 2,
      }}
    >
      <Typography fontSize='24px' fontWeight={600} lineHeight='36px' align="center">
        😃
      </Typography>
      <Typography fontSize='24px' fontWeight={600} lineHeight='36px' align="center">
        EmotioX
      </Typography>
    </Stack>
  );
}
