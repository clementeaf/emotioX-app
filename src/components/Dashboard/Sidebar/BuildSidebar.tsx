import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useSelectedResearchStore } from '../../../store/useSelectedResearchStore';
import { researchStagesConfig } from '../../../config/researchConfig';

type BuildSidebarProps = {
  frameworkType: 'BehaviouralResearch' | 'AIMFramework';
};

export function BuildSidebar({ frameworkType }: BuildSidebarProps) {
  const { setStageIndex } = useSelectedResearchStore();
  const stages = researchStagesConfig[frameworkType];

  return (
    <Box sx={{ width: '250px' }}>
      <Typography variant="body2" sx={{ color: grey[600], mb: 2, mt: 3, ml: 2 }}>
        Research Stages
      </Typography>

      <List sx={{ width: '100%', height: 'auto', gap: 0.5, display: 'flex', flexDirection: 'column', ml: 1 }}>
        {stages.map((stage, index) => (
          <ListItem
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
            <ListItemText primary={stage.label} primaryTypographyProps={{ color: 'black' }} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
