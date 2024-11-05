import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useSelectedResearchStore } from '../../../store/useSelectedResearchStore';
import { researchStagesConfig } from '../../../config/researchConfig';

type StageType = 'Build' | 'Recruit' | 'Result';

type ResearchSidebarProps = {
  frameworkType: 'BehaviouralResearch' | 'AIMFramework';
  stageType: StageType;
};

export function ResearchSidebar({ frameworkType, stageType }: ResearchSidebarProps) {
  const { setStageIndex } = useSelectedResearchStore();
  const stages = researchStagesConfig[frameworkType][stageType];

  return (
    <Box sx={{ width: '250px' }}>
      <Typography variant="body2" sx={{ color: grey[600], mb: 2, mt: 3, ml: 2 }}>
        Research Stages {stageType}
      </Typography>

      <List sx={{ width: '100%', height: 'auto', gap: 0.5, display: 'flex', flexDirection: 'column', ml: 1 }}>
        {stages.map((stage, index) => (
          <ListItem
            key={stage.label}
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
            <ListItemText primary={stage.label} primaryTypographyProps={{ color: 'black' }} />
          </ListItem>
        ))}
      </List>

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
