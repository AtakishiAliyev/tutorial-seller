import Text from '@presentation/shared/ui/Typography.tsx';
import ChangePasswordForm from '@presentation/widgets/user/ChangePasswordForm.tsx';
import { memo } from 'react';

const ChangePasswordTab = () => {
  return (
    <div className="flex flex-col gap-5 px-4">
      <div className="flex flex-col">
        <Text size="h2">Change Password</Text>
        <Text size="subtitle" color="muted">
          Choose a strong password and don't reuse it for other accounts.
        </Text>
      </div>
      <ChangePasswordForm />
    </div>
  );
};

const MemoizedChangePasswordTab = memo(ChangePasswordTab);

export default MemoizedChangePasswordTab;
