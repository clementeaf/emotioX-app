import { Box } from '@mui/material'
import ChartAndDescription from './ChartAndDescription';
import { TopRow } from './TopRow';
import { ResearchHistoryTable } from '../../../core-ui/Tables/ResearchHistoryTable';

export default function index() {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      gap: 2,
      mb: 3,
    }}>
      <TopRow />
      <ChartAndDescription />
      <ResearchHistoryTable />
    </Box>
  )
}