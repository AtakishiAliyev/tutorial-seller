import useGetMe from '@business/services/user/useGetMe.ts';
import Fallback from '@presentation/shared/ui/Fallback.tsx';
import { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

type UnAuthorizedOnlyRouteProps = {
  children: ReactNode;
};

const UnAuthorizedOnlyRoute: FC<UnAuthorizedOnlyRouteProps> = ({ children }) => {
  const { loading, me } = useGetMe();

  if (loading)
    return (
      <div>
        <Fallback isFullScreen={true} />
      </div>
    );

  if (me) return <Navigate to="/" replace />;

  return <> {children}</>;
};

export default UnAuthorizedOnlyRoute;
