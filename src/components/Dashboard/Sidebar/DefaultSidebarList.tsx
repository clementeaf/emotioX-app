import { Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import sidebarRoutes from '../../../routes/sidebarRoutes';
import { useResearchStore } from '../../../store/useResearchStore';

export default function DefaultSidebarList() {
    const navigate = useNavigate();
    const location = useLocation();
    const { resetForm } = useResearchStore();

    const handleRouteClick = (route: typeof sidebarRoutes[0]) => {
        if (route.actionType === 'RESET_FORM') {
            resetForm();
        }
        navigate(route.path);
    };

    return (
        <List sx={{ width: '100%', height: '100%' }}>
            {sidebarRoutes.map((route) => {
                const isActive = location.pathname === route.path;
                const IconComponent = route.icon;

                return (
                    <ListItem key={route.path} disablePadding sx={{ width: '100%' }}>
                        <ListItemButton
                            onClick={() => handleRouteClick(route)}
                            sx={{
                                width: '100%',
                                bgcolor: isActive ? '#EAF2FF' : 'transparent',
                                borderRight: isActive ? '4px solid #007BFF' : 'none',
                                '&:hover': {
                                    backgroundColor: '#EAF2FF',
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    paddingRight: '10px',
                                    color: isActive ? '#007BFF' : '#4F4F4F',
                                }}
                            >
                                <IconComponent />
                            </Box>

                            <ListItemText
                                primary={route.label}
                                primaryTypographyProps={{
                                    fontWeight: isActive ? 700 : 500,
                                    color: isActive ? '#007BFF' : '#4F4F4F',
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                );
            })}
        </List>
    );
}
