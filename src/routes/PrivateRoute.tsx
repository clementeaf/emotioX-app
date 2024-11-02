import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute: React.FC = () => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
        // Redirigir a la página de login si no hay token
        return <Navigate to="/login" replace />;
    }

    // Renderizar el contenido de la ruta si el token existe
    return <Outlet />; // Renderiza las rutas hijas
};

export default PrivateRoute;
