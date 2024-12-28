import { Box, Stack } from '@mui/material';
import { TableSectionComponent } from './TableSectionComponent';
import LearnAbout from './LearnAbout';
import BottomRowCardsContainer from './BottomRowCardsContainer';

export default function index() {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      width: '1135px',
      height: '100%',
      gap: 2,
    }}>
      <Stack sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        width: '100%',
      }}>
          <TableSectionComponent />
          <LearnAbout />
      </Stack>
      <BottomRowCardsContainer />
    </Box>
  )
}