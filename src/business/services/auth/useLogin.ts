import { ServicesGeneralProps } from '@business/shared/types/ServicesGeneralProps.ts';
import { setAccessToken } from '@business/shared/utils/setAccessToken';
import { showToasts } from '@business/shared/utils/showToasts';
import { LoginValidationSchema } from '@business/validations/auth/LoginValidationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { HttpError } from '@infra/api/HttpError';
import { SignInDto } from '@infra/dto/auth/SignInDto';
import { SignInResponseDto } from '@infra/dto/auth/SignInResponseDto';
import authRepository from '@infra/repositories/auth';
import { useMutation } from '@tanstack/react-query';
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

export type UseLoginProps = ServicesGeneralProps & {
  redirectUrl?: string;
};

const useLogin = ({
  afterSuccess = dFunc,
  afterError = dFunc,
  redirectUrl = '/',
  showSuccessNotification = true,
  showErrorNotification = false,
}: UseLoginProps): UseLoginReturn => {
  const navigate = useNavigate();
  const { error, isPending, mutateAsync, isError } = useMutation<
    SignInResponseDto,
    HttpError,
    SignInDto
  >({
    mutationFn: authRepository.signIn,
    onSuccess: async data => {
      setAccessToken(data.accessToken);
      if (showSuccessNotification) showToasts('Siz hesabınıza uğurla daxil oldunuz', 'success');
      navigate(redirectUrl);
      if (afterSuccess) afterSuccess();
    },
    onError: async resError => {
      if (showErrorNotification) showToasts(resError.message, 'error');
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
  });

  return {
    form,
    loading: isPending,
    signIn: handleSubmit,
    error: isError ? error?.message : [],
  };
};

export default useLogin;
