import { Box, TextField, Typography } from "@mui/material";
import { useState } from "react";

interface TextAreaInputProps {
    label: string;
    placeholder: string;
    maxChars?: number; // Nuevo: Limite de caracteres opcional
  }

  export function TextAreaInput({ label, placeholder, maxChars = 100 }: TextAreaInputProps) {
    const [text, setText] = useState<string>('');
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (event.target.value.length <= maxChars) {
        setText(event.target.value);
      }
    };
  
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%', mt: 3 }}>
        <Typography fontSize={14} fontWeight={500} color="#8C8C8C" textTransform="initial">
          {label}
        </Typography>
        <TextField
          placeholder={placeholder}
          variant="outlined"
          fullWidth
          size="small"
          multiline
          minRows={4}
          value={text}
          onChange={handleChange}
          sx={{
            '& .MuiInputBase-input::placeholder': {
              color: '#8C8C8C',
              fontSize: 14,
              fontWeight: 500,
            },
          }}
        />
        {/* Contador de caracteres */}
        <Typography fontSize={12} color="#8C8C8C" align="right" mr={2}>
          {`${text.length} / ${maxChars}`}
        </Typography>
      </Box>
    );
  }