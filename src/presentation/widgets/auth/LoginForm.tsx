import useLogin, { UseLoginProps } from '@business/services/auth/useLogin.ts';
import Button from '@presentation/shared/ui/Button.tsx';
import DividerWithText from '@presentation/shared/ui/DividerWithText.tsx';
import ErrorBox from '@presentation/shared/ui/ErrorBox.tsx';
import FormCard from '@presentation/shared/ui/FormCard.tsx';
import { Input } from '@presentation/shared/ui/Input.tsx';
import Link from '@presentation/shared/ui/Link.tsx';
import PasswordInput from '@presentation/shared/ui/PasswordInput.tsx';
import Text from '@presentation/shared/ui/Typography.tsx';
import { dFunc } from 'd-func.ts';
import { Mail } from 'lucide-react';
import { FC, memo } from 'react';

type LoginFormProps = UseLoginProps;

const LoginForm: FC<LoginFormProps> = ({
  afterSuccess = dFunc,
  afterError = dFunc,
  redirectUrl = '/',
  showSuccessNotification = true,
  showErrorNotification = false,
}) => {
  const { error, form, loading, signIn } = useLogin({
    afterSuccess,
    afterError,
    redirectUrl,
    showSuccessNotification,
    showErrorNotification,
  });

  const {
    register,
    formState: { errors },
  } = form;

  return (
    <FormCard title="Welcome Back" subtitle="Sign in to continue your learning journey">
      <ErrorBox messages={error} />
      <form onSubmit={signIn} className="space-y-6">
        {/* Группа для поля Email */}
        <Input.Group id="email" variant={errors.email ? 'error' : 'default'}>
          <Input.Label>Email Address</Input.Label>
          <Input
            type="email"
            placeholder="Enter your email"
            leftIcon={<Mail size={16} className="text-gray-400" />}
            {...register('email')}
          />
          {errors.email && (
            <Input.ErrorMessage>{errors.email.message as string}</Input.ErrorMessage>
          )}
        </Input.Group>

        {/* Группа для поля Password */}
        <Input.Group id="password" variant={errors.password ? 'error' : 'default'}>
          <Input.Label>Password</Input.Label>
          <PasswordInput placeholder="Enter your password" {...register('password')} />
          {errors.password && (
            <Input.ErrorMessage>{errors.password.message as string}</Input.ErrorMessage>
          )}
        </Input.Group>

        <div className="flex justify-end">
          <Link href="/forgot-password" variant="primary" className="text-sm">
            Forgot your password?
          </Link>
        </div>

        <Button htmlType="submit" variant="primary" className="w-full" disabled={loading}>
          {loading ? 'Signing In...' : 'Sign In'}
        </Button>
      </form>

      <div className="text-center">
        <DividerWithText paddingY="py-4" text="Don't have an account yet?" />
        <div className="flex justify-center">
          <Text color="error" size="p" weight="medium">
            <Link to="/register">Create an account</Link>
          </Text>
        </div>
      </div>
    </FormCard>
  );
};

const MemoizedLoginForm = memo(LoginForm);

export default MemoizedLoginForm;
