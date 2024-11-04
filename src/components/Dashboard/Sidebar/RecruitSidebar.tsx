import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import { grey, blue } from '@mui/material/colors';
import { MdScreenShare, MdPerson, MdPsychology, MdVisibility } from 'react-icons/md';
import { GiBrain } from 'react-icons/gi';

type RecruitSidebarProps = {
  frameworkType: 'BehaviouralResearch' | 'AIMFramework';
};

export function RecruitSidebar({ frameworkType }: RecruitSidebarProps) {
  const items = frameworkType === 'AIMFramework'
    ? [
        { label: 'Screener', icon: <MdScreenShare /> },
        { label: 'Welcome screen', icon: <MdPerson /> },
        { label: 'Implicit Association', icon: <MdPsychology /> },
        { label: 'Cognitive task', icon: <GiBrain /> },
        { label: 'Eye Tracking', icon: <MdVisibility />, color: blue[700] },
        { label: 'Thank you screen', icon: <MdScreenShare /> },
      ]
    : [
        { label: 'Participant Screening', icon: <MdPerson /> },
        { label: 'Behaviour Analysis', icon: <MdPsychology /> },
      ];

  return (
    <Box sx={{ p: 2, width: '100%' }}>
      <Typography variant="body2" sx={{ color: grey[600], mb: 1 }}>
        Research' stages
      </Typography>
      <List>
        {items.map((item, index) => (
          <ListItem
            key={index}
            disablePadding
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 16px',
              backgroundColor: item.color ? blue[50] : 'white',
              cursor: 'pointer',
              borderBottom: `1px solid ${grey[200]}`,
              '&:hover': {
                backgroundColor: grey[100],
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ color: item.color || grey[700], pr: 1 }}>{item.icon}</Box>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: item.color ? 'bold' : 'normal',
                  color: item.color || grey[800],
                }}
              />
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
