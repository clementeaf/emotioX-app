// BuildSidebar.tsx
import { Box, Typography, List, ListItem, ListItemText, Checkbox } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useSelectedResearchStore } from '../../../store/useSelectedResearchStore';
import { researchStagesConfig } from '../../../config/researchConfig';

type BuildSidebarProps = {
  frameworkType: 'BehaviouralResearch' | 'AIMFramework';
};

export function BuildSidebar({ frameworkType }: BuildSidebarProps) {
  const { setStageIndex } = useSelectedResearchStore();
  const stages = researchStagesConfig[frameworkType]; // Usa el frameworkType para obtener la configuración

  return (
    <Box sx={{ width: '250px' }}>
      <Typography variant="body2" sx={{ color: grey[600], mb: 2, mt: 3, ml: 2, }}>
        Research' stages
      </Typography>

      <List sx={{
        width: '100%',
        height: 'auto',
        gap: 0.5,
        display: 'flex',
        flexDirection: 'column',
      }}>
        {stages.map((stage, index) => (
          <ListItem
            component="li"
            key={index}
            onClick={() => setStageIndex(index)}
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
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'flex-start', gap: 2, }}>
            <Checkbox sx={{ color: grey[400], p: 0, m: 0, }} />
            <ListItemText
              primary={stage.label}
              primaryTypographyProps={{
                color: 'black',
                p: 0, 
                m: 0,
              }}
            />
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
