import { Box } from '@mui/material';
import { useBevahiouralResearchNavigationStore } from '../../../store/useBevahiouralResearchNavigationStore';
import BuildMainScreen from './BuildViewComponents/BuildMainScreen';

export default function Index() {
    const { selectedScreen } = useBevahiouralResearchNavigationStore();
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: 2,
            mb: 3,
        }}>
            {selectedScreen === 0 && <BuildMainScreen />}
        </Box>
    )
}