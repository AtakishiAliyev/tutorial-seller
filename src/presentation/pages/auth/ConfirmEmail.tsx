import ResendConfirmationEmail from '@presentation/features/auth/ResendConfirmationEmail.tsx';
import ConfirmEmailForm from '@presentation/widgets/auth/ConfirmEmailForm.tsx';
import { memo } from 'react';

const ConfirmEmail = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ConfirmEmailForm
          resendConfirmationEmailSlot={<ResendConfirmationEmail showErrorNotification={true} />}
        />
      </div>
    </div>
  );
};

const MemoizedConfirmEmail = memo(ConfirmEmail);

export default MemoizedConfirmEmail;
