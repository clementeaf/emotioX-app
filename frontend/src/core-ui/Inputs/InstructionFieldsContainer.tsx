import React from 'react';
import { Box, Typography, TextField } from '@mui/material';
import { grey } from '@mui/material/colors';
import { InstructionFieldsProps } from '../../types/types';

export function InstructionFieldsContainer({
  exerciseInstruction,
  testInstruction,
  onExerciseChange,
  onTestChange,
}: InstructionFieldsProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, width: '800px', alignItems: 'flex-start' }}>
      <InstructionField
        label={exerciseInstruction.title}
        placeholder={exerciseInstruction.placeHolder}
        maxChars={100}
        value={exerciseInstruction.textAreaData}
        onChange={onExerciseChange}
      />
      <InstructionField
        label={testInstruction.title}
        placeholder={testInstruction.placeHolder}
        maxChars={100}
        value={testInstruction.textAreaData}
        onChange={onTestChange}
      />
    </Box>
  );
}

type InstructionFieldProps = {
  label: string;
  placeholder: string;
  maxChars: number;
  value: string;
  onChange: (value: string) => void;
};

function InstructionField({ label, placeholder, maxChars, value, onChange }: InstructionFieldProps) {
  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = event.target.value;
    if (inputText.length <= maxChars) {
      onChange(inputText); // Llama al setter correspondiente
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: 800 }}>
      <Typography sx={{ fontSize: 14, fontWeight: 500, color: grey[900] }}>{label}</Typography>
      <TextField
        multiline
        minRows={4}
        maxRows={6}
        variant="outlined"
        placeholder={placeholder}
        value={value}
        onChange={handleTextChange}
        sx={{
          width: '100%',
          '& .MuiOutlinedInput-root': {
            padding: 1,
            '& textarea': {
              fontSize: 14,
              color: grey[700],
              opacity: 0.8,
            },
          },
        }}
      />
      <Typography sx={{ fontSize: 12, color: grey[500], placeSelf: 'flex-end' }}>
        {value.length} / {maxChars}
      </Typography>
    </Box>
  );
}
