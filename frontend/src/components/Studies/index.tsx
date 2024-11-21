import { Box, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { useNavigate } from 'react-router-dom';

export default function StudysHistory() {
  const navigate = useNavigate();

  const routes = [
    { path: '/public/publicStudy', label: 'PublicStudy' },
    { path: '/public/cognitiveStudy', label: 'CognitiveStudy' },
    { path: '/public/publishedStudies', label: 'Published Studies' },
  ];

  type Route = { path: string; label: string; action?: () => void };

  const handleRouteClick = (route: Route) => {
    if (route.action) route.action();
    navigate(route.path);
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      width: '100%',
      height: 'auto',
      gap: 2,
      mb: 3,
    }}>
        <Typography>Public Studys availables</Typography>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          bgcolor: 'white',
          width: '80%',
          height: 'auto',
          borderRadius: '4px',
          border: `1px solid ${grey[200]}`,
          mt: 2,
        }}>
          <List sx={{ height: '100ch' }}>
            {routes.map((route) => {
              return (
                <ListItem key={route.path} disablePadding>
                  <ListItemButton
                    onClick={() => handleRouteClick(route)}
                    sx={{
                      width: 'auto',
                      '&:hover': {
                        backgroundColor: 'transparent',
                      },
                  
                    }}
                  >
                    <ListItemText
                      sx={{
                        bgcolor: 'transparent',
                        '&:hover': {
                          border: `1px solid #007BFF`,
                        },
                        border: `1px solid ${grey[200]}`,
                        px: 2,
                        py: 1,
                        borderRadius: '4px',
                      }}
                      primary={route.label}
                    />
                  </ListItemButton >
                </ListItem>
              );
            })}
          </List>
        </Box>
    </Box>
  )
}
