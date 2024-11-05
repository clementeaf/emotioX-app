import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import { grey, blue } from '@mui/material/colors';
import { useSelectedResearchStore } from '../../../store/useSelectedResearchStore';
import { researchStagesConfig } from '../../../config/researchConfig';
import { MdScreenShare, MdPerson, MdPsychology, MdVisibility } from 'react-icons/md';
import { GiBrain } from 'react-icons/gi';

type RecruitSidebarProps = {
  frameworkType: 'BehaviouralResearch' | 'AIMFramework';
};

// Icon map to assign icons based on label
const ICONS: Record<string, JSX.Element> = {
  Screener: <MdScreenShare />,
  'Welcome screen': <MdPerson />,
  'Implicit Association': <MdPsychology />,
  'Cognitive task': <GiBrain />,
  'Eye Tracking': <MdVisibility />,
  'Thank you screen': <MdScreenShare />,
};

export function RecruitSidebar({ frameworkType }: RecruitSidebarProps) {
  const { setStageIndex } = useSelectedResearchStore();
  const stages = researchStagesConfig[frameworkType]; // Get stages based on framework type

  return (
    <Box sx={{ p: 2, width: '100%' }}>
      <Typography variant="body2" sx={{ color: grey[600], mb: 1 }}>
        Research Stages
      </Typography>
      <List>
        {stages.map((stage, index) => (
          <ListItem
            key={index}
            onClick={() => setStageIndex(index)} // Update global state with selected stage index
            disablePadding
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 16px',
              backgroundColor: stage.label === 'Eye Tracking' ? blue[50] : 'white',
              cursor: 'pointer',
              borderBottom: `1px solid ${grey[200]}`,
              '&:hover': {
                backgroundColor: grey[100],
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ color: stage.label === 'Eye Tracking' ? blue[700] : grey[700], pr: 1 }}>
                {ICONS[stage.label] || <MdScreenShare />} {/* Default icon if label not in ICONS */}
              </Box>
              <ListItemText
                primary={stage.label}
                primaryTypographyProps={{
                  fontWeight: stage.label === 'Eye Tracking' ? 'bold' : 'normal',
                  color: stage.label === 'Eye Tracking' ? blue[700] : grey[800],
                }}
              />
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
