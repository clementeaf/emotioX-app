import { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import { PublicTopBar } from '../components/Clients/PublicTopBar';
import { Box } from '@mui/material';
import DynamicForm, { FieldConfig } from '../components/Clients/DynamicForm';
import publicStudy1 from '../config/publicStudy1.json';
import publicStudy2 from '../config/publicStudy2.json';
import publicStudy3 from '../config/publicStudy3.json';
import publicStudy4 from '../config/publicStudy4.json';

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
            {
                path: 'dynamicPublicStudy',
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
                            <DynamicForm formConfig={publicStudy1} onSubmit={() => {}} />
                        </Box>
                    </Suspense>
                ),
            },
            {
                path: 'dynamicPublicStudy2',
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
                            <DynamicForm formConfig={publicStudy2} onSubmit={() => {}} />
                        </Box>
                    </Suspense>
                ),
            },
            {
                path: 'dynamicPublicStudy3',
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
                            <DynamicForm formConfig={publicStudy3 as FieldConfig[]} onSubmit={() => {}} />
                        </Box>
                    </Suspense>
                ),
            },
            {
                path: 'dynamicPublicStudy4',
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
                            <DynamicForm formConfig={publicStudy4 as FieldConfig[]} onSubmit={() => {}} />
                        </Box>
                    </Suspense>
                ),
            },
        ],
    },
];

export default publicStudiesRoutes;
