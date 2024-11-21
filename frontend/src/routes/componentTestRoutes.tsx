/* eslint-disable react-refresh/only-export-components */
// src/routes/dashboardRoutes.tsx
import { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import DashboardLayout from '../components/Layout/DashboardLayout';

const ComponentTest = lazy(() => import('../components/ComponentsTest/index'));

const componentsTest: RouteObject[] = [
  {
    path: '/componentsTest',
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
            <ComponentTest /> 
          </Suspense>
        ),
      },
    ],
  },
];

export default componentsTest;
