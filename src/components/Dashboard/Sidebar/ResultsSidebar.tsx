import { Box, Typography, List, ListItem } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Section, useResultsStore } from '../../../store/useResultStore';

export default function ResultsSidebar() {
  const sections = useResultsStore((state) => state.sections);
  const selectedSection = useResultsStore((state) => state.selectedSection);
  const setSelectedSection = useResultsStore((state) => state.setSelectedSection);

  return (
    <Box sx={{ p: 2, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2 }}>
      <Typography sx={{ color: '#8C8C8C', fontWeight: 500, fontSize: 12, lineHeight: '20px' }}>
        Research Stages
      </Typography>
      <List sx={{ width: '100%' }}>
        {sections.map((section: Section) => (
          <ListItem
            key={section.id}
            disablePadding
            onClick={() => setSelectedSection(section.label)}
            sx={{
              py: 1,
              borderBottom: `1px solid ${grey[200]}`,
              width: '100%',
              cursor: 'pointer',
            }}
          >
            <Typography 
              sx={{ 
                color: section.label === selectedSection ? 'blue' : '#262626',
                fontWeight: section.label === selectedSection ? 500 : 400,
                fontSize: 14, 
                lineHeight: '22px' 
              }}
            >
              {section.label}
            </Typography>
          </ListItem>
        ))}
      </List>
      <a>
        <Typography sx={{ borderBottom: `1px solid ${grey[100]}`, color: '#8C8C8C', fontWeight: 400, fontSize: 14, lineHeight: '22px', textTransform: 'initial', width: 'auto', textAlign: 'start' }}>
          Download Raw Data in .csv
        </Typography>
      </a>
    </Box>
  );
}
