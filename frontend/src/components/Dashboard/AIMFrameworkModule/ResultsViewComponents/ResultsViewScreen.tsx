import { Box, Typography } from "@mui/material";
import { researchStagesConfig } from "../../../../config/researchConfig";
import { useSelectedResearchStore } from "../../../../store/useSelectedResearchStore";
import { useResultsStore } from "../../../../store/useResultStore";

export default function ResultsViewScreen() {
  const { researchType, stageIndex } = useSelectedResearchStore();
  const { selectedSection } = useResultsStore();
  const stages = researchStagesConfig[researchType].Result;

  // Función para obtener el índice del `selectedSection` en `stages`
  const selectedIndex = stages.findIndex(stage => stage.label === selectedSection);

  const renderContent = () => {
    // Si estamos en `AIMFramework` y en `Result`, usamos `selectedSection`
    if (researchType === "AIMFramework" && selectedSection) {
      return stages[selectedIndex]?.component || <Typography>Seleccione una etapa</Typography>;
    }
    
    // Para otros casos, usamos `stageIndex`
    return stages[stageIndex]?.component || <Typography>Seleccione una etapa</Typography>;
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: 'auto' }}>
        <Typography mb={3} mt={1} color='#262626' fontWeight={700} fontSize={20} lineHeight='28px'>
          {researchType} - {(researchType === "AIMFramework" && selectedSection) 
            ? stages[selectedIndex]?.label 
            : stages[stageIndex]?.label || "Stage"}
        </Typography>
        {renderContent()}
      </Box>
    </Box>
  );
}
