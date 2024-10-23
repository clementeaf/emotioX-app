/* eslint-disable react-refresh/only-export-components */
// src/routes/dashboardRoutes.tsx
import { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import { PublicTopBar } from '../components/Clients/PublicTopBar';
import { Box } from '@mui/material';

const PublicStudy = lazy(() => import('../components/Clients/PublicClientsFormSteps'));
const PublicCognitiveStudy = lazy(() => import('../components/Clients/PublicCognitiveFormSteps'));
const PublishedStudy = lazy(() => import('../components/Clients/PublishedStudy'));

const publicStudiesRoutes: RouteObject[] = [
    {
        path: '/public',
        children: [
            {
                path: 'publicStudy',
                element: (
                    <Suspense fallback={<div>Loading public studies ...</div>}>
                        <PublicTopBar />
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100%',
                            height: '100vh',
                            gap: 2,
                        }}>
                            <PublicStudy />
                        </Box>
                    </Suspense>
                ),
            },
            {
                path: 'cognitiveStudy',
                element: (
                    <Suspense fallback={<div>Loading cognitive studies ...</div>}>
                        <PublicTopBar />
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100%',
                            height: '100vh',
                            gap: 2,
                        }}>
                            <PublicCognitiveStudy />
                        </Box>
                    </Suspense>
                ),
            },
            {
                path: 'publishedStudies',
                element: (
                    <Suspense fallback={<div>Loading published Main ...</div>}>
                        <PublicTopBar />
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100%',
                            height: '100vh',
                            gap: 2,
                        }}>
                            <PublishedStudy />
                        </Box>
                    </Suspense>
                ),
            },
        ],
    },
];

export default publicStudiesRoutes;
