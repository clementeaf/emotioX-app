import { Box, Typography } from '@mui/material';
import { useResearchStore } from '../../../store/useResearchStore';
import BehaviouralResearch from '../BehaviouralResearch';
import InsightsFinding from '../InsightsFinding';
import ClientsBenchmark from '../ClientsBenchmark';
import AttentionsPrediction from '../AttentionPrediction/AttentionPrediction';

export default function ResearchStep3() {
  const { selectedResearchType } = useResearchStore();

  // Mapeo de tipos de investigación a componentes
  const researchComponents: Record<string, React.ReactNode> = {
    "Behavioural Research": <BehaviouralResearch title="Techniques for Behavioural Research" />,
    "Attention's Prediction": <AttentionsPrediction title="Attention's Prediction" />,
    "Insights Finding": <InsightsFinding title="Insights Finding" />,
    "Client's Benchmark": <ClientsBenchmark title="Client's Benchmark" />,
  };

  return (
    <Box>
      {/* Renderizar el componente correspondiente o un mensaje por defecto */}
      {researchComponents[selectedResearchType] || (
        <Typography variant="body1" color="gray">
          Please select a research type to configure its techniques.
        </Typography>
      )}
    </Box>
  );
}
