import React, { useState } from 'react';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';

interface FileData {
  name: string;
  time: number;
}

const initialFiles: FileData[] = [
  { name: 'Filename-01.png', time: 0 },
  { name: 'Filename-02.png', time: 0 },
  { name: 'Filename-03.png', time: 0 }
];

export const FileListTable: React.FC = () => {
  const [files, setFiles] = useState<FileData[]>(initialFiles);

  // Eliminar archivo
  const deleteFile = (index: number) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <TableContainer sx={{ border: '1px solid #E0E0E0', height: 'auto', borderRadius: 2, width: '482px' }}>
      <Table>
        <TableHead>
          <TableRow sx={{ height: 50, bgcolor: '#FAFAFA' }}>
            <TableCell sx={{ fontWeight: 'bold', fontSize: 14, width: '235px' }}>Name</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: 14, width: '150px' }}>Time</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: 14, width: '97px' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {files.map((file, index) => (
            <TableRow key={index} sx={{ height: 60 }}>
              {/* Nombre del archivo */}
              <TableCell>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography fontSize={14} fontWeight={400}>{file.name}</Typography>
                  <Typography
                    sx={{
                      fontSize: 12,
                      color: '#8C8C8C',
                      cursor: 'pointer',
                      '&:hover': { textDecoration: 'underline' }
                    }}
                  >
                    Edit hitzones
                  </Typography>
                </Box>
              </TableCell>

              {/* Control de tiempo */}
              <TableCell>
                <Typography fontSize={14} color="#8C8C8C">{file.time} Segs</Typography>
              </TableCell>

              {/* Acciones */}
              <TableCell>
                <Button
                  variant="text"
                  sx={{ color: 'red', textTransform: 'none' }}
                  onClick={() => deleteFile(index)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
