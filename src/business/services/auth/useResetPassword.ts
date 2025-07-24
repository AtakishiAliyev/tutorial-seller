import { ServicesGeneralProps } from '@business/shared/types/ServicesGeneralProps.ts';
import { showToasts } from '@business/shared/utils/showToasts.ts';
import { ResetPasswordValidationSchema } from '@business/validations/auth/ResetPasswordValidationSchema.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import authRepository from '@infra/repositories/auth';
import { useMutation } from '@tanstack/react-query';
import { dFunc } from 'd-func.ts';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';

export type UseResetPasswordProps = ServicesGeneralProps & {
  providedEmail?: string;
};

const useResetPassword = ({
  afterSuccess = dFunc,
  afterError = dFunc,
  showSuccessNotification = true,
  showErrorNotification = false,
  providedEmail,
}: UseResetPasswordProps) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleResetPassword = useCallback(
    async (data: { token: string; password: string }) => {
      const email = providedEmail || searchParams.get('email');

      if (!email) {
        throw new Error('Email tapılmadı');
      }

      await authRepository.resetPassword({ ...data, email });
    },
    [providedEmail, searchParams],
  );

  const { error, isPending, mutateAsync, isError } = useMutation({
    mutationFn: handleResetPassword,
    onSuccess: async () => {
      if (showSuccessNotification)
        showToasts(
          'Siz parolunuzu uğurla dəyişdiniz. Zəhmət olmasa daxil olmağa çalışın',
          'success',
        );
      if (afterSuccess) afterSuccess();

      navigate('/login');
    },
    onError: async resError => {
      if (showErrorNotification) showToasts(resError.message, 'error');
      if (afterError) afterError();
    },
  });

  const form = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(ResetPasswordValidationSchema),
  });

  const handleSubmit = form.handleSubmit(async data => {
    await mutateAsync({
      password: data.password,
      token: data.token,
    });
  });

  return {
    loading: isPending,
    resetPassword: handleSubmit,
    form,
    error: isError ? error?.message : '',
    userEmail: searchParams.get('email'),
  };
};

export default useResetPassword;
