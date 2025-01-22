import { Box, Typography, List, ListItem, Checkbox } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useSelectedResearchStore } from '../../../store/useSelectedResearchStore';
import { researchStagesConfig } from '../../../config/researchConfig';
import { useResultsStore } from '../../../store/useResultStore';

type StageType = 'Build' | 'Recruit' | 'Result';

type ResearchSidebarProps = {
  frameworkType: 'BehaviouralResearch' | 'AIMFramework';
  stageType: StageType;
};

export function ResearchSidebar({ frameworkType, stageType }: ResearchSidebarProps) {
  const { setStageIndex } = useSelectedResearchStore();
  const { setSelectedSection } = useResultsStore();

  // Obtener las etapas de configuración
  const stages = researchStagesConfig[frameworkType][stageType];

  // Manejar el evento del checkbox
  const handleCheckboxChange = (label: string, getStore?: () => any) => {
    console.log('Checkbox clicked for label:', label);

    if (getStore) {
      const data = getStore();
      console.log(`Store data for ${label}:`, data);
    } else {
      console.warn(`No store associated with label: ${label}`);
    }
  };

  return (
    <Box sx={{ width: '250px' }}>
      <Typography variant="body2" sx={{ color: grey[600], mb: 2, mt: 3, ml: 2 }}>
        Research Stages
      </Typography>

      <List sx={{ width: '100%', height: 'auto', display: 'flex', flexDirection: 'column', ml: 1 }}>
        {stages.map(({ label, getStore }, index) => (
          <ListItem
            key={label}
            onClick={() => setStageIndex(index)}
            disablePadding
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              p: 0,
              width: '100%',
              py: 1,
              borderBottom: `1px solid ${grey[200]}`,
              ml: 1,
              cursor: 'pointer',
            }}
          >
            <Checkbox
              onChange={() => handleCheckboxChange(label, getStore)}
              sx={{ mr: 1 }}
            />
            <Typography
              onClick={() => setSelectedSection(label)}
              sx={{ color: 'black', cursor: 'pointer' }}
            >
              {label}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
