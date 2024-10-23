import React from 'react';
import { Box, Typography } from '@mui/material';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

const Header: React.FC = () => {
  return (
    <Box display="flex" alignItems="center" gap={1} padding={2}>
      <EmojiEmotionsIcon sx={{ color: '#FFCC00', fontSize: 40 }} />
      <Typography variant="h5" fontWeight="bold">
        Emotio <Typography component="span" fontWeight="light">X</Typography>
      </Typography>
    </Box>
  );
};

export default Header;
