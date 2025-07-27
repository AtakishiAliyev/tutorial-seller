import { ServicesGeneralProps } from '@business/shared/types/ServicesGeneralProps.ts';
import { showToasts } from '@business/shared/utils/showToasts.ts';
import { HttpError } from '@infra/api/HttpError.ts';
import { SaveLessonProgressDto } from '@infra/dto/course/SaveLessonProgressDto.ts';
import courseRepository from '@infra/repositories/course';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { dFunc } from 'd-func.ts';

export type UseSaveLessonProgressProps = ServicesGeneralProps & {
  lessonId: string;
  invalidateQueries?: boolean;
};
const useSaveLessonProgress = ({
  lessonId,
  afterSuccess = dFunc,
  afterError = dFunc,
  showSuccessNotification = true,
  showErrorNotification = false,
}: UseSaveLessonProgressProps) => {
  const queryClient = useQueryClient();
  const { error, isPending, mutateAsync, isError } = useMutation<
    void,
    HttpError,
    SaveLessonProgressDto
  >({
    mutationFn: dto => courseRepository.saveLessonProgress(lessonId, dto),
    onSuccess: async () => {
      if (showSuccessNotification) showToasts('Siz hesabınıza uğurla daxil oldunuz', 'success');
      if (afterSuccess) afterSuccess();
      await queryClient.refetchQueries({
        queryKey: ['course', 'watch'],
        exact: false,
      });
    },
    onError: async resError => {
      if (showErrorNotification) showToasts(resError.message, 'error');
      if (afterError) afterError();
    },
  });

  return {
    loading: isPending,
    error: isError ? error.message : [],
    saveLessonProgress: mutateAsync,
  };
};

export default useSaveLessonProgress;
