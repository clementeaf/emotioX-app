/* eslint-disable react-refresh/only-export-components */
// src/routes/dashboardRoutes.tsx
import { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import DashboardLayout from '../components/Layout/DashboardLayout';

const DashboardMain = lazy(() => import('../components/Dashboard/DashboardModule/index'));
const Clients = lazy(() => import('../components/Dashboard/Clients/index'));

const dashboardRoutes: RouteObject[] = [
  {
    path: '/dashboard',
    element: (
      <Suspense fallback={<div>Loading Dashboard ...</div>}>
        <DashboardLayout />
      </Suspense>
    ),
    children: [
      {
        path: '',
        element: (
          <Suspense fallback={<div>Loading Dashboard Main ...</div>}>
            <DashboardMain /> 
          </Suspense>
        ),
      },
      // {
      //   path: 'researchHistory',
      //   element: (
      //     <Suspense fallback={<div>Loading Research History ...</div>}>
      //       <ResearchHistory /> 
      //     </Suspense>
      //   ),
      // },
      {
        path: 'clients',
        element: (
          <Suspense fallback={<div>Loading Clients ...</div>}>
            <Clients />
          </Suspense>
        ),
      },
    ],
  },
];

export default dashboardRoutes;
