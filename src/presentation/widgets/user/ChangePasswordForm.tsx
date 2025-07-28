import useChangePassword, {
  UseChangePasswordProps,
} from '@business/services/auth/useChangePassword.ts';
import Button from '@presentation/shared/ui/Button.tsx';
import ErrorBox from '@presentation/shared/ui/ErrorBox.tsx';
import { Input } from '@presentation/shared/ui/Input.tsx';
import PasswordInput from '@presentation/shared/ui/PasswordInput.tsx';
import { dFunc } from 'd-func.ts';
import { FC, memo } from 'react';

type ServicesGeneralProps = UseChangePasswordProps & {};

const ChangePasswordForm: FC<ServicesGeneralProps> = ({
  afterSuccess = dFunc,
  showSuccessNotification = true,
  showErrorNotification = false,
  afterError = dFunc,
  clearForm,
}) => {
  const { form, changePassword, loading, error } = useChangePassword({
    showErrorNotification,
    afterError,
    afterSuccess,
    showSuccessNotification,
    clearForm,
  });
  const errors = form.formState.errors;
  const register = form.register;
  return (
    <>
      <ErrorBox messages={error} />
      <form
        aria-disabled={loading}
        onSubmit={changePassword}
        className="space-y-6 flex flex-col items-center"
      >
        <Input.Row className="flex flex-col md:flex-row items-start justify-between gap-4">
          <Input.Group id="oldPassword" variant={errors.oldPassword ? 'error' : 'default'}>
            <Input.Label>Current Password</Input.Label>
            <PasswordInput placeholder="Enter your current password" {...register('oldPassword')} />
            {errors.oldPassword && (
              <Input.ErrorMessage>{errors.oldPassword.message as string}</Input.ErrorMessage>
            )}
          </Input.Group>

          <Input.Group id="newPassword" variant={errors.newPassword ? 'error' : 'default'}>
            <Input.Label>New Password</Input.Label>
            <PasswordInput placeholder="Enter your new password" {...register('newPassword')} />
            {errors.newPassword && (
              <Input.ErrorMessage>{errors.newPassword.message as string}</Input.ErrorMessage>
            )}
          </Input.Group>
        </Input.Row>
        <Input.Group
          id="submitNewPassword"
          variant={errors.submitNewPassword ? 'error' : 'default'}
        >
          <Input.Label>Confirm New Password</Input.Label>
          <PasswordInput
            placeholder="Confirm your new password"
            {...register('submitNewPassword')}
          />
          {errors.submitNewPassword && (
            <Input.ErrorMessage>{errors?.submitNewPassword?.message as string}</Input.ErrorMessage>
          )}
        </Input.Group>
        <Button
          htmlType="submit"
          variant="primary"
          className="w-full max-w-[400px]"
          disabled={loading}
        >
          {loading ? 'Changing password...' : 'Change Password'}
        </Button>
      </form>
    </>
  );
};

const MemoizedChangePasswordForm = memo(ChangePasswordForm);

export default MemoizedChangePasswordForm;
