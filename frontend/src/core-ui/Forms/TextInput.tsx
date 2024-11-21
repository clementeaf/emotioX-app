import { Box, TextField, Typography } from "@mui/material";

export function TextInput({ label, placeholder }: { label: string, placeholder: string }) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%', mt: 1 }}>
            <Typography fontSize={14} fontWeight={500} color="#8C8C8C" textTransform='initial'>
                {label}
            </Typography>
            {/* Input */}
            <TextField
                placeholder={placeholder}
                variant="outlined"
                fullWidth
                size="small"
                sx={{
                    '& .MuiInputBase-input::placeholder': { color: '#8C8C8C', fontSize: 14, fontWeight: 500, },
                }}
            />
        </Box>
    );
}