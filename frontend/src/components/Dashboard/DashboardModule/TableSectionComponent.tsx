import { Box, IconButton, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { getStatusChip, isRTCStatsType, mapRTCStatsToStatusType, rows } from "./tableProperties";
import { Comment, Delete, FlashOn } from "@mui/icons-material";

export function TableSectionComponent() {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      width: '733px',
      gap: 2,
    }}>
      <Typography fontWeight={500} fontSize={16} lineHeight='24px' color='#262626'>Dashboard</Typography>
      
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '733px',
        height: 'auto',
        bgcolor: 'white',
        border: `1px solid ${grey[200]}`,
        borderRadius: '4px',
      }}>
        {/* Tabla */}
        <TableContainer component={Paper} sx={{ maxHeight: 'none', height: 'auto' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell><b>Name</b></TableCell>
                <TableCell><b>Status</b></TableCell>
                <TableCell><b>Date</b></TableCell>
                <TableCell><b>Progress</b></TableCell>
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
                    '&:last-child td, &:last-child th': { border: 0 },  // Quita el borde de la última fila
                  }}
                >
                  <TableCell sx={{ fontSize: '12px', width: '180px' }}>
                    {row.name}
                  </TableCell>

                  <TableCell sx={{ padding: '6px 16px' }}>
                    {isRTCStatsType(row.status)
                      ? getStatusChip(mapRTCStatsToStatusType(row.status))
                      : getStatusChip('Pending')}
                  </TableCell>

                  <TableCell sx={{ fontSize: '12px', padding: '6px 16px' }}>{row.date}</TableCell>

                  <TableCell sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row', gap: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={row.progress}
                      sx={{ height: 6, borderRadius: 5, width: '35px' }}
                    />
                    <Typography
                      variant="body2"
                      sx={{ fontSize: '12px', width: '27px' }}
                    >
                      {`${row.progress}%`}
                    </Typography>
                  </TableCell>

                  <TableCell sx={{ fontSize: '12px', padding: '6px 16px' }}>{row.researcher}</TableCell>

                  <TableCell sx={{ padding: '6px 16px' }}>
                    <IconButton size="small" color="primary" sx={{ width: '20px' }}><FlashOn /></IconButton>
                    <IconButton size="small" color="primary" sx={{ width: '20px' }}><Comment /></IconButton>
                    <IconButton size="small" color="error" sx={{ width: '20px' }}><Delete /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};
