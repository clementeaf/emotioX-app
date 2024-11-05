// FrameworkIndex.tsx
import { Box } from '@mui/material';
import StageViewScreen from './StageViewScreen';

interface FrameworkIndexProps {
  frameworkType: 'BehaviouralResearch' | 'AIMFramework';
  selectedScreen: number; // Add selectedScreen to props
}

export default function FrameworkIndex({ frameworkType, selectedScreen }: FrameworkIndexProps) {
  // Map selectedScreen to the stage type (e.g., Build, Recruit, Results)
  const stageTypeMap: { [key: number]: 'Build' | 'Recruit' | 'Result' } = {
    0: 'Build',
    1: 'Recruit',
    2: 'Result',
  };
  const stageType = stageTypeMap[selectedScreen];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <StageViewScreen frameworkType={frameworkType} stageType={stageType} />
    </Box>
  );
}
