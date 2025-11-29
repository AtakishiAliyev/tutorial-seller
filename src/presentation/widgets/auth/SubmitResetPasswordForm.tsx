import useResetPassword, {
  UseResetPasswordProps,
} from '@business/services/auth/useResetPassword.ts';
import Button from '@presentation/shared/ui/Button.tsx';
import ErrorBox from '@presentation/shared/ui/ErrorBox.tsx';
import FormCard from '@presentation/shared/ui/FormCard.tsx';
import { Input } from '@presentation/shared/ui/Input.tsx';
import PasswordInput from '@presentation/shared/ui/PasswordInput.tsx';
import { dFunc } from 'd-func.ts';
import { FC, memo, ReactNode } from 'react';

type SubmitResetPasswordFormProps = UseResetPasswordProps & {
  resendResetPasswordSlot?: ReactNode;
};

const SubmitResetPasswordForm: FC<SubmitResetPasswordFormProps> = ({
  resendResetPasswordSlot,
  afterSuccess = dFunc,
  showSuccessNotification = true,
  showErrorNotification = false,
  afterError = dFunc,
  providedEmail,
}) => {
  const { form, loading, resetPassword, error, userEmail } = useResetPassword({
    showErrorNotification,
    afterError,
    afterSuccess,
    showSuccessNotification,
    providedEmail,
  });

  const {
    register,
    formState: { errors },
  } = form;

  const subtitle = userEmail
    ? `${userEmail} ünvanına göndərilən təsdiq kodunu daxil edin`
    : 'Emailinizə göndərilən təsdiq kodunu və yeni şifrənizi daxil edin';

  return (
    <FormCard title="Şifrəni Yenilə" subtitle={subtitle}>
      <ErrorBox messages={error} />

      <form onSubmit={resetPassword} className="space-y-4">
        <Input.Group id="token" variant={errors.token ? 'error' : 'default'}>
          <Input.Label>Təsdiq Kodu</Input.Label>
          <Input placeholder="Kodu daxil edin" {...register('token')} />
          {errors.token && (
            <Input.ErrorMessage>{errors.token.message as string}</Input.ErrorMessage>
          )}
        </Input.Group>

        <Input.Group id="password" variant={errors.password ? 'error' : 'default'}>
          <Input.Label>Yeni Şifrə</Input.Label>
          <PasswordInput placeholder="Yeni şifrənizi daxil edin" {...register('password')} />
          {errors.password && (
            <Input.ErrorMessage>{errors.password.message as string}</Input.ErrorMessage>
          )}
        </Input.Group>

        <Input.Group id="submitPassword" variant={errors.submitPassword ? 'error' : 'default'}>
          <Input.Label>Şifrəni Təsdiqlə</Input.Label>
          <PasswordInput
            placeholder="Şifrənizi yenidən daxil edin"
            {...register('submitPassword')}
          />
          {errors.submitPassword && (
            <Input.ErrorMessage>{errors.submitPassword.message as string}</Input.ErrorMessage>
          )}
        </Input.Group>

        <Button htmlType="submit" variant="primary" className="w-full mt-2" disabled={loading}>
          {loading ? 'Yenilənir...' : 'Yenilə'}
        </Button>
      </form>

      {resendResetPasswordSlot && (
        <div className="mt-6 pt-4 border-t border-gray-100">{resendResetPasswordSlot}</div>
      )}
    </FormCard>
  );
};

const MemoizedSubmitResetPasswordForm = memo(SubmitResetPasswordForm);

export default MemoizedSubmitResetPasswordForm;
