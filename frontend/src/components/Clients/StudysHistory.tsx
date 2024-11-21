import { Box, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import publicStudiesRoutes from '../../routes/publicStudyRoutes';

export default function StudysHistory() {
  const navigate = useNavigate();

  // Filtramos y extraemos las rutas que tienen un label
  const routes = publicStudiesRoutes
    .find((route) => route.path === '/public')?.children
    ?.filter((child) => child.path)
    .map((child) => ({
      path: `/public/${child.path}`,
      label: child.path,
    })) || [];

  const handleRouteClick = (path: string) => {
    navigate(path);
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
        <Typography>Public Studies Available</Typography>
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
            {routes.map((route) => (
              <ListItem key={route.path} disablePadding>
                <ListItemButton
                  onClick={() => handleRouteClick(route.path)}
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
            ))}
          </List>
        </Box>
    </Box>
  );
}
