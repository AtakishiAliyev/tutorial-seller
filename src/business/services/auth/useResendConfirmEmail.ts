import { ServicesGeneralProps } from '@business/shared/types/ServicesGeneralProps.ts';
import { showToasts } from '@business/shared/utils/showToasts.ts';
import authRepository from '@infra/repositories/auth';
import { useMutation } from '@tanstack/react-query';
import { dFunc } from 'd-func.ts';
import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

export type UseResendConfirmEmailProps = ServicesGeneralProps & {
  providedEmail?: string;
};

const useResendConfirmEmail = ({
  showErrorNotification = false,
  showSuccessNotification = true,
  afterSuccess = dFunc,
  afterError = dFunc,
  providedEmail,
}: UseResendConfirmEmailProps) => {
  const [searchParams] = useSearchParams();

  const handleResendConfirmEmail = useCallback(async () => {
    const email = providedEmail || searchParams.get('email');

    if (!email) {
      throw new Error('Email tapılmadı');
    }

    await authRepository.resendEmailConfirmation({ email });
  }, [providedEmail, searchParams]);

  const { error, isPending, mutateAsync, isError } = useMutation({
    mutationFn: handleResendConfirmEmail,
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
    resendConfirmEmail: mutateAsync,
    error: isError ? error?.message : '',
  };
};

export default useResendConfirmEmail;
