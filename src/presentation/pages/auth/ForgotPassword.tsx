import ForgotPasswordRequestForm from '@presentation/widgets/auth/ForgotPasswordRequestForm.tsx';
import { memo } from 'react';

const ForgotPassword = () => {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <div className="w-full max-w-md">
            <ForgotPasswordRequestForm />
          </div>
        </div>
      </div>
    </main>
  );
};

const MemoizedForgotPassword = memo(ForgotPassword);

export default MemoizedForgotPassword;
