import useLogout from '@business/services/auth/useLogout.ts';
import Button from '@presentation/shared/ui/Button';
import Text from '@presentation/shared/ui/Typography';
import { memo } from 'react';

const LogoutTab = () => {
  const { logout } = useLogout();

  return (
    <div className="p-8">
      <div className="mb-4 flex flex-col">
        <Text size="h2">Hesab Təhlükəsizliyi</Text>
        <Text color="muted" size="subtitle">
          Hesabınızdan çıxış edin və təhlükəsizliyinizi təmin edin
        </Text>
      </div>
      <Button
        variant="outline"
        className="border-red-500 text-red-600 hover:bg-red-50"
        onClick={logout}
      >
        Çıxış Et
      </Button>
    </div>
  );
};

const MemoizedLogoutTab = memo(LogoutTab);

export default memo(MemoizedLogoutTab);
