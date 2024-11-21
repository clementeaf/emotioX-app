import React from 'react';
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';

interface FileTestSectionProps {
  deviceFrame: string;
  setDeviceFrame: (value: string) => void;
}

export const FileTestSection: React.FC<FileTestSectionProps> = ({
  deviceFrame,
  setDeviceFrame,
}) => {
  // Manejo del cambio en el selector de "Device Frame"
  const handleDeviceFrameChange = (event: SelectChangeEvent<string>) => {
    setDeviceFrame(event.target.value);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, mb: 2, px: 2 }}>
      {/* Sección de descripción de archivos */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        <Typography variant="subtitle1" fontWeight="bold">
          Files to test
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Please, upload the image or video to be tested with eye tracking.
        </Typography>
      </Box>

      {/* Selector de "Device Frame" */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="body2">
          Device Frame
        </Typography>
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <Select
            value={deviceFrame}
            onChange={handleDeviceFrameChange}
            displayEmpty
            sx={{
              bgcolor: 'white',
              borderRadius: 1,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#D0D5DD',
              },
            }}
          >
            <MenuItem value="No Frame">No Frame</MenuItem>
            <MenuItem value="iPhone 12">iPhone 12</MenuItem>
            <MenuItem value="Samsung S21">Samsung S21</MenuItem>
            <MenuItem value="Desktop">Desktop</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};
