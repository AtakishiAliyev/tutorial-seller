import { ServicesGeneralProps } from '@business/shared/types/ServicesGeneralProps.ts';
import { showToasts } from '@business/shared/utils/showToasts';
import { ConfirmEmailValidationSchema } from '@business/validations/auth/ConfirmEmailValidationSchema.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { HttpError } from '@infra/api/HttpError.ts';
import { ConfirmEmailDto } from '@infra/dto/auth/ConfirmEmailDto.ts';
import authRepository from '@infra/repositories/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { dFunc } from 'd-func.ts';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';

export type UseConfirmEmailProps = ServicesGeneralProps & {
  providedEmail?: string;
};

const useConfirmEmail = ({
  showErrorNotification = false,
  showSuccessNotification = true,
  afterSuccess = dFunc,
  afterError = dFunc,
  providedEmail,
}: UseConfirmEmailProps) => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleConfirmEmail = useCallback(
    async (data: Omit<ConfirmEmailDto, 'email'>) => {
      const email = providedEmail || searchParams.get('email');

      if (!email) {
        throw new Error('Email tapılmadı');
      }

      await authRepository.confirmEmail({ ...data, email });
    },
    [providedEmail, searchParams],
  );

  const { error, isPending, mutateAsync } = useMutation<
    void,
    HttpError,
    Omit<ConfirmEmailDto, 'email'>
  >({
    mutationFn: handleConfirmEmail,
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: ['users', 'me'],
        exact: false,
      });

      if (showSuccessNotification)
        showToasts(
          'Siz e-poçtunuzu təsdiqlədiniz. İndi zəhmət olmasa hesabınıza daxil olun.',
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

  const form = useForm<Omit<ConfirmEmailDto, 'email'>>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(ConfirmEmailValidationSchema),
  });

  const handleSubmit = form.handleSubmit(async data => {
    await mutateAsync(data);
  });

  return {
    loading: isPending,
    userEmail: providedEmail || searchParams.get('email'),
    confirmEmail: handleSubmit,
    form,
    error: error ? error.message : [],
  };
};

export default useConfirmEmail;
