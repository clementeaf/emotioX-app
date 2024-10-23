import { useState } from 'react';
import { Stack, TextField, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

interface CustomInputProps {
  title: string;
  placeholder: string;
  isTextArea?: boolean;
  style?: React.CSSProperties;
}

export default function CustomInput({ title, placeholder, isTextArea = false, style = {} }: CustomInputProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const maxCharacters = 100;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= maxCharacters) {
      setInputValue(value);
    }
  };

  return (
    <Stack
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%',
        ...style,
      }}
    >
      <Typography fontWeight={400} fontSize={13} lineHeight="22px" color={grey[600]}>
        {title}
      </Typography>
      <TextField
        variant="outlined"
        sx={{ width: '100%', height: isTextArea ? '142px' : '', mt: 1, }}
        name="researchName"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        multiline={isTextArea}
        rows={isTextArea ? 4 : 1}
      />
      {isTextArea && (
          <Typography fontSize={12} color={grey[500]} p={0} sx={{ placeSelf: 'flex-end'}}>
            {inputValue.length} / {maxCharacters}
          </Typography>
      )}
    </Stack>
  );
}
