// StageViewScreen.tsx
import { Box, Typography } from '@mui/material';
import { useSelectedResearchStore } from '../../store/useSelectedResearchStore';
import { researchStagesConfig } from '../../config/researchConfig';
import { AddQuestionSection } from '../../core-ui/AddQuestionSection';

type StageType = 'Build' | 'Recruit' | 'Result';

type StageViewScreenProps = {
  frameworkType: 'BehaviouralResearch' | 'AIMFramework';
  stageType: StageType;
};

export default function StageViewScreen({ frameworkType, stageType }: StageViewScreenProps) {
  const { stageIndex } = useSelectedResearchStore();
  const stages = researchStagesConfig[frameworkType][stageType];

  const renderContent = () => {
    return stages[stageIndex]?.component || <Typography>Seleccione una etapa</Typography>;
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: 'auto' }}>
        <Typography mb={3} mt={1} color='#262626' fontWeight={700} fontSize={20} lineHeight='28px'>
          {frameworkType} - {stages[stageIndex]?.label || 'Stage'}
        </Typography>
        {renderContent()}
        {stageType !== 'Result' && stageIndex !== 0 && stageIndex !== stages.length - 1 && (
          <Box sx={{ mt: 2 }}>
            <AddQuestionSection />
          </Box>
        )}
      </Box>
    </Box>
  );
}
