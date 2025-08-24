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
    <FormCard title="Hesab Yarat" subtitle="Bizə qoşul və öyrənmə səyahətinə başla">
      <ErrorBox messages={error} />
      <form onSubmit={signUp} className="space-y-4">
        <Input.Row>
          {/* Ad sahəsi */}
          <Input.Group id="name" variant={errors.name ? 'error' : 'default'}>
            <Input.Label>Ad</Input.Label>
            <Input placeholder="Adınızı daxil edin" {...register('name')} />
            {errors.name && (
              <Input.ErrorMessage>{errors.name.message as string}</Input.ErrorMessage>
            )}
          </Input.Group>

          {/* Soyad sahəsi */}
          <Input.Group id="surname" variant={errors.surname ? 'error' : 'default'}>
            <Input.Label>Soyad</Input.Label>
            <Input placeholder="Soyadınızı daxil edin" {...register('surname')} />
            {errors.surname && (
              <Input.ErrorMessage>{errors.surname.message as string}</Input.ErrorMessage>
            )}
          </Input.Group>
        </Input.Row>

        {/* Telefon nömrəsi sahəsi */}
        <Input.Group id="phone" variant={errors.phone ? 'error' : 'default'}>
          <Input.Label>Telefon Nömrəsi</Input.Label>
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

        {/* Email ünvanı sahəsi */}
        <Input.Group id="email" variant={errors.email ? 'error' : 'default'}>
          <Input.Label>Email Ünvanı</Input.Label>
          <Input type="email" placeholder="Email ünvanınızı daxil edin" {...register('email')} />
          {errors.email && (
            <Input.ErrorMessage>{errors.email.message as string}</Input.ErrorMessage>
          )}
        </Input.Group>

        {/* Şifrə sahəsi */}
        <Input.Group id="password" variant={errors.password ? 'error' : 'default'}>
          <Input.Label>Şifrə</Input.Label>
          <PasswordInput placeholder="Şifrənizi daxil edin" {...register('password')} />
          {errors.password && (
            <Input.ErrorMessage>{errors.password.message as string}</Input.ErrorMessage>
          )}
        </Input.Group>

        <Button htmlType="submit" variant="primary" className="w-full mt-2" disabled={loading}>
          {loading ? 'Hesab yaradılır...' : 'Hesab Yarat'}
        </Button>
      </form>

      <div className="text-center mt-4">
        <DividerWithText paddingY="py-4" text="Artıq hesabınız var?" />
        <div className="flex justify-center">
          <Text color="error" size="p" weight="medium">
            <Link to="/login">Daxil ol</Link>
          </Text>
        </div>
      </div>
    </FormCard>
  );
};

const MemoizedRegisterForm = memo(RegisterForm);

export default MemoizedRegisterForm;
