import { Box, Button, Chip, IconButton, Stack, Typography } from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';
import CardWithChart from "../../../../core-ui/Cards/CardWithChart";
import TrustRelationshipFlow from "../../../../core-ui/Charts/TrustRelationShipFlow";
import { CardNoAxisChart } from "../../../../core-ui/Cards/CardNoAxisChart";
import HorizontalChart from "../../../../core-ui/Charts/HorizontalChart";
import FiltersPanel from "../../../../core-ui/FiltersPanel";
import { EmotionalStatesChart } from "../../../../core-ui/Charts/EmotionalStatesChart";
import { NPSChart } from "../../../../core-ui/Charts/NPSChart";
import { CommentsTable } from "../../../../core-ui/Tables/CommentsTable";
import { AnalysisTabs } from "../../../../core-ui/Tables/AnalysisTable";
import { grey } from "@mui/material/colors";
import { ClusterDisplay } from "../../../../core-ui/Cards/ClusterDisplay";
import { useStageStore } from "../../../../store/useStageStore";
import OptionsTable from "../../../../core-ui/Tables/OptionsTable";
import StepCard from "../../../../core-ui/Cards/StepCard";
import { HeatmapComponent } from "../../../../core-ui/HeatmapComponent";

export default function ResultsMainScreen() {
  const selectedStage = useStageStore((state) => state.selectedStage);
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: 'auto',
    }}>
      <Typography color="#262626" fontWeight={700} fontSize={20} lineHeight='28px'>AIM Framework Stage 3’s name</Typography>
      {selectedStage === 1 && <SmartVOCResults />}
      {selectedStage === 2 && <CognitiveTaskResults />}
    </Box>
  )
}

function SmartVOCResults() {
  return (
    <>
      {/** First Row: */}
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 3, mt: 2, width: 1134, height: '100%' }}>
        <CardWithChart />
        <TrustRelationshipFlow />
      </Box>

      {/** Second Row: */}
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3, mt: 2, width: 1134 }}>
        <CardNoAxisChart />
        <CardNoAxisChart />
        <CardNoAxisChart />
      </Box>

      {/** Thrid Row: */}
      <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2, width: 1134, gap: 3, height: 3645.11 }}>
        <Box sx={{ bgcolor: 'white' }}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            borderBottom: `1px solid ${grey[300]}`,
          }}>
            <Typography pl={2} pt={2} pb={2} fontWeight={700} fontSize={16} lineHeight='24px' color='#212121'>1.0.- Smart VOC</Typography>
          </Box>
          <HorizontalChart />
          <Stack sx={{ height: '1px', width: '95%', bgcolor: '#E9E9E9', my: 4, ml: 3 }} />
          <HorizontalChart />
          <Stack sx={{ height: '1px', width: '95%', bgcolor: '#E9E9E9', my: 4, ml: 3 }} />
          <HorizontalChart />
          <Stack sx={{ height: '1px', width: '95%', bgcolor: '#E9E9E9', my: 4, ml: 3 }} />
          <HorizontalChart />
          <Stack sx={{ height: '1px', width: '95%', bgcolor: '#E9E9E9', my: 4, ml: 3 }} />
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, mt: 2, px: 2 }}>
            <EmotionalStatesChart />
            <ClusterDisplay />
          </Box>
          <HorizontalChart />
          <NPSChart />
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', gap: 2, mt: 2 }}>
            <CommentsTable />
            <AnalysisTabs />
          </Box>
        </Box>
        <FiltersPanel />
      </Box>
    </>
  )
}

function CognitiveTaskResults() {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      minWidth: 1134,
      height: 6171,
      mt: 2,
      gap: 3,
    }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        border: `1px solid ${grey[300]}`,
        bgcolor: 'white',
        borderRadius: 1,
        p: 2,
      }}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          gap: 2,
          width: '100%',
          mb: 2,
        }}>
          <QuestionHeader />
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            gap: 5,
          }}>
            <CommentsTable />
            <AnalysisTabs />
          </Box>
          <Stack sx={{ width: '95%', height: '1px', bgcolor: '#E9E9E9', my: 4, ml: 3 }} />
        </Box>


        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          gap: 2,
          width: '100%',
          mb: 2,
        }}>
          <QuestionHeader />
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            gap: 5,
          }}>
            <CommentsTable />
            <AnalysisTabs />
          </Box>
          <Stack sx={{ width: '95%', height: '1px', bgcolor: '#E9E9E9', my: 4, ml: 3 }} />
        </Box>

        <Box p={2}>
          <HorizontalChart />
          <HorizontalChart />
          <HorizontalChart />
        </Box>

        <Box>
          <QuestionHeader />
          <OptionsTable/>
        </Box>

        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          gap: 2,
          width: '100%',
          my: 2,
        }}>
          <QuestionHeader />
          <StepCard />
          <StepCard />
          <StepCard />
        </Box>

        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          width: '100%',
          my: 2,
        }}>
          <QuestionHeader />
          <StepCard />
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            gap: 2,
            width: '100%',
          }}>
            {/** Header */}
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 2, width: '100%', my: 2 }}>
              <Typography fontWeight={500} fontSize={18} lineHeight='18px' color="#2B3674">Step 1 and task description</Typography>
              {/** LightBlue section */}
              <Box sx={{ width: 395, height: 42, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 2, border: `1px solid ${grey[300]}`, borderRadius: 1, px: 2, py: 1, bgcolor: '#E6F7FF' }}>
                <Typography sx={{ opacity: 0.85, fontSize: 14, fontWeight: 400 }}><b>New data was obtained.</b> Please update graph</Typography>
                <Button variant="contained" size="small" sx={{ bgcolor: '#252BE6', color: '#fff', minWidth: '64px', textTransform: 'none' }}>
                  <Typography sx={{ opacity: 0.85, fontSize: 14, fontWeight: 400 }}>Update</Typography>
                </Button>
              </Box>
            </Box>

            {/** Heatmap */}
            <HeatmapComponent />
            <StepCard />
            <StepCard />
            <StepCard />
            <StepCard />
          </Box>
        </Box>

      </Box>
      <FiltersPanel />
    </Box>
  )
}

const QuestionHeader: React.FC = () => {
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">

      {/* Título y etiquetas */}
      <Box display="flex" alignItems="center" gap={1}>
        {/* Título */}
        <Typography fontSize={16} fontWeight={500}>
          3.1.-Question
        </Typography>

        {/* Etiquetas */}
        <Chip label="Short Text question" sx={{ bgcolor: '#E7F5E7', color: '#44A049', fontSize: 12 }} />
        <Chip label="Conditionality disabled" sx={{ bgcolor: '#E5EEFD', color: '#326BDC', fontSize: 12 }} />
        <Chip label="Required" sx={{ bgcolor: '#FFE7E7', color: '#F44336', fontSize: 12 }} />

        {/* Icono de filtro */}
        <IconButton>
          <FilterListIcon fontSize="small" sx={{ color: '#4F4F4F' }} />
        </IconButton>
      </Box>

      {/* Notificación de actualización */}
      <Box display="flex" alignItems="center" bgcolor="#E5F4FE" border="1px solid #B3E5FC" borderRadius={1} px={2} py={1} gap={1}>
        <Typography fontSize={14} color="#333333" fontWeight={500}>
          New data was obtained
        </Typography>
        <Button variant="contained" size="small" sx={{ bgcolor: '#252BE6', color: '#fff', minWidth: '64px', textTransform: 'none' }}>
          Update
        </Button>
      </Box>
    </Box>
  );
};