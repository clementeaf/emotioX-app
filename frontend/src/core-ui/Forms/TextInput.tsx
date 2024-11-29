import { Box, TextField, Typography } from "@mui/material";

interface TextInputProps {
    label: string;
    placeholder: string;
    value: string; // Propiedad value para el contenido del campo
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Evento para manejar cambios
    disabled?: boolean;
  }

export function TextInput({ label, placeholder, value, onChange, disabled }: TextInputProps) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%', mt: 1 }}>
            <Typography fontSize={14} fontWeight={500} color="#8C8C8C" textTransform='initial'>
                {label}
            </Typography>
            {/* Input */}
            <TextField
                placeholder={placeholder}
                variant="outlined"
                disabled={disabled}
                value={value}
                onChange={onChange} 
                fullWidth
                size="small"
                sx={{
                    '& .MuiInputBase-input::placeholder': { color: '#8C8C8C', fontSize: 14, fontWeight: 500, },
                }}
            />
        </Box>
    );
}