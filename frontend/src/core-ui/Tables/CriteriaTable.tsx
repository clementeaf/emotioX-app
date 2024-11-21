import { useState } from 'react';
import {
    Box,
    Button,
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

// Datos de ejemplo
const initialRows = [
    { id: 1, order: '01', attribute: 'Attribute' },
    { id: 2, order: '02', attribute: 'Attribute' },
    { id: 3, order: '03', attribute: 'Attribute' },
    { id: 4, order: '04', attribute: 'Attribute' },
];

// Componente principal
export const CriteriaTable = () => {
    const [selectedTime, setSelectedTime] = useState(400);
    const [showResults, setShowResults] = useState(false);

    // Manejar la selección de la opción de tiempo
    const handleTimeSelect = (time: number) => {
        setSelectedTime(time);
    };

    return (
        <Box sx={{ p: 3, width: 800, borderRadius: 2, bgcolor: 'white' }}>
            {/* Opciones de tiempo */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: 800, height: 446, border: '1px solid #e0e0e0', borderRadius: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
                    <Typography >
                        Criteria
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ color: '#6c757d' }}>
                            Priming display time:
                        </Typography>
                        {[300, 400, 500].map((time) => (
                            <Button
                                key={time}
                                variant={selectedTime === time ? 'contained' : 'outlined'}
                                size="small"
                                color={selectedTime === time ? 'primary' : 'inherit'}
                                onClick={() => handleTimeSelect(time)}
                                sx={{
                                    minWidth: 50,
                                    height: 30,
                                    mr: 1,
                                    bgcolor: selectedTime === time ? '#4A3AFF' : 'inherit',
                                    color: selectedTime === time ? '#fff' : '#6c757d',
                                    borderColor: selectedTime === time ? '#4A3AFF' : '#e0e0e0',
                                    textTransform: 'none',
                                }}
                            >
                                {time} ms
                            </Button>
                        ))}
                    </Box>
                </Box>

                {/* Tabla */}
                <TableContainer >
                    <Table aria-label="criteria table">
                        <TableHead>
                            <TableRow sx={{ bgcolor: '#f9f9f9', borderTop: '1px solid #e0e0e0' }}>
                                <TableCell sx={{ fontWeight: 600 }}>Order</TableCell>
                                <TableCell sx={{ fontWeight: 600,  }}>Attribute name</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {initialRows.map((row) => (
                                <TableRow key={row.id} hover>
                                    <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                                        <DragIndicatorIcon sx={{ color: '#b0b0b0', mr: 1 }} />
                                        {row.order}
                                    </TableCell>
                                    <TableCell>{row.attribute}</TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Typography
                                            variant="body2"
                                            color="primary"
                                            sx={{ cursor: 'pointer', display: 'inline-block' }}
                                        >
                                            Image
                                        </Typography>
                                        <div style={{ width: 1, height: 20, backgroundColor: 'black', marginRight: 15, marginLeft: 15 }} />
                                        <Typography
                                            variant="body2"
                                            color="error"
                                            sx={{ cursor: 'pointer', display: 'inline-block' }}
                                        >
                                            Delete
                                        </Typography>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Checkbox de mostrar resultados */}
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                    <Checkbox
                        checked={showResults}
                        onChange={() => setShowResults(!showResults)}
                        size="small"
                    />
                    <Typography variant="body2" sx={{ color: '#6c757d' }}>
                        Show results to respondents
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default CriteriaTable;
