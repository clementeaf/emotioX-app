import React, { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Typography,
  Paper,
} from '@mui/material';

// Datos de ejemplo
const rows = [
  { id: '8623t587245972498592', calibration: 'Good', integrity: 'Poor' },
  { id: '86723487237950935930', calibration: 'Good', integrity: 'Regular' },
  { id: 'o0284579823743586034', calibration: 'Good', integrity: 'Good' },
  { id: '03856708240592374587', calibration: 'Good', integrity: 'Good' },
];

// Estilo para el estado de calibración/integridad
const getStatusStyle = (status: string) => {
  switch (status) {
    case 'Good':
      return { backgroundColor: '#E8F5E9', color: '#4CAF50' };
    case 'Regular':
      return { backgroundColor: '#FFF3E0', color: '#FF9800' };
    case 'Poor':
      return { backgroundColor: '#FDECEA', color: '#F44336' };
    default:
      return {};
  }
};

// Componente principal
export const RespondentTable = () => {
  const [selectedRow, setSelectedRow] = useState<string | null>(null);

  // Manejador para seleccionar una fila
  const handleRowSelect = (id: string) => {
    setSelectedRow((prev) => (prev === id ? null : id));
  };

  return (
    <Box sx={{ maxWidth: 800, width: '100%' }}>
      <TableContainer component={Paper} sx={{ borderRadius: 1, overflow: 'hidden' }}>
        <Table>
          {/* Encabezado de la tabla */}
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox />
              </TableCell>
              <TableCell>
                <Typography variant="body2" fontWeight="bold">
                  Respondent ID
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" fontWeight="bold">
                  Calibr.
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" fontWeight="bold">
                  Integ.
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>

          {/* Cuerpo de la tabla */}
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                selected={selectedRow === row.id}
                onClick={() => handleRowSelect(row.id)}
                sx={{
                  cursor: 'pointer',
                  backgroundColor: selectedRow === row.id ? '#f5f5f5' : 'inherit',
                }}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedRow === row.id}
                    onChange={() => handleRowSelect(row.id)}
                    color="primary"
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{row.id}</Typography>
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      ...getStatusStyle(row.calibration),
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                      display: 'inline-block',
                    }}
                  >
                    <Typography variant="body2" fontWeight="bold">
                      {row.calibration}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      ...getStatusStyle(row.integrity),
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                      display: 'inline-block',
                    }}
                  >
                    <Typography variant="body2" fontWeight="bold">
                      {row.integrity}
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default RespondentTable;
