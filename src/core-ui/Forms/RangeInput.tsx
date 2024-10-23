import React from 'react';
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';

interface RangeInputProps {
  startValue: number;
  endValue: number;
  startLabel: string;
  endLabel: string;
  onStartValueChange: (value: number) => void;
  onEndValueChange: (value: number) => void;
  onStartLabelChange: (value: string) => void;
  onEndLabelChange: (value: string) => void;
}

export const RangeInput: React.FC<RangeInputProps> = ({
  startValue,
  endValue,
  startLabel,
  endLabel,
  onStartValueChange,
  onEndValueChange,
  onStartLabelChange,
  onEndLabelChange,
}) => {
  // Manejo de cambio para los valores seleccionados
  const handleStartValueChange = (event: SelectChangeEvent<number>) => {
    onStartValueChange(parseInt(event.target.value as string, 10));
  };

  const handleEndValueChange = (event: SelectChangeEvent<number>) => {
    onEndValueChange(parseInt(event.target.value as string, 10));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, px: 2 }}>
      {/* Campo de valor inicial */}
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2, width: '100%', justifyContent: 'flex-start' }}>
        <Box sx={{ width: '128px', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Typography variant="body2" width='180px' mr={1}>Start value</Typography>
          <FormControl fullWidth size="small">
            <Select
              value={startValue}
              onChange={handleStartValueChange}
              displayEmpty
              sx={{ bgcolor: 'white', borderRadius: 1, width: 60 }}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <TextField
          placeholder="Start label (optional)"
          value={startLabel}
          onChange={(e) => onStartLabelChange(e.target.value)}
          sx={{ width: '100%' }}
          fullWidth
        />
      </Box>

      {/* Campo de valor final */}
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2, width: '100%', justifyContent: 'flex-start' }}>
        <Box sx={{ width: '127px', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Typography variant="body2" width='180px' mr={1}>End value</Typography>
          <FormControl fullWidth size="small">
            <Select
              value={endValue}
              onChange={handleEndValueChange}
              displayEmpty
              sx={{ bgcolor: 'white', borderRadius: 1, width: 60}}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <TextField
          placeholder="Start label (optional)"
          value={endLabel}
          onChange={(e) => onEndLabelChange(e.target.value)}
          sx={{ width: '100%' }}
          fullWidth
        />
      </Box>
  
    </Box>
  );
};
