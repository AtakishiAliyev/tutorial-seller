import LoginForm from '@presentation/widgets/auth/LoginForm.tsx';
import { memo } from 'react';

const Login = () => {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <div className="w-full max-w-md">
            <LoginForm />
          </div>
        </div>
      </div>
    </main>
  );
};

const MemoizedLogin = memo(Login);

export default MemoizedLogin;
