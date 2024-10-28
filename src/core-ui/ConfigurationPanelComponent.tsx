import { useState } from 'react';
import { Box, Typography, Stack } from '@mui/material';

// Datos para cada grupo de opciones
const settingsData = [
    {
        title: 'Analysis windows (in seconds)',
        options: ['5 Secs', '10 Secs', '15 Secs'],
    },
    {
        title: 'Minimum frame fixation',
        options: ['2', '3', '4', '5', '6'],
    },
    {
        title: 'Maximum frame fixation',
        options: ['10', '15', '20', '25'],
    },
    {
        title: 'Fixations merge range',
        options: ['0', '5', '10', '15', '20'],
    },
    {
        title: 'Blur radius',
        options: ['2', '4', '6', '8', '10'],
    },
    {
        title: 'Mask opacity',
        options: ['20%', '40%', '60%', '80%'],
    },
    {
        title: 'Threshold',
        options: ['20%', '40%', '60%', '80%'],
    },
];

// Componente de opciones
const OptionsGroup = ({ title, options, selected, onSelect }: {
    title: string;
    options: string[];
    selected: string;
    onSelect: (option: string) => void;
}) => (
    <Box sx={{ mb: 3, width: 240 }}>
        <Typography variant="body2" sx={{ mb: 1, fontWeight: 'bold' }}>
            {title}
        </Typography>
        <Stack direction="row" width='100%'>
            {options.map((option) => (
                <Box
                    key={option}
                    component="button"
                    onClick={() => onSelect(option)}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        height: 40,
                        fontWeight: 'medium',
                        fontSize: 12,
                        cursor: 'pointer',
                        color: selected === option ? '#3A86FF' : '#000',
                        bgcolor: selected === option ? '#fff' : 'white',
                        border: `1px solid ${selected === option ? '#3A86FF' : 'lightgray'}`,
                        '&:hover': {
                            bgcolor: selected === option ? '#f0f0f0' : '#e0e0e0',
                        },
                        // Estilo para remover los estilos de botón nativo
                        outline: 'none',
                        padding: 2,
                        margin: 0,
                        appearance: 'none',
                    }}
                >
                    {option}
                </Box>
            ))}
        </Stack>
    </Box>
);

// Componente principal
export const ConfigurationPanelComponent = () => {
    const [selectedOptions, setSelectedOptions] = useState(
        settingsData.reduce((acc, setting) => {
            acc[setting.title] = setting.options[0]; // Seleccionar la primera opción por defecto
            return acc;
        }, {} as { [key: string]: string })
    );

    const handleSelect = (title: string, option: string) => {
        setSelectedOptions((prevState) => ({
            ...prevState,
            [title]: option,
        }));
    };

    return (
        <Box sx={{ p: 3, maxWidth: 400, border: '1px solid #e0e0e0', borderRadius: 2, bgcolor: 'white' }}>
            {settingsData.map((setting) => (
                <OptionsGroup
                    key={setting.title}
                    title={setting.title}
                    options={setting.options}
                    selected={selectedOptions[setting.title]}
                    onSelect={(option) => handleSelect(setting.title, option)}
                />
            ))}
        </Box>
    );
};
