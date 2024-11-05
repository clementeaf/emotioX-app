import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import { grey, blue } from '@mui/material/colors';
import { researchStagesConfig } from '../../../config/researchConfig';
import { useResultsStore } from '../../../store/useResultStore';
import { useCallback } from 'react';

type ResultsSidebarProps = {
  frameworkType: 'BehaviouralResearch' | 'AIMFramework';
};

export default function ResultsSidebar({ frameworkType }: ResultsSidebarProps) {
  const selectedSection = useResultsStore((state) => state.selectedSection);
  const setSelectedSection = useResultsStore((state) => state.setSelectedSection);
  const stages = researchStagesConfig[frameworkType];

  const handleSectionSelect = useCallback(
    (label: string) => {
      if (label !== selectedSection) {
        setSelectedSection(label);
      }
    },
    [selectedSection, setSelectedSection]
  );

  return (
    <Box sx={{ p: 2, width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="body2" sx={{ color: grey[600], mb: 1 }}>
        Research Stages
      </Typography>
      
      <List sx={{ width: '100%' }}>
        {stages.map((stage) => (
          <ListItem
            key={stage.label}
            disablePadding
            onClick={() => handleSectionSelect(stage.label)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              py: 1,
              borderBottom: `1px solid ${grey[200]}`,
              cursor: 'pointer',
              backgroundColor: stage.label === selectedSection ? blue[50] : 'inherit',
              '&:hover': {
                backgroundColor: grey[100],
              },
            }}
          >
            <ListItemText
              primary={stage.label}
              primaryTypographyProps={{
                color: stage.label === selectedSection ? blue[700] : grey[900],
                fontWeight: stage.label === selectedSection ? 500 : 400,
                fontSize: 14,
              }}
            />
          </ListItem>
        ))}
      </List>

      {/* Download link styled as a button */}
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
    </Box>
  );
}
