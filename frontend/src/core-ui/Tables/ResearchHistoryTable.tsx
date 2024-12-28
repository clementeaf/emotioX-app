import {
  Box,
  Button,
  IconButton,
  LinearProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { Comment, Delete, FlashOn } from '@mui/icons-material';

// Datos de ejemplo para la tabla
const rows = [
  {
    name: 'App MiUDD',
    status: 'Rejected',
    progress: 85,
    date: '18/04/2024',
    researcher: 'Alexis Brantes',
  },
  {
    name: 'Sitio Web de estudiantes LMS',
    status: 'Pending',
    progress: 92,
    date: '18/05/2024',
    researcher: 'Lana Babii',
  },
  {
    name: 'Nueva lata económica',
    status: 'Approved',
    progress: 75,
    date: '20/05/2024',
    researcher: 'Natalia Gajardo',
  },
  {
    name: 'Curso Design for all',
    status: 'Approved',
    progress: 63,
    date: '12/06/2024',
    researcher: 'José Brantes',
  },
];

export function ResearchHistoryTable() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '1135px',
        height: '350px',
        gap: 2,
        bgcolor: 'white',
        border: `1px solid ${grey[200]}`,
        borderRadius: '8px',
        pb: 3
      }}
    >
      <Stack sx={{
        bgcolor: '#FAFAFA',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 3,
        mt: 2,
      }}>
        <Typography
          fontWeight={500}
          fontSize={16}
          lineHeight="24px"
          color="#262626"
        >
          List of research
        </Typography>
        <Button sx={{
          
        }}
        >
          <Typography>...</Typography>
        </Button>
      </Stack>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          p: 3,
        }}
      >
        <TableContainer component={Paper} sx={{ maxHeight: '260px' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell><b>Research's name</b></TableCell>
                <TableCell><b>Name</b></TableCell>
                <TableCell><b>Status</b></TableCell>
                <TableCell><b>Progress</b></TableCell>
                <TableCell><b>Date</b></TableCell>
                <TableCell><b>Researcher</b></TableCell>
                <TableCell><b>Actions</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    height: '50px',
                    '&:last-child td, &:last-child th': { border: 0 },
                  }}
                >
                  <TableCell sx={{ fontSize: '12px', width: '200px' }}>
                    {row.name}
                  </TableCell>

                  <TableCell sx={{ fontSize: '12px', width: '180px' }}>
                    Universidad del Desarrollo {/* Nombre genérico */}
                  </TableCell>

                  <TableCell sx={{ fontSize: '12px', padding: '6px 16px' }}>
                    <Typography
                      variant="body2"
                      sx={{
                        padding: '4px 8px',
                        backgroundColor:
                          row.status === 'Rejected'
                            ? '#ffebee'
                            : row.status === 'Pending'
                              ? '#fff8e1'
                              : '#e8f5e9',
                        borderRadius: '4px',
                        color:
                          row.status === 'Rejected'
                            ? '#d32f2f'
                            : row.status === 'Pending'
                              ? '#ffa000'
                              : '#388e3c',
                        fontWeight: 500,
                        textAlign: 'center',
                      }}
                    >
                      {row.status}
                    </Typography>
                  </TableCell>

                  <TableCell sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={row.progress}
                      sx={{ height: 6, borderRadius: 5, width: '80px' }}
                    />
                    <Typography
                      variant="body2"
                      sx={{ fontSize: '12px', width: '27px' }}
                    >
                      {`${row.progress}%`}
                    </Typography>
                  </TableCell>

                  <TableCell sx={{ fontSize: '12px', padding: '6px 16px' }}>
                    {row.date}
                  </TableCell>

                  <TableCell sx={{ fontSize: '12px', padding: '6px 16px' }}>
                    {row.researcher}
                  </TableCell>

                  <TableCell sx={{ padding: '6px 16px' }}>
                    <IconButton size="small" color="primary" sx={{ width: '20px' }}>
                      <FlashOn />
                    </IconButton>
                    <IconButton size="small" color="primary" sx={{ width: '20px' }}>
                      <Comment />
                    </IconButton>
                    <IconButton size="small" color="error" sx={{ width: '20px' }}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
