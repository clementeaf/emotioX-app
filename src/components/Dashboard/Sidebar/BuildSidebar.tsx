// BuildSidebar.tsx
import { Box, Typography, List, ListItem, ListItemText, Checkbox } from '@mui/material';
import { grey, blue } from '@mui/material/colors';
import { useSelectedResearchStore } from '../../../store/useSelectedResearchStore';
import { researchStagesConfig } from '../../../config/researchConfig';

type BuildSidebarProps = {
  frameworkType: 'BehaviouralResearch' | 'AIMFramework';
};

export function BuildSidebar({ frameworkType }: BuildSidebarProps) {
  const { setStageIndex } = useSelectedResearchStore();
  const stages = researchStagesConfig[frameworkType]; // Usa el frameworkType para obtener la configuración

  return (
    <Box sx={{ p: 2, width: '250px' }}>
      <Typography variant="body2" sx={{ color: grey[600], mb: 1 }}>
        Research' stages
      </Typography>

      <List>
        {stages.map((stage, index) => (
          <ListItem
            component="li"
            key={index}
            onClick={() => setStageIndex(index)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px 16px',
              backgroundColor: 'white',
              borderBottom: `1px solid ${grey[200]}`,
              cursor: 'pointer',
            }}
          >
            <Checkbox sx={{ color: blue[700] }} />
            <ListItemText
              primary={stage.label}
              primaryTypographyProps={{
                fontWeight: 'bold',
                color: blue[700],
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
