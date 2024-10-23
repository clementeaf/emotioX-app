import { Box, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { BsSpeedometer2 } from 'react-icons/bs';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { FaChartBar } from 'react-icons/fa';
import { LuUser2 } from 'react-icons/lu';
import {  useLocation, useNavigate } from 'react-router-dom';
import { useResearchStore } from '../../store/useResearchStore';

export default function DefaultSidebarList() {
    const navigate = useNavigate();
    const location = useLocation();
    const { resetForm } = useResearchStore();

    const routes = [
        { path: '/dashboard', label: 'Dashboard', icon: <BsSpeedometer2 size={24} /> },
        { path: '/newResearch', label: 'New Research', icon: <IoDocumentTextOutline size={24} />, action: resetForm },
        { path: '/researchHistory', label: "Research's history", icon: <FaChartBar size={24} /> },
        { path: '/clients', label: 'Clients', icon: <LuUser2 size={24} /> },
        { path: '/componentsTest', label: 'ComponentTest', icon: <BsSpeedometer2 size={24} /> },
    ];

    type Route = { path: string; label: string; icon: JSX.Element; action?: () => void };

    const handleRouteClick = (route: Route) => {
        if (route.action) route.action();
        navigate(route.path);
    };

    return (
        <List sx={{ width: '100%', height: '100ch' }}>
            {routes.map((route) => {
                const isActive = location.pathname === route.path;

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
                            {/* Icono */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    paddingRight: '10px',
                                    color: isActive ? '#007BFF' : '#4F4F4F',
                                }}
                            >
                                {route.icon}
                            </Box>

                            {/* Texto */}
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
