import { Toolbar, Typography, Box, IconButton, Badge, InputBase, Stack, Menu, MenuItem } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import { grey } from '@mui/material/colors';
import Vector from "../../assets/Vector.png";
import avatar from '../../assets/avatar.png';
import { useState, MouseEvent } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    // Función de logout
    const handleLogout = async () => {
        const token = localStorage.getItem('accessToken');

        if (!token) {
            console.error('No access token found');
            throw new Error('No access token found'); // Lanzar error si no hay token
        }

        return axios.post(
            'https://dg1geuc9wi.execute-api.us-east-1.amazonaws.com/logout',
            {}, // Se envía un cuerpo vacío, según el backend no se necesita contenido en el body
            {
                headers: { 
                    'Authorization': token, 
                    'Content-Type': 'application/json' 
                },
            }
        );
    };

    const logoutMutation = useMutation({
        mutationFn: handleLogout,
        onSuccess: () => {
            localStorage.removeItem('accessToken'); // Eliminar el token del almacenamiento local
            navigate('/login'); // Redirigir a la página de inicio de sesión
        },
        onError: (error) => {
            console.error('Logout failed:', error);
        },
    });

    const handleLogoutClick = () => {
        handleMenuClose();
        logoutMutation.mutate();
    };

    return (
        <Stack sx={{ backgroundColor: '#FFFFFF', color: '#000', borderBottom: `1px solid ${grey[200]}`, width: '1180px', height: '60px' }}>
            <Toolbar sx={{ justifyContent: 'space-between', width: '100%' }}>
                <img src={Vector} alt="vector" style={{ marginRight: '20px' }} />
                <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#FFFFFF', border: `1px solid ${grey[200]}`, p: 1, borderRadius: 1, width: '100%' }}>
                    <SearchIcon />
                    <InputBase placeholder="Search" sx={{ width: '885px' }} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', ml: '100px' }}>
                    <IconButton size="large" aria-label="show new notifications" color="inherit">
                        <Badge badgeContent={4} color="error">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                        onClick={handleMenuOpen}
                        sx={{ cursor: 'pointer', ml: 2 }}
                    >
                        <img src={avatar} alt="avatar" style={{ width: '32px' }} />
                        <Typography variant="body1">Username</Typography>
                    </Stack>
                    
                    {/* Menú de usuario */}
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleMenuClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
                        <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </Stack>
    );
}
