import Text from '@presentation/shared/ui/Typography.tsx';
import ChangePasswordForm from '@presentation/widgets/user/ChangePasswordForm.tsx';
import { memo } from 'react';

const ChangePasswordTab = () => {
  return (
    <div className="flex flex-col gap-5 px-4">
      <div className="flex flex-col">
        <Text size="h2">Şifrəni Dəyiş</Text>
        <Text size="subtitle" color="muted">
          Güclü bir şifrə seçin və onu digər hesablar üçün təkrar istifadə etməyin.
        </Text>
      </div>
      <ChangePasswordForm />
    </div>
  );
};

const MemoizedChangePasswordTab = memo(ChangePasswordTab);

export default MemoizedChangePasswordTab;
