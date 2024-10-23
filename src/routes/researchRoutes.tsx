/* eslint-disable react-refresh/only-export-components */
// src/routes/dashboardRoutes.tsx
import { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import DashboardLayout from '../components/Layout/DashboardLayout';

const ResearchForm = lazy(() => import('../components/ResearchCreationForm/ResearchForm'));
const AttentionPrediction = lazy(() => import('../components/Dashboard/AttentionPredictionMoule/AttentionPrediction'));
const AIMFramework = lazy(() => import('../components/Dashboard/AIMFrameworkModule/index'));
const BehaviouralResearch = lazy(() => import('../components/Dashboard/BehaviouralResearch/index'));

const researchRoutes: RouteObject[] = [
  {
    path: '/newResearch',
    element: (
      <Suspense fallback={<div>Loading Dashboard ...</div>}>
        <DashboardLayout />
      </Suspense>
    ),
    children: [
      {
        path: '',
        element: (
          <Suspense fallback={<div>Loading Research Form ...</div>}>
            <ResearchForm />
          </Suspense>
        ),
      },
      {
        path: 'attention-prediction',
        element: (
          <Suspense fallback={<div>Loading Attention Prediction...</div>}>
            <AttentionPrediction />
          </Suspense>
        ),
      },
      {
        path: 'aim-framework',
        element: (
          <Suspense fallback={<div>Loading AIM Framework...</div>}>
            <AIMFramework />
          </Suspense>
        ),
      },
      {
        path: 'behavioural-research',
        element: (
          <Suspense fallback={<div>Loading Behavioural Research...</div>}>
            <BehaviouralResearch />
          </Suspense>
        ),
      },
    ],
  },
];

export default researchRoutes;
