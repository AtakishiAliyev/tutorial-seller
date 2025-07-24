import RegisterForm from '@presentation/widgets/auth/RegisterForm.tsx';
import { memo } from 'react';

const Register = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <RegisterForm />
      </div>
    </div>
  );
};

const MemoizedRegister = memo(Register);

export default MemoizedRegister;
