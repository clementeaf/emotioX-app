import { Button, Menu, MenuItem, Box } from "@mui/material";
import { useState } from "react";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { usePublicStudyStepperStore } from "../../store/usePublicStudyStepperStore";

export default function CustomDropdown() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { setActiveStep } = usePublicStudyStepperStore();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const steps = [
    "Screener",
    "Welcome screen",
    "Implicit Association",
    "Cognitive task",
    "Eye Tracking",
    "Cognitive task",
    "Thank you screen",
  ];

  return (
    <Box>
      <Button
        onClick={handleClick}
        endIcon={<ArrowForwardIosIcon sx={{ color: 'white', height: '10px', fontWeight: 800 }} />}
        sx={{
          width: '256px',
          height: '44px',
          border: '1px solid white',
          borderRadius: '4px',
          color: 'white',
          backgroundColor: '#4A00E0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 3,
          textTransform: 'none',
          fontSize: '14px',
          fontWeight: 500,
        }}
      >
        Jump to section
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        slotProps={{
          paper: {
            sx: {
              width: '180px',
              height: '328px',
              mt: '4px',
              boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.2)',
              borderRadius: '4px',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
            },
          },
        }}
      >
        {steps.map((item, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              setActiveStep(index);  // Cambiar el paso activo
              handleClose();  // Cerrar el menú
            }}
            sx={{
              width: '180px',
              height: '40px',
              fontSize: '14px',
              fontWeight: 400,
              '&:hover': {
                backgroundColor: '#f0f0f0',
              },
            }}
          >
            {item}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
