import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Typography,
  Paper,
  TableSortLabel,
} from '@mui/material';

// Datos de ejemplo
const rowsData = [
  { id: 1, comment: 'Camera lens working memory in...', mood: 'Positive' },
  { id: 2, comment: 'Laptop, Camera lens memory in...', mood: 'Positive' },
  { id: 3, comment: 'Mobile', mood: 'Positive' },
  { id: 4, comment: 'Camera lens', mood: 'Positive' },
  { id: 5, comment: 'Computer accessories', mood: 'Positive' },
  { id: 6, comment: 'TV, Camera lens working memory in...', mood: 'Positive' },
  { id: 7, comment: 'Mobile, lens working memory in...', mood: 'Positive' },
  { id: 8, comment: 'Laptop', mood: 'Positive' },
  { id: 9, comment: 'Camera lens working memory in...', mood: 'Green' },
  { id: 10, comment: 'Camera lens working memory in...', mood: 'Green' },
];

// Estilo para el estado de ánimo
const getMoodStyle = (mood: string) => {
  if (mood === 'Positive') {
    return { color: '#4caf50', backgroundColor: '#e8f5e9', padding: '2px 6px', borderRadius: 4 };
  }
  return { color: '#4caf50', backgroundColor: '#e8f5e9', padding: '2px 6px', borderRadius: 4 };
};

// Tipos para las propiedades de ordenamiento
type Order = 'asc' | 'desc';
type OrderBy = 'comment' | 'mood';

export const CommentsTable = () => {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [rows, setRows] = useState(rowsData);
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<OrderBy>('comment');

  // Función para manejar la selección de una fila
  const handleRowSelect = (id: number) => {
    setSelectedRow((prev) => (prev === id ? null : id));
  };

  // Función para manejar el ordenamiento de columnas
  const handleSort = (property: OrderBy) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);

    const sortedRows = [...rows].sort((a, b) => {
      if (a[property] < b[property]) {
        return isAsc ? -1 : 1;
      }
      if (a[property] > b[property]) {
        return isAsc ? 1 : -1;
      }
      return 0;
    });

    setRows(sortedRows);
  };

  return (
    <TableContainer component={Paper} sx={{ minHeight: 546, maxWidth: 400, overflowY: 'auto', height: '576px' }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox disabled />
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'comment'}
                direction={orderBy === 'comment' ? order : 'asc'}
                onClick={() => handleSort('comment')}
              >
                <Typography fontWeight={500} fontSize={12} lineHeight="20px" color="#262626">
                  Comment
                </Typography>
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'mood'}
                direction={orderBy === 'mood' ? order : 'asc'}
                onClick={() => handleSort('mood')}
              >
                <Typography fontWeight={500} fontSize={12} lineHeight="20px" color="#262626">
                  Mood
                </Typography>
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              hover
              selected={selectedRow === row.id}
              onClick={() => handleRowSelect(row.id)}
              sx={{
                cursor: 'pointer',
                backgroundColor: selectedRow === row.id ? '#f5f5f5' : 'inherit',
              }}
            >
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedRow === row.id}
                  onChange={() => handleRowSelect(row.id)}
                />
              </TableCell>
              <TableCell>
                <Typography fontWeight={500} fontSize={12} lineHeight="20px" color="#262626" noWrap>
                  {row.comment}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight={500} fontSize={12} lineHeight="20px" color="#52C41A" sx={getMoodStyle(row.mood)}>
                  {row.mood}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

