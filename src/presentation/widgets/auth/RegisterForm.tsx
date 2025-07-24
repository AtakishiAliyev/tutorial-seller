import useRegister, { UseRegisterProps } from '@business/services/auth/useRegister.ts';
import Button from '@presentation/shared/ui/Button.tsx';
import DividerWithText from '@presentation/shared/ui/DividerWithText.tsx';
import ErrorBox from '@presentation/shared/ui/ErrorBox.tsx';
import FormCard from '@presentation/shared/ui/FormCard.tsx';
import { Input } from '@presentation/shared/ui/Input.tsx';
import Link from '@presentation/shared/ui/Link.tsx';
import PasswordInput from '@presentation/shared/ui/PasswordInput.tsx';
import Text from '@presentation/shared/ui/Typography.tsx';
import { dFunc } from 'd-func.ts';
import { Phone } from 'lucide-react';
import { FC, memo } from 'react';

type RegisterFormProps = UseRegisterProps;

const RegisterForm: FC<RegisterFormProps> = ({
  afterSuccess = dFunc,
  showSuccessNotification = true,
  showErrorNotification = false,
  afterError = dFunc,
}) => {
  const { form, loading, signUp, error } = useRegister({
    showErrorNotification,
    afterError,
    afterSuccess,
    showSuccessNotification,
  });

  const {
    register,
    formState: { errors },
  } = form;

  return (
    <FormCard title="Create Account" subtitle="Join us and start your learning journey">
      <ErrorBox messages={error} />
      <form onSubmit={signUp} className="space-y-4">
        <Input.Row>
          {/* Поле для имени */}
          <Input.Group id="name" variant={errors.name ? 'error' : 'default'}>
            <Input.Label>Name</Input.Label>
            <Input placeholder="Enter your name" {...register('name')} />
            {errors.name && (
              <Input.ErrorMessage>{errors.name.message as string}</Input.ErrorMessage>
            )}
          </Input.Group>

          {/* Поле для фамилии */}
          <Input.Group id="surname" variant={errors.surname ? 'error' : 'default'}>
            <Input.Label>Surname</Input.Label>
            <Input placeholder="Enter your surname" {...register('surname')} />
            {errors.surname && (
              <Input.ErrorMessage>{errors.surname.message as string}</Input.ErrorMessage>
            )}
          </Input.Group>
        </Input.Row>
        {/* Phone Field */}
        <Input.Group id="phone" variant={errors.phone ? 'error' : 'default'}>
          <Input.Label>Phone Number</Input.Label>
          <Input
            type="tel"
            placeholder="+994XXXXXXXXX"
            leftIcon={<Phone size={16} className="text-gray-400" />}
            {...register('phone')}
          />
          {errors.phone && (
            <Input.ErrorMessage>{errors.phone.message as string}</Input.ErrorMessage>
          )}
        </Input.Group>

        {/* Email Field */}
        <Input.Group id="email" variant={errors.email ? 'error' : 'default'}>
          <Input.Label>Email Address</Input.Label>
          <Input type="email" placeholder="Enter your email" {...register('email')} />
          {errors.email && (
            <Input.ErrorMessage>{errors.email.message as string}</Input.ErrorMessage>
          )}
        </Input.Group>

        {/* Password Field */}
        <Input.Group id="password" variant={errors.password ? 'error' : 'default'}>
          <Input.Label>Password</Input.Label>
          <PasswordInput placeholder="Enter your password" {...register('password')} />
          {errors.password && (
            <Input.ErrorMessage>{errors.password.message as string}</Input.ErrorMessage>
          )}
        </Input.Group>

        <Button htmlType="submit" variant="primary" className="w-full mt-2" disabled={loading}>
          {loading ? 'Creating Account...' : 'Create Account'}
        </Button>
      </form>

      <div className="text-center mt-4">
        <DividerWithText paddingY="py-4" text="Already have an account?" />
        <div className="flex justify-center">
          <Text color="error" size="p" weight="medium">
            <Link to="/login">Sign in</Link>
          </Text>
        </div>
      </div>
    </FormCard>
  );
};

const MemoizedRegisterForm = memo(RegisterForm);

export default MemoizedRegisterForm;
