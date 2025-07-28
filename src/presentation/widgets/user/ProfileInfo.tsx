import useGetMe from '@business/services/user/useGetMe.ts';
import UserInfoCard from '@presentation/entities/user/ProfileInfoCard.tsx';
import ErrorBox from '@presentation/shared/ui/ErrorBox.tsx';
import Text from '@presentation/shared/ui/Typography.tsx';
import { memo } from 'react';

const ProfileInfo = () => {
  const { loading, me, error } = useGetMe();
  if (loading || !me) {
    return <div>Loading...</div>;
  }
  if (error) {
    return (
      <ErrorBox
        messages={error.message || 'An error occurred while getting your profile information.'}
      />
    );
  }
  return (
    <div className="px-4">
      <div className="flex flex-col">
        <Text size="h2">Personal Information</Text>
        <Text color="muted" size="subtitle">
          This information is read-only.
        </Text>
      </div>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
        <UserInfoCard label="Full Name" value={`${me.name} ${me.surname}`} />
        <UserInfoCard label="Email" value={me.email} />
        <UserInfoCard label="Phone" value={me.phone} />
      </div>
    </div>
  );
};

const MemoizedUserInfo = memo(ProfileInfo);

export default MemoizedUserInfo;
