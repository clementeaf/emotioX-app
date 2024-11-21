import React from 'react';
import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigationStore } from '../../store/useNavigationStore';

const StyledBottomNavigationAction = styled(BottomNavigationAction)<{ selected?: boolean }>(
  ({ selected }) => ({
    color: selected ? '#252BE6' : 'inherit',
    borderBottom: selected ? '2px solid #252BE6' : 'none',
  })
);

const NavBar: React.FC = () => {
  const { selectedScreen, setSelectedScreen } = useNavigationStore();

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
        sx={{ width: '100%' }}
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
