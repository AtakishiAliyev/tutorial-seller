import { ServicesGeneralProps } from '@business/shared/types/ServicesGeneralProps.ts';
import { showToasts } from '@business/shared/utils/showToasts.ts';
import authRepository from '@infra/repositories/auth';
import { useMutation } from '@tanstack/react-query';
import { dFunc } from 'd-func.ts';
import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

export type UseResendResetPasswordProps = ServicesGeneralProps & {
  providedEmail?: string;
};

const useResendResetPassword = ({
  afterSuccess = dFunc,
  afterError = dFunc,
  showSuccessNotification = true,
  showErrorNotification = false,
  providedEmail,
}: UseResendResetPasswordProps) => {
  const [searchParams] = useSearchParams();

  const handleResendResetPassword = useCallback(async () => {
    const email = providedEmail || searchParams.get('email');

    if (!email) {
      throw new Error('Email tapılmadı');
    }

    await authRepository.resendForgotPassword({ email });
  }, [providedEmail, searchParams]);

  const { error, isPending, mutateAsync, isError } = useMutation({
    mutationFn: handleResendResetPassword,
    onSuccess: async () => {
      if (showSuccessNotification) showToasts('OTP kodu göndərildi', 'success');
      if (afterSuccess) afterSuccess();
    },
    onError: async resError => {
      if (showErrorNotification) showToasts(resError.message, 'error');
      if (afterError) afterError();
    },
  });

  return {
    loading: isPending,
    resendResetPassword: mutateAsync,
    error: isError ? error?.message : '',
  };
};

export default useResendResetPassword;
