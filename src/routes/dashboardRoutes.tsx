import { RouteObject, Navigate } from 'react-router-dom';
import NotFound from '../pages/NotFound';
import dashboardRoutes from './dashboardRoutes';
import clientsRoutes from './clientsRoutes';
import publicStudiesRoutes from './publicStudyRoutes';
import researchRoutes from './researchRoutes';
import researchHistoryRoutes from './researchHistoryRoutes';
import componentsTest from './componentTestRoutes';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  ...dashboardRoutes,
  ...clientsRoutes,
  ...publicStudiesRoutes,
  ...researchRoutes,
  ...researchHistoryRoutes,
  ...componentsTest,
  {
    path: '*',
    element: <NotFound />,
  },
];

export default routes;
