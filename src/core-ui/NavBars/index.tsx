import React, { useState } from 'react';
import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import { styled } from '@mui/system';

const StyledBottomNavigationAction = styled(BottomNavigationAction)<{ selected?: boolean }>(
  ({ selected }) => ({
    color: selected ? '#252BE6' : 'inherit',
    borderBottom: selected ? '2px solid #252BE6' : 'none',
  })
);

const NavBar: React.FC = () => {
  const [value, setValue] = useState<number>(0);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        borderBottom: '1px solid #e0e0e0',
      }}
    >
      <BottomNavigation
        value={value}
        onChange={(_, newValue) => {
          setValue(newValue);
        }}
        showLabels
        sx={{ width: '250px' }}
      >
        <StyledBottomNavigationAction
          label="Build"
          selected={value === 0}
        />
        <StyledBottomNavigationAction
          label="Recruit"
          selected={value === 1}
        />
        <StyledBottomNavigationAction
          label="Results"
          selected={value === 2}
        />
      </BottomNavigation>
    </Box>
  );
};

export default NavBar;
