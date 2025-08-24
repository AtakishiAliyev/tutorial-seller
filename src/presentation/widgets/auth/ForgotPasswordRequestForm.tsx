import useForgotPassword, {
  UseForgotPasswordProps,
} from '@business/services/auth/useForgotPassword.ts';
import Button from '@presentation/shared/ui/Button.tsx';
import DividerWithText from '@presentation/shared/ui/DividerWithText.tsx';
import ErrorBox from '@presentation/shared/ui/ErrorBox.tsx';
import FormCard from '@presentation/shared/ui/FormCard.tsx';
import { Input } from '@presentation/shared/ui/Input.tsx';
import Link from '@presentation/shared/ui/Link.tsx';
import Text from '@presentation/shared/ui/Typography.tsx';
import { dFunc } from 'd-func.ts';
import { FC, memo } from 'react';

type ForgotPasswordRequestFormProps = UseForgotPasswordProps;

const ForgotPasswordRequestForm: FC<ForgotPasswordRequestFormProps> = ({
  afterSuccess = dFunc,
  afterError = dFunc,
  showSuccessNotification = true,
  showErrorNotification = false,
}) => {
  const { loading, forgotPassword, form, error } = useForgotPassword({
    showErrorNotification,
    afterError,
    afterSuccess,
    showSuccessNotification,
  });
  const errors = form.formState.errors;
  const register = form.register;

  return (
    <FormCard title="Şifrənizi unutmusunuz?" subtitle="Bərpa etmək üçün e-poçtunuzu daxil edin">
      <ErrorBox messages={error} />
      <form onSubmit={forgotPassword} className="space-y-4">
        <Input.Group id="email" variant={errors.email ? 'error' : 'default'}>
          <Input.Label>E-poçt ünvanı</Input.Label>
          <Input type="email" placeholder="E-poçtunuzu daxil edin" {...register('email')} />
          {errors.email && (
            <Input.ErrorMessage>{errors.email.message as string}</Input.ErrorMessage>
          )}
        </Input.Group>
        <Button htmlType="submit" variant="primary" className="w-full mt-2" disabled={loading}>
          {loading ? 'OTP kodu göndərilir...' : 'OTP kodunu göndər'}
        </Button>
      </form>

      <div className="text-center mt-4">
        <DividerWithText paddingY="py-4" text="Şifrənizi xatırladınız?" />
        <div className="flex justify-center">
          <Text color="error" size="p" weight="medium">
            <Link to="/login">Daxil olun</Link>
          </Text>
        </div>
      </div>
    </FormCard>
  );
};

const MemoizedForgotPasswordRequestForm = memo(ForgotPasswordRequestForm);

export default MemoizedForgotPasswordRequestForm;
