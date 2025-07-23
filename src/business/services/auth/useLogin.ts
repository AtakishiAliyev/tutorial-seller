import { setAccessToken } from '@business/shared/utils/setAccessToken';
import { showToasts } from '@business/shared/utils/showToasts';
import { LoginValidationSchema } from '@business/validations/auth/LoginValidationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { HttpError } from '@infra/api/HttpError';
import { SignInDto } from '@infra/dto/auth/SignInDto';
import { SignInResponseDto } from '@infra/dto/auth/SignInResponseDto';
import authRepository from '@infra/repositories/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { dFunc } from 'd-func';
import { BaseSyntheticEvent } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

type UseLoginReturn = {
  loading: boolean;
  error: string[];
  signIn: (e?: BaseSyntheticEvent) => Promise<void>;
  form: UseFormReturn<SignInDto>;
};

type UseLoginProps = {
  afterSubmit?: () => void;
  afterError?: () => void;
  redirectUrl?: string;
  showNotifications?: boolean;
};

const useLogin = ({
  afterSubmit = dFunc,
  afterError = dFunc,
  redirectUrl = '/',
  showNotifications = false,
}: UseLoginProps): UseLoginReturn => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { error, isPending, mutateAsync, isError } = useMutation<
    SignInResponseDto,
    HttpError,
    SignInDto
  >({
    mutationFn: authRepository.signIn,
    onSuccess: async data => {
      setAccessToken(data.accessToken);
      await queryClient.refetchQueries({
        queryKey: ['users', 'me'],
        exact: false,
      });

      if (showNotifications) showToasts('Siz hesabınıza uğurla daxil oldunuz', 'success');
      navigate(redirectUrl);
    },
    onError: async resError => {
      if (showNotifications) showToasts(resError.message, 'error');
      if (afterError) afterError();
    },
  });

  const form = useForm<SignInDto>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(LoginValidationSchema),
  });

  const handleSubmit = form.handleSubmit(async data => {
    await mutateAsync(data);
    if (afterSubmit) afterSubmit();
  });

  return {
    form,
    loading: isPending,
    signIn: handleSubmit,
    error: isError ? error?.message : [],
  };
};

export default useLogin;
