import { Box, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', mt: 4, textAlign: 'center', color: 'gray', fontSize: '12px', width: '220px', gap: 2, ml: 3, pb: 2, }}>
      <Typography variant="body2" width='160px' textAlign='left'><b>© 2017 - 2024 EmotioX.</b> All Rights Reserved.</Typography>
      <Typography variant="body2" width='175px' textAlign='left'>Made with love & liberty by UserEmotion Oü</Typography>
    </Box>
  );
}
