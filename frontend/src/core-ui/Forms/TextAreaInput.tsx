import { Box, TextField, Typography } from "@mui/material";

interface TextAreaInputProps {
    label: string;
    placeholder: string;
    maxChars?: number; // Nuevo: Limite de caracteres opcional
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
    disabled?: boolean;
  }

  export function TextAreaInput({ label, placeholder, maxChars = 100, onChange, value, disabled }: TextAreaInputProps) {
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
          value={value}
          onChange={onChange}
          disabled={disabled}
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
          {`${value.length} / ${maxChars}`}
        </Typography>
      </Box>
    );
  }