import React from 'react';
import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import { styled } from '@mui/system';
import { useAIMFrameWorkNavigationStore } from '../../store/useAIMFrameWorkNavigationStore';

const StyledBottomNavigationAction = styled(BottomNavigationAction)<{ selected?: boolean }>(
  ({ selected }) => ({
    color: selected ? '#252BE6' : 'inherit',
    borderBottom: selected ? '2px solid #252BE6' : 'none',
  })
);

const NavBar: React.FC = () => {
  const { selectedScreen, setSelectedScreen } = useAIMFrameWorkNavigationStore();

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
        value={selectedScreen}
        onChange={(_, newValue) => {
          setSelectedScreen(newValue);
        }}
        showLabels
        sx={{ width: '250px' }}
      >
        <StyledBottomNavigationAction
          label="Build"
          selected={selectedScreen === 0}
        />
        <StyledBottomNavigationAction
          label="Recruit"
          selected={selectedScreen === 1}
        />
        <StyledBottomNavigationAction
          label="Results"
          selected={selectedScreen === 2}
        />
      </BottomNavigation>
    </Box>
  );
};

export default NavBar;
