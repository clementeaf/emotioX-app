/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import PublicStudyLayout from '../components/Layout/PublicStudyLayout';

const ResearchHistory = lazy(() => import('../components/Dashboard/ResearchHistory/index'));

const researchHistoryRoutes: RouteObject[] = [
    {
        path: '/researchHistory',
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
                <ResearchHistory />
              </Suspense>
            ),
          },
        ],
      },
];

export default researchHistoryRoutes;
