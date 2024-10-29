import { useState } from "react";
import { Box, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import WelcomeScreen from "../../core-ui/Forms/WelcomeScreen";
import { TechniqueDescription } from "../../core-ui/Forms/TechniqueDescription";
import { AddQuestionSection } from "../../core-ui/AddQuestionSection";
import { SorteableOptions } from "../../core-ui/SorteableOptions";
import { QuestionHeader } from "../../core-ui/Forms/QuestionHeader";
import { UploadSection } from "../../core-ui/Forms/UploadSection";
import { QuestionTitleInput } from "../../core-ui/Forms/QuestionTitleInput";
import { RangeInput } from "../../core-ui/Forms/RangeInput";
import { FileTestSection } from "../../core-ui/Forms/FileTestSection";
import { FilesUpload } from "../../core-ui/Forms/FilesUpload";
import { FileListTable } from "../../core-ui/Tables/FileListTable";
import RecruitmentLink from "../../core-ui/Forms/RecruitmentLink";
import { RecruitmentConfiguration } from "../../core-ui/Forms/RecruitmentConfiguration";
import { CircularProgressCard } from "../../core-ui/Cards/CircularProgressCard";
import DotChart, { dummyData } from "../../core-ui/Charts/DotChart";
import CardWithChart from "../../core-ui/Cards/CardWithChart";
import TrustRelationshipFlow from "../../core-ui/Charts/TrustRelationShipFlow";
import { CardNoAxisChart } from "../../core-ui/Cards/CardNoAxisChart";
import HorizontalChart from "../../core-ui/Charts/HorizontalChart";
import { EmotionalStatesChart } from "../../core-ui/Charts/EmotionalStatesChart";
import { NPSChart } from "../../core-ui/Charts/NPSChart";
import { CommentsTable } from "../../core-ui/Tables/CommentsTable";
import { AnalysisTabs } from "../../core-ui/Tables/AnalysisTable";
import FiltersPanel from "../../core-ui/FiltersPanel";
import OptionsTable from "../../core-ui/Tables/OptionsTable";
import StepCard from "../../core-ui/Cards/StepCard";
import FileUploadComponent from "../../core-ui/FIleUpload/FileUploadComponent";
import CriteriaTable from "../../core-ui/Tables/CriteriaTable";
import DashboardMetrics from "../../core-ui/Charts/BriefCharts";
import { UserDistributionCard } from "../../core-ui/Cards/UserDistributionCard";
import { UserStatsCard } from "../../core-ui/Cards/UserStatsCard";
import { ResponsesCardV2 } from "../../core-ui/Cards/ResponsesCard";
import RadarChartComponent from "../../core-ui/Charts/RadarChartComponent";
import { StackedBarChartComponent } from "../../core-ui/Charts/StackedBarChartComponent";
import HorizontalBarChartComponent from "../../core-ui/Charts/HorizontalBarChartComponent";
import ThemesComponent from "../../core-ui/Tables/ThemesComponent";
import { ConfigurationPanelComponent } from "../../core-ui/ConfigurationPanelComponent";
import { DiscardOptionsComponent } from "../../core-ui/DiscardOptionsComponent";
import { HeatmapComponent } from "../../core-ui/HeatmapComponent";
import { ScatterPlotComponent } from "../../core-ui/Charts/ScatterPlotComponent";
import { ProjectCard } from "../../core-ui/Cards/ProjectCard";
import EmotionFlowChart from "../../core-ui/Charts/EmotionFlowChart";
import GradientBar from "../../core-ui/Progress/GradientBar";
import { EmotionMapsComponent } from "../../core-ui/Charts/EmotionapMapComponent";
// import { HeatmapSelector } from "../../core-ui/Interaction/HeatMapSelector";
import { HeatMapOverlay } from "../../core-ui/Interaction/HeatMapOverlay";

// Definición de los componentes disponibles
const componentsList = [
  { label: "Welcome Screen", component: <WelcomeScreen /> },
  { label: "Technique Description", component: <TechniqueDescription /> },
  { label: "Add Question Section", component: <AddQuestionSection /> },
  { label: "Sorteable Options", component: <SorteableOptions /> },
  { label: "Question Header", component: <QuestionHeader questionText="Sample Question" showConditionality={false} onToggleConditionality={() => {}} onDuplicate={() => {}} onDelete={() => {}} /> },
  { label: "Upload Section", component: <UploadSection deviceFrame="No Frame" setDeviceFrame={() => {}} onUploadClick={() => {}} /> },
  { label: "Question Title Input", component: <QuestionTitleInput questionText="" questionType="Single choice" required={false} onQuestionTextChange={() => {}} onQuestionTypeChange={() => {}} onRequiredToggle={() => {}} /> },
  { label: "Range Input", component: <RangeInput startValue={1} endValue={5} startLabel="" endLabel="" onStartValueChange={() => {}} onEndValueChange={() => {}} onStartLabelChange={() => {}} onEndLabelChange={() => {}} /> },
  { label: "File Test Section", component: <FileTestSection deviceFrame="No Frame" setDeviceFrame={() => {}} /> },
  { label: "Files Upload", component: <FilesUpload /> },
  { label: "File List Table", component: <FileListTable /> },
  { label: "Recruitment Link", component: <RecruitmentLink /> },
  { label: "Recruitment Configuration", component: <RecruitmentConfiguration /> },
  { label: "CircularProgressCard", component: <CircularProgressCard title="Interviews" status="Complete" totalIDs={219} percentage={57}/> },
  { label: "Dot Chart", component: <DotChart data={dummyData}/> },
  { label: "Card with Chart", component: <CardWithChart/> },
  { label: "Trust Relationship Flow", component: <TrustRelationshipFlow /> },
  { label: "Card NoAxis Chart", component: <CardNoAxisChart /> },
  { label: "Horizontal Chart", component: <HorizontalChart /> },
  { label: "Emotional States Chart", component: <EmotionalStatesChart/> },
  { label: "NPS Chart", component: <NPSChart/> },
  { label: "Comments Table", component: <CommentsTable/> },
  { label: "Analysis Table", component: <AnalysisTabs/> },
  { label: "Filters Panel", component: <FiltersPanel/> },
  { label: "Options Table", component: <OptionsTable/> },
  { label: "Step Card", component: <StepCard/> },
  { label: "File Upload Component", component: <FileUploadComponent/> },
  { label: "Criteria Table", component: <CriteriaTable/> },
  { label: "Dashboard Metrics", component: <DashboardMetrics/> },
  { label: "User Distribution Card", component: <UserDistributionCard/> },
  { label: "User Stats Card", component: <UserStatsCard/> },
  { label: "Responses CardV2", component: <ResponsesCardV2/> },
  { label: "Radar Chart Component", component: <RadarChartComponent/> },
  { label: "StackedBar Chart Component", component: <StackedBarChartComponent/> },
  { label: "HorizontalBar Chart Component", component: <HorizontalBarChartComponent/> },
  { label: "Themes Component", component: <ThemesComponent/> },
  { label: "Configuration Panel Component", component: <ConfigurationPanelComponent/> },
  { label: "Discard Options Component", component: <DiscardOptionsComponent/> },
  { label: "Heatmap Component", component: <HeatmapComponent/> },
  { label: "ScatterPlot Component", component: <ScatterPlotComponent/> },
  { label: "Project Card", component: <ProjectCard/> },
  { label: "EmotionFlow Chart", component: <EmotionFlowChart/> },
  { label: "Gradient Bar", component: <GradientBar/> },
  { label: "EmotionMaps Component", component: <EmotionMapsComponent/> },
//   { label: "Heatmap Selector", component: <HeatmapSelector/> },
  { label: "Heatmap Overlay", component:  <HeatMapOverlay /> },
];

// Componente principal que renderiza el listado y el componente seleccionado
export default function ComponentSelector() {
  const [selectedComponent, setSelectedComponent] = useState<string>("");

  // Maneja el cambio de selección
  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedComponent(event.target.value);
  };

  // Encuentra el componente correspondiente al valor seleccionado
  const renderedComponent = componentsList.find(
    (item) => item.label === selectedComponent
  )?.component;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}>
      {/* Selector de componentes */}
      <Select
        value={selectedComponent}
        onChange={handleChange}
        displayEmpty
        sx={{ width: 300 }}
      >
        <MenuItem value="">
          Select a Component
        </MenuItem>
        {componentsList.map((item) => (
          <MenuItem key={item.label} value={item.label}>
            {item.label}
          </MenuItem>
        ))}
      </Select>

      {/* Renderiza el componente seleccionado */}
      <Box>
        {renderedComponent || <p>Select a component to display</p>}
      </Box>
    </Box>
  );
}
