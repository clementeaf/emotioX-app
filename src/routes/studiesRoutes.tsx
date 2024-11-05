/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import PublicStudyLayout from '../components/Layout/PublicStudyLayout';

const StudysHistory = lazy(() => import('../components/Clients/StudysHistory'));

const studiesRoutes: RouteObject[] = [
  {
    path: '/studies',
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
            <StudysHistory /> 
          </Suspense>
        ),
      },
    ],
  },
];

export default studiesRoutes;
