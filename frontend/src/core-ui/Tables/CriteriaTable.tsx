import {
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Checkbox,
  Link,
} from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { grey, red } from '@mui/material/colors';
import { CriteriaTableProps } from '../../types/types';

const TIMES: (300 | 400 | 500)[] = [300, 400, 500];

export function CriteriaTable({
  timeSelection,
  table,
  showResults,
  onTimeSelectionChange,
  onEditCell,
  onToggleShowResults,
}: CriteriaTableProps) {
  return (
    <Box sx={{ width: '800px', p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" fontWeight={600}>
          Criteria
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography fontWeight={400} fontSize={14}>
            Priming display time:
          </Typography>
          {TIMES.map((time) => (
            <TextField
              key={time}
              variant="outlined"
              size="small"
              value={`${timeSelection === time ? `${time} ms` : ''}`}
              onClick={() => onTimeSelectionChange(time)}
              sx={{
                width: 70,
                '& .MuiOutlinedInput-input': {
                  p: '5px',
                  textAlign: 'center',
                  cursor: 'pointer',
                },
              }}
            />
          ))}
        </Box>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {table.map((col) => (
                <TableCell key={col.columnName}>{col.columnName}</TableCell>
              ))}
              <TableCell sx={{ width: '20%' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {table[0].columnData.map((_, index) => (
              <TableRow key={index}>
                {table.map((col) => (
                  <TableCell key={col.columnName}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <DragIndicatorIcon sx={{ color: grey[500], cursor: 'pointer' }} />
                      <TextField
                        size="small"
                        value={col.columnData[index]}
                        onChange={(e) =>
                          onEditCell(col.columnName, index, e.target.value)
                        }
                        sx={{ width: '100%' }}
                      />
                    </Box>
                  </TableCell>
                ))}
                <TableCell>
                  <Link href="#" sx={{ color: grey[700], mr: 2 }}>
                    Image
                  </Link>
                  <Link href="#" sx={{ color: red[500] }}>
                    Delete
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
        <Checkbox
          checked={showResults.checkboxSelection}
          onChange={(e) => onToggleShowResults(e.target.checked)}
        />
        <Typography>{showResults.checkboxTitle}</Typography>
      </Box>
    </Box>
  );
}
