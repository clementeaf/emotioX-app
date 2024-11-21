import { Box, Switch, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

export const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 36,
    height: 20,
    marginLeft: 20,
    marginRight: 10,
    padding: 0,
    display: 'flex',
    '&:active': {
      '& .MuiSwitch-thumb': {
        width: 18,
      },
      '& .MuiSwitch-switchBase.Mui-checked': {
        transform: 'translateX(16px)',
      },
    },
    '& .MuiSwitch-switchBase': {
      padding: 3,
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: '#004DFF',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
      width: 14,
      height: 14,
      borderRadius: 7,
      transition: theme.transitions.create(['width'], {
        duration: 200,
      }),
    },
    '& .MuiSwitch-track': {
      borderRadius: 10,
      opacity: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.25)',
      boxSizing: 'border-box',
    },
  }));

  export function EnableSwitch() {
    const [enabled, setEnabled] = useState<boolean>(false);
  
    const handleToggle = () => {
      setEnabled(!enabled);
    };
  
    return (
      <Box
        display="flex"
        alignItems="center"
        sx={{ width: '102px', height: '22px' }}
      >
        <Typography
          fontWeight={400}
          fontSize="14px"
          lineHeight="22px"
          color="#8C8C8C"
          sx={{ mr: 1 }}
        >
          Enable
        </Typography>
        <Switch
          checked={enabled}
          onChange={handleToggle}
          sx={{
            '& .MuiSwitch-switchBase.Mui-checked': {
              color: '#ffffff',
              '& + .MuiSwitch-track': {
                backgroundColor: '#1E3BF1',
              },
            },
          }}
        />
      </Box>
    );
  };