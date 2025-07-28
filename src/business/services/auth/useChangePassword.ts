import { ServicesGeneralProps } from '@business/shared/types/ServicesGeneralProps.ts';
import { showToasts } from '@business/shared/utils/showToasts.ts';
import { ChangePasswordValidationSchema } from '@business/validations/auth/ChangePasswordValidationSchema.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import authRepository from '@infra/repositories/auth';
import { useMutation } from '@tanstack/react-query';
import { dFunc } from 'd-func.ts';
import { useForm } from 'react-hook-form';

export type UseChangePasswordProps = ServicesGeneralProps;

const useChangePassword = ({
  afterSuccess = dFunc,
  afterError = dFunc,
  showSuccessNotification = true,
  showErrorNotification = false,
  clearForm = true,
}: UseChangePasswordProps) => {
  const form = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(ChangePasswordValidationSchema),
  });

  const { error, isPending, mutateAsync, isError } = useMutation({
    mutationFn: authRepository.changePassword,
    onSuccess: async () => {
      if (showSuccessNotification) showToasts('Siz parolunuzu uğurla dəyişdiniz!', 'success');
      if (afterSuccess) afterSuccess();
      if (clearForm) form.reset();
    },
    onError: async resError => {
      if (showErrorNotification) showToasts(resError.message, 'error');
      if (afterError) afterError();
    },
  });

  const handleSubmit = form.handleSubmit(async data => {
    await mutateAsync(data);
  });

  return {
    loading: isPending,
    changePassword: handleSubmit,
    form,
    error: isError ? error?.message : '',
  };
};

export default useChangePassword;
