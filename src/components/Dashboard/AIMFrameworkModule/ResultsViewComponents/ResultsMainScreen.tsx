import { Box } from "@mui/material";
import CardWithChart from "../../../../core-ui/Cards/CardWithChart";
import TrustRelationshipFlow from "../../../../core-ui/Charts/TrustRelationShipFlow";
import { CardNoAxisChart } from "../../../../core-ui/Cards/CardNoAxisChart";
import HorizontalChart from "../../../../core-ui/Charts/HorizontalChart";
import FiltersPanel from "../../../../core-ui/FiltersPanel";
import { EmotionalStatesChart } from "../../../../core-ui/Charts/EmotionalStatesChart";
import { NPSChart } from "../../../../core-ui/Charts/NPSChart";
import { CommentsTable } from "../../../../core-ui/Tables/CommentsTable";
import { AnalysisTabs } from "../../../../core-ui/Tables/AnalysisTable";

export default function ResultsMainScreen() {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: 'auto',
    }}>
      {/** First Row: */}
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3, mt: 2, width: 1134 }}>
        <CardWithChart/>
        <TrustRelationshipFlow />
      </Box>
      
      {/** Second Row: */}
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3, mt: 2, width: 1134 }}>
        <CardNoAxisChart />
        <CardNoAxisChart />
        <CardNoAxisChart />
      </Box>

      {/** Thrid Row: */}
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3, mt: 2, width: 1134, height: 3645.11 }}>
        <Box>
          <HorizontalChart />
          <HorizontalChart />
          <HorizontalChart />
          <HorizontalChart />
          <EmotionalStatesChart/>
          <HorizontalChart />
          <NPSChart />
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, mt: 2 }}>
          <CommentsTable/>
          <AnalysisTabs />
        </Box>
        </Box>
        <FiltersPanel/>
      </Box>
    </Box>
  )
}
