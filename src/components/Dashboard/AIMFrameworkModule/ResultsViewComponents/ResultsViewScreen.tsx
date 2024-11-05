import { Box, Typography } from "@mui/material";
import { researchStagesConfig } from "../../../../config/researchConfig";
import { useSelectedResearchStore } from "../../../../store/useSelectedResearchStore";

export default function ResultsViewScreen() {
  const { researchType, stageIndex } = useSelectedResearchStore();
  const stages = researchStagesConfig[researchType].Result;

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
      </Box>
    </Box>
  );
}
