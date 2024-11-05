import { Box } from '@mui/material';
import { useBevahiouralResearchNavigationStore } from '../../../store/useBevahiouralResearchNavigationStore';
import BuildMainScreen from './BuildViewComponents/BuildMainScreen';
import RecruitViewScreen from './RecruitViewComponents/RecruitViewScreen';
import ResultsViewScreen from './ResultsViewComponents/ResultsViewScreen';

export default function Index() {
    const { selectedScreen } = useBevahiouralResearchNavigationStore();
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            gap: 2,
            mb: 3,
        }}>
            {selectedScreen === 0 && <BuildMainScreen />}
            {selectedScreen === 1 && <RecruitViewScreen />}
            {selectedScreen === 2 && <ResultsViewScreen />}
        </Box>
    )
}