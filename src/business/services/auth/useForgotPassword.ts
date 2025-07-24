import { ServicesGeneralProps } from '@business/shared/types/ServicesGeneralProps.ts';
import { showToasts } from '@business/shared/utils/showToasts.ts';
import { ForgotPasswordValidationSchema } from '@business/validations/auth/ForgotPasswordValidationSchema.js';
import { zodResolver } from '@hookform/resolvers/zod';
import authRepository from '@infra/repositories/auth';
import { useMutation } from '@tanstack/react-query';
import { dFunc } from 'd-func.ts';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export type UseForgotPasswordProps = ServicesGeneralProps;

const useForgotPassword = ({
  afterSuccess = dFunc,
  afterError = dFunc,
  showSuccessNotification = true,
  showErrorNotification = false,
}: UseForgotPasswordProps) => {
  const navigate = useNavigate();
  const { error, isPending, mutateAsync, isError } = useMutation({
    mutationFn: authRepository.forgotPassword,
    onSuccess: async () => {
      if (showSuccessNotification)
        showToasts('Zəhmət olmasa e-poçtunuzu yoxlayın və OTP kodunu daxil edin.', 'success');
      if (afterSuccess) afterSuccess();
    },
    onError: async resError => {
      if (showErrorNotification) showToasts(resError.message, 'error');
      if (afterError) afterError();
    },
  });

  const form = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(ForgotPasswordValidationSchema),
  });

  const handleSubmit = form.handleSubmit(async data => {
    await mutateAsync(data);
    navigate(`/reset-password?email=${data.email}`);
  });

  return {
    form,
    loading: isPending,
    forgotPassword: handleSubmit,
    error: isError ? error?.message : '',
  };
};

export default useForgotPassword;
