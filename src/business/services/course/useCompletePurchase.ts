import { ServicesGeneralProps } from '@business/shared/types/ServicesGeneralProps.ts';
import { showToasts } from '@business/shared/utils/showToasts.ts';
import { HttpError } from '@infra/api/HttpError.ts';
import courseRepository from '@infra/repositories/course';
import { useMutation } from '@tanstack/react-query';
import { dFunc } from 'd-func.ts';
import { useNavigate } from 'react-router-dom';

export type UseCompletePurchaseProps = ServicesGeneralProps & {
  accessId: string;
  paymentId: string;
};

const useCompletePurchase = ({
  afterSuccess = dFunc,
  afterError = dFunc,
  showErrorNotification = false,
  accessId,
  paymentId,
}: UseCompletePurchaseProps) => {
  const navigate = useNavigate();
  const { error, isPending, mutateAsync, isError } = useMutation<void, HttpError, void>({
    mutationFn: async () => await courseRepository.completePurchase(accessId, paymentId),
    onSuccess: async () => {
      showToasts('Kurs alışı uğurla keçdi! Əsas səhifəyə yönləndirilir...', 'success');
      setTimeout(() => {
        navigate('/');
      }, 1500);
      if (afterSuccess) afterSuccess();
    },
    onError: async resError => {
      if (showErrorNotification) showToasts(resError.message, 'error');
      if (afterError) afterError();
    },
  });

  return {
    loading: isPending,
    error: isError ? error.message : [],
    completePurchase: mutateAsync,
  };
};

export default useCompletePurchase;
