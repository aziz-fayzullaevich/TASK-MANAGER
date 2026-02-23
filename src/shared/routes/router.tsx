import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ROUTES } from './routes';
import { lazy, Suspense } from 'react';
import Layout from '../constants/layout';
import { CustomLoader } from '../ui/custom-loader';
import NotFound from '../../pages/not-found';

const TasksPage = lazy(() => import('../../pages/tasks/tasks'));
const SettingsPage = lazy(() => import('../../pages/settings/settings'));

export const router = createBrowserRouter([
    {
        path: ROUTES.HOME,
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Navigate to={ROUTES.TASKS} replace />
            },
            {
                path: ROUTES.TASKS,
                element: (
                    <Suspense fallback={<CustomLoader />}>
                        <TasksPage />
                    </Suspense>
                ),
            },
            {
                path: ROUTES.TASK_SHOW,
                element: <Suspense fallback={<CustomLoader />}><div>Task Detail</div></Suspense>,
            },
            {
                path: ROUTES.SETTINGS,
                element: <Suspense fallback={<CustomLoader />}> <SettingsPage /> </Suspense>,
            },
        ]
    }, {
        path: ROUTES.NOT_FOUND,
        element: <NotFound />,
    },
]);