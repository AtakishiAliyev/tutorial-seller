import { ServicesGeneralProps } from '@business/shared/types/ServicesGeneralProps.ts';
import { showToasts } from '@business/shared/utils/showToasts.ts';
import { CreateCreditRequestValidationSchema } from '@business/validations/credit/CreateCreditRequestValidationSchema.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { HttpError } from '@infra/api/HttpError.ts';
import { CreateCreditRequestDto } from '@infra/dto/credit/CreateCreditRequestDto.ts';
import creditRepository from '@infra/repositories/credit';
import { useMutation } from '@tanstack/react-query';
import { dFunc } from 'd-func.ts';
import { useForm } from 'react-hook-form';

export type UseCreateCreditRequestProps = ServicesGeneralProps & {
  courseId?: string;
};

const useCreateCreditRequest = ({
  afterSuccess = dFunc,
  afterError = dFunc,
  showErrorNotification = false,
  showSuccessNotification = false,
  courseId,
}: UseCreateCreditRequestProps) => {
  const { error, isPending, mutateAsync, isError, isSuccess } = useMutation<
    void,
    HttpError,
    CreateCreditRequestDto
  >({
    mutationFn: async dto =>
      await creditRepository.createCreditRequest(courseId || '', {
        ...dto,
        birthDate: dto.birthDate.toISOString() as unknown as Date,
      }),
    onSuccess: async () => {
      if (showSuccessNotification) showToasts('Siz hesabınıza uğurla daxil oldunuz', 'success');
      if (afterSuccess) afterSuccess();
    },
    onError: async resError => {
      if (showErrorNotification) showToasts(resError.message, 'error');
      if (afterError) afterError();
    },
  });

  const form = useForm<CreateCreditRequestDto>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(CreateCreditRequestValidationSchema),
  });

  const handleSubmit = form.handleSubmit(async data => {
    await mutateAsync(data);
  });

  return {
    form,
    isSuccess,
    loading: isPending,
    error: isError ? error.message : [],
    createCreditRequest: handleSubmit,
  };
};

export default useCreateCreditRequest;
