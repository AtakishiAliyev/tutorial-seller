import ResendResetPassword from '@presentation/features/auth/ResendResetPassword.tsx';
import Button from '@presentation/shared/ui/Button.tsx';
import SubmitResetPasswordForm from '@presentation/widgets/auth/SubmitResetPasswordForm.tsx';
import { AlertCircle } from 'lucide-react';
import { memo, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const providedEmail = searchParams.get('email');

  const isEmailValid = useMemo(() => {
    if (!providedEmail) return false;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(providedEmail);
  }, [providedEmail]);

  if (!isEmailValid) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>

            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">Yanlış Məlumat</h3>

            <p className="text-sm text-gray-500 mb-6">
              {!providedEmail
                ? 'Linkdə email ünvanı tapılmadı. Zəhmət olmasa, şifrə yeniləmə linkinə yenidən daxil olun.'
                : 'Linkdəki email ünvanı düzgün formatda deyil. Təhlükəsizlik səbəbindən əməliyyatı davam etdirə bilmirik.'}
            </p>

            <Button variant="primary" className="w-full" onClick={() => navigate('/login')}>
              Giriş səhifəsinə qayıt
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SubmitResetPasswordForm
          providedEmail={providedEmail!}
          resendResetPasswordSlot={<ResendResetPassword showErrorNotification={true} />}
        />
      </div>
    </div>
  );
};

const MemoizedResetPassword = memo(ResetPassword);

export default MemoizedResetPassword;
