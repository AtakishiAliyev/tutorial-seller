import useConfirmEmail, { UseConfirmEmailProps } from '@business/services/auth/useConfirmEmail';
import Button from '@presentation/shared/ui/Button.tsx';
import DividerWithText from '@presentation/shared/ui/DividerWithText.tsx';
import ErrorBox from '@presentation/shared/ui/ErrorBox.tsx';
import FormCard from '@presentation/shared/ui/FormCard.tsx';
import { Input } from '@presentation/shared/ui/Input.tsx';
import Link from '@presentation/shared/ui/Link.tsx';
import OTPInput from '@presentation/shared/ui/OTPInput.tsx';
import Text from '@presentation/shared/ui/Typography.tsx';
import { dFunc } from 'd-func.ts';
import { memo, ReactNode } from 'react';
import { FC } from 'react';
import { Controller } from 'react-hook-form';

type ConfirmEmailFormProps = UseConfirmEmailProps & {
  resendConfirmationEmailSlot: ReactNode;
};

const ConfirmEmailForm: FC<ConfirmEmailFormProps> = ({
  afterSuccess = dFunc,
  showSuccessNotification = true,
  showErrorNotification = false,
  afterError = dFunc,
  providedEmail,
  resendConfirmationEmailSlot,
}) => {
  const {
    loading,
    userEmail,
    confirmEmail,
    form,
    error: confirmError,
  } = useConfirmEmail({
    showErrorNotification,
    afterError,
    afterSuccess,
    showSuccessNotification,
    providedEmail,
  });

  const control = form.control;

  const { errors } = form.formState;

  return (
    <FormCard
      title="Confirm Your Email"
      subtitle={
        userEmail
          ? `We've sent a confirmation code to ${userEmail}`
          : 'Please enter the confirmation code sent to your email'
      }
    >
      <ErrorBox messages={confirmError} />

      <form onSubmit={confirmEmail} className="space-y-6">
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

          <div className="mt-4 w-full">
            <Button htmlType="submit" variant="primary" className="w-full" disabled={loading}>
              {loading ? 'Verifying...' : 'Verify Email'}
            </Button>
          </div>
        </div>
      </form>

      <div className="mt-6 text-center flex flex-col gap-4">
        <Text color="secondary" size="p">
          Didn't receive the сode?
        </Text>
        {resendConfirmationEmailSlot}
      </div>

      <div className="mt-4 text-center">
        <DividerWithText paddingY="py-4" text="Return to Sign Up" />
        <div className="flex justify-center">
          <Text color="error" size="p" weight="medium">
            <Link to="/register">Sign Up</Link>
          </Text>
        </div>
      </div>
    </FormCard>
  );
};

const MemoizedConfirmEmailForm = memo(ConfirmEmailForm);

export default MemoizedConfirmEmailForm;
