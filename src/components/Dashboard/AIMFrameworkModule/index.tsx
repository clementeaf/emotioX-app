import { Box } from '@mui/material'
import { useAIMFrameWorkNavigationStore } from '../../../store/useAIMFrameWorkNavigationStore'
import BuildMainScreen from './BuildViewComponents/BuildMainScreen'
import RecruitMainScreen from './RecruitViewComponents/RecruitMainScreen';
import ResultsMainScreen from './ResultsViewComponents/ResultsMainScreen';

export default function Index() {
  const { selectedScreen } = useAIMFrameWorkNavigationStore();
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: 'auto',
    }}>
      {selectedScreen === 0 && <BuildMainScreen />}
      {selectedScreen === 1 && <RecruitMainScreen />}
      {selectedScreen === 2 && <ResultsMainScreen />}
    </Box>
  )
}