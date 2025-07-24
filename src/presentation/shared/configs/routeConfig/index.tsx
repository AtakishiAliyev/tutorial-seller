import CheckRouteParams from '@presentation/guards/CheckRouteParams.tsx';
import UnAuthorizedOnlyRoute from '@presentation/guards/UnAuthorizedOnlyRoute.tsx';
import MainLayout from '@presentation/layouts/MainLayout';
import Fallback from '@presentation/shared/ui/Fallback.tsx';
import { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';

const HomePage = lazy(() => import('@presentation/pages/Home'));
const LoginPage = lazy(() => import('@presentation/pages/auth/Login.tsx'));
const RegisterPage = lazy(() => import('@presentation/pages/auth/Register.tsx'));
const ConfirmEmailPage = lazy(() => import('@presentation/pages/auth/ConfirmEmail.tsx'));
const ForgotPasswordPage = lazy(() => import('@presentation/pages/auth/ForgotPassword.tsx'));
const ResetPasswordPage = lazy(() => import('@presentation/pages/auth/ResetPassword.tsx'));

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
    path: '/login',
    element: (
      <UnAuthorizedOnlyRoute>
        <Suspense fallback={<Fallback isFullScreen={true} />}>
          <LoginPage />
        </Suspense>
      </UnAuthorizedOnlyRoute>
    ),
  },
  {
    path: '/register',
    element: (
      <UnAuthorizedOnlyRoute>
        <Suspense fallback={<Fallback isFullScreen={true} />}>
          <RegisterPage />
        </Suspense>
      </UnAuthorizedOnlyRoute>
    ),
  },
  {
    path: '/confirm-email',
    element: (
      <UnAuthorizedOnlyRoute>
        <CheckRouteParams requiredParams={['email']}>
          <Suspense fallback={<Fallback isFullScreen={true} />}>
            <ConfirmEmailPage />
          </Suspense>
        </CheckRouteParams>
      </UnAuthorizedOnlyRoute>
    ),
  },
  {
    path: '/reset-password',
    element: (
      <UnAuthorizedOnlyRoute>
        <CheckRouteParams requiredParams={['email']}>
          <Suspense fallback={<Fallback isFullScreen={true} />}>
            <ResetPasswordPage />
          </Suspense>
        </CheckRouteParams>
      </UnAuthorizedOnlyRoute>
    ),
  },
  {
    path: '/forgot-password',
    element: (
      <UnAuthorizedOnlyRoute>
        <Suspense fallback={<Fallback isFullScreen={true} />}>
          <ForgotPasswordPage />
        </Suspense>
      </UnAuthorizedOnlyRoute>
    ),
  },
  {
    path: '*',
    // element: <Suspense fallback={<Fallback />}><NotFoundPage /></Suspense>,
  },
];
