import { Box, Typography, List, ListItem, FormControlLabel, Checkbox } from '@mui/material';
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
  const { selectedSection, setSelectedSection } = useResultsStore();

  // Obtener las etapas de configuración
  const stages = researchStagesConfig[frameworkType][stageType];

  // Verifica si estamos en `AIMFramework > Result` para mostrar el `Checkbox`
  const isAIMFrameworkResult = frameworkType === 'AIMFramework' && stageType === 'Result';

  return (
    <Box sx={{ width: '250px' }}>
      <Typography variant="body2" sx={{ color: grey[600], mb: 2, mt: 3, ml: 2 }}>
        Research Stages
      </Typography>

      <List sx={{ width: '100%', height: 'auto', display: 'flex', flexDirection: 'column', ml: 1 }}>
        {stages.map(({ label }, index) => (
          <ListItem
            key={label}
            onClick={() => {
              if (isAIMFrameworkResult) {
                setSelectedSection(label);
              } else {
                setStageIndex(index);
              }
            }}
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
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedSection === label}
                    onChange={() => setSelectedSection(label)}
                  />
                }
                label={<Typography sx={{ color: 'black' }}>{label}</Typography>}
                sx={{
                  alignItems: 'center',
                  gap: 1,
                }}
              />
          </ListItem>
        ))}
      </List>

      {/* Opción de descarga solo visible en `Result` */}
      {stageType === 'Result' && (
        <Box sx={{ mt: 2 }}>
          <Typography
            component="a"
            href="#"
            sx={{
              display: 'inline-block',
              color: grey[600],
              fontWeight: 400,
              fontSize: 14,
              lineHeight: '22px',
              textDecoration: 'none',
              cursor: 'pointer',
              borderBottom: `1px solid ${grey[100]}`,
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            Download Raw Data in .csv
          </Typography>
        </Box>
      )}
    </Box>
  );
}
