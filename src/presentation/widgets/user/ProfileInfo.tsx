import useGetMe from '@business/services/user/useGetMe.ts';
import UserInfoCard from '@presentation/entities/user/ProfileInfoCard.tsx';
import ErrorBox from '@presentation/shared/ui/ErrorBox.tsx';
import Text from '@presentation/shared/ui/Typography.tsx';
import { memo } from 'react';

const ProfileInfo = () => {
  const { loading, me, error } = useGetMe();
  if (loading || !me) {
    return <div>Yüklənir...</div>;
  }
  if (error) {
    return (
      <ErrorBox messages={error.message || 'Profil məlumatlarınızı əldə edərkən xəta baş verdi.'} />
    );
  }
  return (
    <div className="px-4">
      <div className="flex flex-col">
        <Text size="h2">Şəxsi Məlumatlar</Text>
        <Text color="muted" size="subtitle">
          Bu məlumatlar yalnız oxumaq üçündür.
        </Text>
      </div>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
        <UserInfoCard label="Tam Ad" value={`${me.name} ${me.surname}`} />
        <UserInfoCard label="E-poçt" value={me.email} />
        <UserInfoCard label="Telefon" value={me.phone} />
      </div>
    </div>
  );
};

const MemoizedUserInfo = memo(ProfileInfo);

export default MemoizedUserInfo;
