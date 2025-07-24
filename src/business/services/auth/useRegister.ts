import { ServicesGeneralProps } from '@business/shared/types/ServicesGeneralProps.ts';
import { showToasts } from '@business/shared/utils/showToasts.ts';
import { RegisterValidationSchema } from '@business/validations/auth/RegisterValidationSchema.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import authRepository from '@infra/repositories/auth';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export type UseRegisterProps = ServicesGeneralProps;

const useRegister = ({
  showErrorNotification = false,
  showSuccessNotification = true,
  afterSuccess,
  afterError,
}: UseRegisterProps) => {
  const navigate = useNavigate();

  const form = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(RegisterValidationSchema),
  });

  const { isPending, mutateAsync, error } = useMutation({
    mutationFn: authRepository.register,
    onSuccess: async (_data, variables) => {
      if (showSuccessNotification)
        showToasts(
          'Siz uğurla qeydiyyatdan keçdiniz! E-poçtunuzu yoxlayın və zəhmət olmasa OTP kodunu daxil edin.',
          'success',
        );
      navigate(`/confirm-email?email=${variables.email}`);
      if (afterSuccess) afterSuccess();
    },
    onError: resError => {
      if (showErrorNotification) showToasts(resError.message, 'error');
      if (afterError) afterError();
    },
  });

  const handleSubmit = form.handleSubmit(async data => {
    await mutateAsync(data);
  });

  return {
    form,
    loading: isPending,
    signUp: handleSubmit,
    error: error?.message ?? '',
  };
};

export default useRegister;
