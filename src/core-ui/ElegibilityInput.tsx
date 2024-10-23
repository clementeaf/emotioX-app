import React from 'react';
import {
    Box,
    IconButton,
    MenuItem,
    Select,
    Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

// Lista de opciones de elegibilidad
const eligibilityOptions = ['Qualify', 'Disqualify'];

// Componente de elegibilidad
export function EligibilityInput() {
    const [eligibility, setEligibility] = React.useState<string[]>([
        'Qualify',
        'Disqualify',
        'Disqualify',
    ]);

    // Manejador para cambiar la opción de elegibilidad
    const handleChange = (index: number, value: string) => {
        const newEligibility = [...eligibility];
        newEligibility[index] = value;
        setEligibility(newEligibility);
    };

    // Manejador para eliminar la opción
    const handleDelete = (index: number) => {
        const newEligibility = eligibility.filter((_, i) => i !== index);
        setEligibility(newEligibility);
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '214px',
            ml: 4,
        }}>
            <Typography color='#8C8C8C' fontSize={14} fontWeight={400} lineHeight='22px'>
                Eligibility
            </Typography>

            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2.8,
                mt: 4,
            }}>
            {eligibility.map((option, index) => (
                <Box
                    key={index}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        height: '68px',
                        mx: 'auto',
                    }}
                >
                    {/* Select para opciones de elegibilidad */}
                    <Select
                        value={option}
                        onChange={(e) => handleChange(index, e.target.value as string)}
                        variant="outlined"
                        size="small"
                        sx={{ width: '150px', mr: 2, height: '100%' }}
                    >
                        {eligibilityOptions.map((opt, idx) => (
                            <MenuItem key={idx} value={opt}>
                                {opt}
                            </MenuItem>
                        ))}
                    </Select>

                    {/* Texto de eliminación */}
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{ mr: 1, height: 'auto', p: 0, m: 0 }}
                        textAlign='center'
                    >
                        Delete
                    </Typography>

                    {/* Botón de eliminación */}
                    <IconButton
                        color="error"
                        onClick={() => handleDelete(index)}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Box>
            ))}
            </Box>
        </Box>
    );
}
