import { ServicesGeneralProps } from '@business/shared/types/ServicesGeneralProps.ts';
import { showToasts } from '@business/shared/utils/showToasts.ts';
import { HttpError } from '@infra/api/HttpError.ts';
import { BuyCourseResponseDto } from '@infra/dto/course/BuyCourseResponseDto.ts';
import courseRepository from '@infra/repositories/course';
import { useMutation } from '@tanstack/react-query';
import { dFunc } from 'd-func.ts';

export type UseBuyCourseProps = ServicesGeneralProps & {};

const useBuyCourse = ({
  afterSuccess = dFunc,
  afterError = dFunc,
  showErrorNotification = false,
}: UseBuyCourseProps) => {
  const { error, isPending, mutateAsync, isError } = useMutation<
    BuyCourseResponseDto,
    HttpError,
    string
  >({
    mutationFn: async courseSlug => await courseRepository.buyCourse(courseSlug),
    onSuccess: async dto => {
      const paymentLink = dto.paymentLink;
      if (paymentLink) {
        window.location.href = paymentLink;
      }
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
    buyCourse: mutateAsync,
  };
};

export default useBuyCourse;
