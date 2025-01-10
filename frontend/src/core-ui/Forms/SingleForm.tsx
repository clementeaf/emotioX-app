import React, { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    FormControlLabel,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@mui/material';
import { AntSwitch } from '../Switch';

interface SingleFormProps {
    question: string; // El texto de la pregunta
    isRequired?: boolean; // Si el campo es requerido
    showConditionally?: boolean; // Si se debe mostrar condicionalmente
    placeholder?: string; // Placeholder del input
    fileUploadLabel?: string; // Texto para la subida de archivo
    deviceFrameOptions?: string[]; // Opciones para el marco del dispositivo
}

export const SingleForm: React.FC<SingleFormProps> = ({
    question,
    isRequired = false,
    showConditionally = true,
    placeholder = 'Ask something',
    fileUploadLabel = 'Click to Upload',
    deviceFrameOptions = ['No Frame', 'Device Frame'],
}) => {
    const [isVisible, setIsVisible] = useState(showConditionally);
    const [selectedFrame, setSelectedFrame] = useState(deviceFrameOptions[0]);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setUploadedFile(event.target.files[0]);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                width: '100%',
                maxWidth: 844,
                margin: 'auto',
                mt: 4,
            }}
        >
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                px: 2,
            }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    {/* Título de la pregunta */}
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {question}
                    </Typography>

                    {/* Condicionalidad */}
                    <FormControlLabel
                        sx={{ mr: 1 }}
                        control={
                            <AntSwitch
                                checked={isRequired}
                                onChange={() => { }}
                            />
                        }
                        label={
                            <Typography fontSize="14px" fontWeight={400} color="#8C8C8C">
                                Show Conditionality
                            </Typography>
                        }
                        labelPlacement="start"
                    />
                </Box>

                {isVisible && (
                    <Box>
                        {/* Campo de texto */}
                        <Box sx={{
                            display: 'flex',
                            gap: 2,
                            alignItems: 'center',
                            my: 2,
                        }}>
                            <TextField
                                sx={{
                                    width: 504,
                                }}
                                variant="outlined"
                                label={placeholder}
                                required={isRequired}
                            />
                            <Select
                                value='Single choice'
                                onChange={() => { }}
                                sx={{ height: 55.5 }}
                            >
                                <MenuItem value="Single choice">Single choice</MenuItem>
                            </Select>
                            <FormControlLabel
                                sx={{ mr: 1 }}
                                control={
                                    <AntSwitch
                                        checked={isRequired}
                                        onChange={() => { }}
                                    />
                                }
                                label={
                                    <Typography fontSize="14px" fontWeight={400} color="#8C8C8C">
                                        Required
                                    </Typography>
                                }
                                labelPlacement="start"
                            />
                        </Box>

                        {/* Campo de subida de archivo */}
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'start',
                                gap: 2,
                                p: 2,
                                border: '1px solid #aaa',
                                width: '100%',
                                maxWidth: 775,
                                height: 104,
                                bgcolor: '#e9f0fc',
                            }}
                        >
                            <Typography>
                                <strong>{isRequired ? '*' : ''} Upload (optional):</strong>
                            </Typography>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                                <Box sx={{
                                    height: '100%',
                                    maxHeight: 40,
                                    width: '100%',
                                    maxWidth: 148,
                                    backgroundColor: 'white',
                                    border: '1px solid lightgray',
                                    borderRadius: 1.5,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Button
                                        variant='text'
                                        component="label"
                                        sx={{ textTransform: 'none', color: 'black' }}
                                    >
                                        {fileUploadLabel}
                                        <input
                                            type="file"
                                            hidden
                                            onChange={handleFileUpload}
                                        />
                                    </Button>
                                </Box>
                                {uploadedFile && (
                                    <Typography
                                        variant="body2"
                                        sx={{ color: 'green', mt: 1 }}
                                    >
                                        File uploaded: {uploadedFile.name}
                                    </Typography>
                                )}
                                <Typography variant="caption" sx={{ color: '#555', fontSize: 14, }}>
                                    Recommended resolution is 1000x1000px with file size
                                </Typography>
                            </Box>
                            {/* Selección de marco del dispositivo */}
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                            }}>
                            <Typography >Device Frame</Typography>
                            <FormControl>
                                <Select
                                    value={selectedFrame}
                                    onChange={(e) => setSelectedFrame(e.target.value)}
                                    sx={{
                                        backgroundColor: 'white',
                                    }}
                                >
                                    {deviceFrameOptions.map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            </Box>
                        </Box>
                    </Box>
                )}
            </Box>
            <div style={{
                width: 800,
                height: 1,
                backgroundColor: 'lightgray',
                marginLeft: 20,
                marginTop: 30
            }}/>
        </Box>
    );
};
