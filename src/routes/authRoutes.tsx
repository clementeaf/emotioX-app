/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';

const Login = lazy(() => import('../pages/Login'));

const authRoutes: RouteObject[] = [
  {
    path: '/login',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Login />
      </Suspense>
    ),
  },
];

export default authRoutes;
