import { RouteObject, Navigate } from 'react-router-dom';
import NotFound from '../pages/NotFound';
import PrivateRoute from './PrivateRoute';
import dashboardRoutes from './dashboardRoutes';
import clientsRoutes from './clientsRoutes';
import publicStudiesRoutes from './publicStudyRoutes';
import researchRoutes from './researchRoutes';
import researchHistoryRoutes from './researchHistoryRoutes';
import componentsTest from './componentTestRoutes';
import authRoutes from './authRoutes';

// Definición única de las rutas
const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/',
    element: <PrivateRoute />,
    children: [
      ...dashboardRoutes,
      ...clientsRoutes,
      ...publicStudiesRoutes,
      ...researchRoutes,
      ...researchHistoryRoutes,
      ...componentsTest,
    ],
  },
  ...authRoutes,
  {
    path: '*',
    element: <NotFound />,
  },
];

export default routes;
