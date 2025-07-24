import useResetPassword, {
  UseResetPasswordProps,
} from '@business/services/auth/useResetPassword.ts';
import Button from '@presentation/shared/ui/Button.tsx';
import DividerWithText from '@presentation/shared/ui/DividerWithText.tsx';
import ErrorBox from '@presentation/shared/ui/ErrorBox.tsx';
import FormCard from '@presentation/shared/ui/FormCard.tsx';
import { Input } from '@presentation/shared/ui/Input.tsx';
import Link from '@presentation/shared/ui/Link.tsx';
import OTPInput from '@presentation/shared/ui/OTPInput.tsx';
import Text from '@presentation/shared/ui/Typography.tsx';
import { dFunc } from 'd-func.ts';
import { FC, memo, ReactNode } from 'react';
import { Controller } from 'react-hook-form';

type SubmitResetPasswordFormProps = UseResetPasswordProps & {
  resendResetPasswordSlot?: ReactNode;
};

const SubmitResetPasswordForm: FC<SubmitResetPasswordFormProps> = ({
  afterSuccess = dFunc,
  afterError = dFunc,
  showSuccessNotification = true,
  showErrorNotification = false,
  providedEmail,
  resendResetPasswordSlot,
}) => {
  const { loading, userEmail, resetPassword, form, error } = useResetPassword({
    showErrorNotification,
    afterError,
    afterSuccess,
    showSuccessNotification,
    providedEmail,
  });

  const control = form.control;
  const register = form.register;
  const { errors } = form.formState;

  return (
    <FormCard
      title="Reset Your Password"
      subtitle={
        userEmail
          ? `Enter the code sent to ${userEmail} and your new password`
          : 'Enter the verification code and create a new password'
      }
    >
      <ErrorBox messages={error} />

      <form onSubmit={resetPassword} className="space-y-6">
        <div className="flex flex-col items-center">
          <Input.Group id="token" variant={errors.token ? 'error' : 'default'}>
            <Input.Label className="text-center">Verification Code</Input.Label>
            <Text color="muted" className="mb-4 text-center w-full">
              <p>Enter the 6-digit code from your email</p>
            </Text>

            <Controller
              name="token"
              control={control}
              render={({ field }) => (
                <OTPInput
                  length={6}
                  value={field.value}
                  onChange={field.onChange}
                  variant={errors.token ? 'error' : 'default'}
                />
              )}
            />

            {errors.token && (
              <Input.ErrorMessage className="mt-2 text-center">
                {errors.token.message as string}
              </Input.ErrorMessage>
            )}
          </Input.Group>
        </div>

        <Input.Group id="newPassword" variant={errors.password ? 'error' : 'default'}>
          <Input.Label>New Password</Input.Label>
          <Input type="password" placeholder="Enter your new password" {...register('password')} />
          {errors.password && (
            <Input.ErrorMessage>{errors.password.message as string}</Input.ErrorMessage>
          )}
        </Input.Group>

        <Input.Group id="confirmPassword" variant={errors.submitPassword ? 'error' : 'default'}>
          <Input.Label>Confirm Password</Input.Label>
          <Input
            type="password"
            placeholder="Confirm your new password"
            {...register('submitPassword')}
          />
          {errors.submitPassword && (
            <Input.ErrorMessage>{errors.submitPassword.message as string}</Input.ErrorMessage>
          )}
        </Input.Group>

        <Button htmlType="submit" variant="primary" className="w-full" disabled={loading}>
          {loading ? 'Resetting Password...' : 'Reset Password'}
        </Button>
      </form>

      {resendResetPasswordSlot && (
        <div className="mt-6 text-center flex flex-col gap-4">
          <Text color="secondary" size="p">
            Didn't receive the code?
          </Text>
          {resendResetPasswordSlot}
        </div>
      )}

      <div className="mt-4 text-center">
        <DividerWithText paddingY="py-4" text="Remember your password?" />
        <div className="flex justify-center">
          <Text color="error" size="p" weight="medium">
            <Link to="/login">Sign In</Link>
          </Text>
        </div>
      </div>
    </FormCard>
  );
};

const MemoizedSubmitResetPasswordForm = memo(SubmitResetPasswordForm);

export default MemoizedSubmitResetPasswordForm;
