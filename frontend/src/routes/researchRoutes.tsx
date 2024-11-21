// src/routes/researchRoutes.tsx
import { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import DashboardLayout from '../components/Layout/DashboardLayout';

const ResearchForm = lazy(() => import('../components/ResearchCreationForm/ResearchForm'));
const AttentionPrediction = lazy(() => import('../components/Dashboard/AttentionPredictionMoule/AttentionPrediction'));
const AIMFrameworkWrapper = lazy(() => import('../components/Dashboard/AIMFrameworkModule/AIMFrameworkWrapper'));
const BehaviouralResearchWrapper = lazy(() => import('../components/Dashboard/BehaviouralResearch/BehaviouralResearchWrapper'));

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
            <AIMFrameworkWrapper />
          </Suspense>
        ),
      },
      {
        path: 'behavioural-research',
        element: (
          <Suspense fallback={<div>Loading Behavioural Research...</div>}>
            <BehaviouralResearchWrapper />
          </Suspense>
        ),
      },
    ],
  },
];

export default researchRoutes;
