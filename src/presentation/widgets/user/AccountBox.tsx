import useGetMe from '@business/services/user/useGetMe.ts';
import ErrorBox from '@presentation/shared/ui/ErrorBox.tsx';
import Link from '@presentation/shared/ui/Link.tsx';
import Text from '@presentation/shared/ui/Typography';
import { cn } from '@presentation/shared/utils/cn.ts';
import { memo } from 'react';

const AccountBox = () => {
  const { me, loading, error } = useGetMe();

  const renderAvatar = () => {
    if (!me?.name) return null;
    const initial = me.name.charAt(0).toUpperCase();
    const colors = [
      'bg-red-500',
      'bg-blue-500',
      'bg-green-500',
      'bg-yellow-500',
      'bg-purple-500',
      'bg-indigo-500',
    ];
    const idx = initial.charCodeAt(0) % colors.length;
    const bgClass = colors[idx];

    return (
      <div
        className={cn(
          'w-8 h-8 hidden md:flex rounded-full items-center justify-center text-white font-medium',
          bgClass,
        )}
      >
        {initial}
      </div>
    );
  };

  if (loading) {
    return <div className="flex items-center">Loading...</div>;
  }
  if (error && error.statusCode !== 401) {
    return (
      <ErrorBox messages="Oops! Something went wrong while getting your profile data. Please, try again later." />
    );
  }

  return (
    <div className="flex items-center space-x-3">
      {me ? (
        <>
          {renderAvatar()}
          <Link to="/profile">
            <Text className="md:block hidden" size="p" weight="medium" color="secondary">
              {me.name} {me.surname}
            </Text>
            <Text className="block md:hidden" size="p" weight="medium" color="secondary">
              Profile
            </Text>
          </Link>
        </>
      ) : (
        <div className="flex items-center space-x-2">
          <Link variant="primary" to="/login">
            Sign In
          </Link>
          <span>|</span>
          <Link variant="muted" to="/register">
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
};

const MemoizedAccountBox = memo(AccountBox);

export default MemoizedAccountBox;
