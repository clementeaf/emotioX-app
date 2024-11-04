// ResultsSidebar.tsx
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Section, useResultsStore } from '../../../store/useResultStore';

export default function ResultsSidebar() {
  // Extrae `sections` y `setSelectedSection` del store sin usar `shallow`
  const sections = useResultsStore((state) => state.sections);
  const setSelectedSection = useResultsStore((state) => state.setSelectedSection);
  console.log('sections: ', sections);

  return (
    <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2 }}>
      <Typography sx={{ mb: 2, color: '#8C8C8C', fontWeight: 500, fontSize: 12, lineHeight: '20px' }}>
        Research Stages
      </Typography>
      <List>
        {sections.map((section: Section) => ( // Especifica el tipo `Section` para `section`
          <ListItem 
            key={section.id} 
            disablePadding
            onClick={() => setSelectedSection(section.label)} // Evita actualizar el estado si no es necesario
          >
            <ListItemText primary={section.label} sx={{ cursor: 'pointer' }} />
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
