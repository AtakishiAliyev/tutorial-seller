import MainLayout from '@presentation/layouts/MainLayout';
import Fallback from '@presentation/shared/ui/Fallback.tsx';
import { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';

const HomePage = lazy(() => import('@presentation/pages/Home'));

export const routeConfig: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<Fallback isFullScreen={true} />}>
            <HomePage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '*',
    // element: <Suspense fallback={<Fallback />}><NotFoundPage /></Suspense>,
  },
];
