import { Box } from '@mui/material';
import { useResearchStore } from '../../../store/useResearchStore';
import BehaviouralResearch from '../BehaviouralResearch';
import InsightsFinding from '../InsightsFinding';
import ClientsBenchmark from '../ClientsBenchmark';
import AttentionsPrediction from '../AttentionPrediction/AttentionPrediction';

export default function ResearchStep3() {
  const { selectedResearchType } = useResearchStore();

  return (
    <Box>
      {selectedResearchType === "Behavioural Research" && <BehaviouralResearch title='Techniques for Behavioural Research' />}
      {selectedResearchType === "Attention's Prediction" && <AttentionsPrediction title={selectedResearchType} />}
      {selectedResearchType === "Insights Finding" && <InsightsFinding title={selectedResearchType} />}
      {selectedResearchType === "Client's Benchmark" && <ClientsBenchmark title={selectedResearchType} />}
    </Box>
  );
}
