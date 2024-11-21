/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import PublicStudyLayout from '../components/Layout/PublicStudyLayout';

const Clients = lazy(() => import('../components/Dashboard/Clients/index'));

const clientsRoutes: RouteObject[] = [
  {
    path: '/clients',
    element: (
      <Suspense fallback={<div>Loading Dashboard ...</div>}>
        <PublicStudyLayout />
      </Suspense>
    ),
    children: [
      {
        path: '',
        element: (
          <Suspense fallback={<div>Loading Dashboard Main ...</div>}>
            <Clients /> 
          </Suspense>
        ),
      },
    ],
  },
];

export default clientsRoutes;
