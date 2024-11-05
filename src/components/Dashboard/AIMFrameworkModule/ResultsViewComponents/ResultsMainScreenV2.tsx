// ResultsMainScreenV2.tsx
import { Box, Typography } from "@mui/material";
import { useMemo } from "react";
import { useResultsStore } from "../../../../store/useResultStore";
import resultsConfig from "../../../../config/resultsConfig.json";
import cognitiveTaskResults from "../../../../config/cognitiveTaskResults.json";

// Asegúrate de que todos estos componentes están correctamente importados
import CardWithChart from "../../../../core-ui/Cards/CardWithChart";
import TrustRelationshipFlow from "../../../../core-ui/Charts/TrustRelationShipFlow";
import { CardNoAxisChart } from "../../../../core-ui/Cards/CardNoAxisChart";
import HorizontalChart from "../../../../core-ui/Charts/HorizontalChart";
import { EmotionalStatesChart } from "../../../../core-ui/Charts/EmotionalStatesChart";
import { NPSChart } from "../../../../core-ui/Charts/NPSChart";
import { CommentsTable } from "../../../../core-ui/Tables/CommentsTable";
import { AnalysisTabs } from "../../../../core-ui/Tables/AnalysisTable";
import { ClusterDisplay } from "../../../../core-ui/Cards/ClusterDisplay";
import OptionsTable from "../../../../core-ui/Tables/OptionsTable";
import StepCard from "../../../../core-ui/Cards/StepCard";
import { HeatmapComponent } from "../../../../core-ui/HeatmapComponent";
import FiltersPanel from "../../../../core-ui/FiltersPanel";

// Define el mapeo de componentes para renderizado dinámico
const componentMap = {
  CardWithChart,
  TrustRelationshipFlow,
  CardNoAxisChart,
  HorizontalChart,
  EmotionalStatesChart,
  NPSChart,
  CommentsTable,
  AnalysisTabs,
  ClusterDisplay,
  OptionsTable,
  StepCard,
  HeatmapComponent,
  FiltersPanel,
} as const;

// Tipos de componentes en el JSON de configuración
type ComponentName = keyof typeof componentMap;

interface SectionComponent {
  type: "section";
  subcomponents: ComponentItem[];
  styles?: { width?: string; padding?: string; mt?: string };
}

interface GroupComponent {
  title: string;
  components: ComponentItem[];
  layout?: "row" | "column";
  styles?: { gap?: string; width?: string; mt?: string };
}

type ComponentItem = ComponentName | SectionComponent | GroupComponent;

interface Row {
  type: "row";
  components: ComponentItem[];
  styles?: { gap?: string; justifyContent?: string; width?: string; mt?: string };
}

export default function ResultsMainScreenV2() {
  const selectedSection = useResultsStore((state) => state.selectedSection);

  // Determina la configuración de JSON adecuada
  const configData = useMemo(
    () => (selectedSection === "Cognitive Task" ? cognitiveTaskResults : resultsConfig),
    [selectedSection]
  );

  const stageConfig = useMemo(() => {
    const sectionNameMap: Record<string, string> = {
      "Smart VOC": "Smart VOC Results",
      "Cognitive Task": "Cognitive Task Results"
    };
    const mappedSectionName = sectionNameMap[selectedSection] || selectedSection;
    return configData.stages.find((stage) => stage.name === mappedSectionName);
  }, [configData, selectedSection]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%", alignItems: "flex-start", }}>
      <Typography color="#262626" fontWeight={700} fontSize={20} lineHeight="28px">
        {selectedSection} - {stageConfig ? stageConfig.name : "Results"}
      </Typography>
      {stageConfig ? renderRows(stageConfig.rows as Row[]) : <Typography>No results found</Typography>}
    </Box>
  );
}

// Renderizado de filas basado en la configuración JSON
function renderRows(rows: Row[]): JSX.Element[] {
  return rows.map((row, rowIndex) => (
    <Box
      key={rowIndex}
      sx={{
        display: "flex",
        flexDirection: "row",
        mt: 2,
        gap: row.styles?.gap || "16px",
        justifyContent: row.styles?.justifyContent || "flex-start",
        width: row.styles?.width || "100%",
      }}
    >
      {row.components.map((component, index) => renderComponent(component, index))}
      {rowIndex === 2 && <FiltersPanel />}
    </Box>
  ));
}

// Helper functions para los type guards de `renderComponent`
function isSectionComponent(component: ComponentItem): component is SectionComponent {
  return (component as SectionComponent).type === "section";
}

function isGroupComponent(component: ComponentItem): component is GroupComponent {
  return (component as GroupComponent).components !== undefined;
}

// Renderizado individual de componentes, se asegura de verificar el tipo y estructura del componente
function renderComponent(component: ComponentItem, index: number): JSX.Element | null {
  if (typeof component === "string") {
    const Component = componentMap[component];
    return Component ? <Component key={index} /> : null;
  }

  // Renderiza las secciones (subcomponents) usando type guard
  if (isSectionComponent(component)) {
    return (
      <Box
        key={index}
        sx={{
          bgcolor: "white",
          p: component.styles?.padding || "16px",
          width: component.styles?.width || "845px",
        }}
      >
        {component.subcomponents.map((sub, subIndex) => renderComponent(sub, subIndex))}
      </Box>
    );
  }

  // Renderiza los grupos de componentes (components) usando type guard
  if (isGroupComponent(component)) {
    return (
      <Box
        key={index}
        sx={{
          display: "flex",
          flexDirection: component.layout === "row" ? "row" : "column",
          gap: component.styles?.gap || "16px",
          width: component.styles?.width || "100%",
          marginTop: component.styles?.mt || "16px",
        }}
      >
        {component.title && (
          <Typography fontWeight={500} fontSize={18}>
            {component.title}
          </Typography>
        )}
        {component.components.map((subComponent, subIndex) => renderComponent(subComponent, subIndex))}
      </Box>
    );
  }

  return null;
}
