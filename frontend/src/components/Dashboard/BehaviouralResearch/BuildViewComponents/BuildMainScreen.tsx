import { Box, Typography } from '@mui/material';
import { useSelectedResearchStore } from '../../../../store/useSelectedResearchStore';
import { researchStagesConfig } from '../../../../config/researchConfig';
import { AddQuestionSection } from '../../../../core-ui/AddQuestionSection';

export default function BuildMainScreen() {
  const { researchType, stageIndex } = useSelectedResearchStore();
  const stages = researchStagesConfig[researchType].Build;

  const renderContent = () => {
    return stages[stageIndex]?.component || <Typography>Seleccione una etapa</Typography>;
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: 'auto' }}>
        <Typography mb={3} mt={1} color='#262626' fontWeight={700} fontSize={20} lineHeight='28px'>
          {researchType} - {stages[stageIndex]?.label || "Stage"}
        </Typography>
        {renderContent()}
        <Box sx={{ mt: 2 }}>
          {stageIndex !== 0 && stageIndex !== stages.length - 1 && <AddQuestionSection />}
        </Box>
      </Box>
    </Box>
  );
}
