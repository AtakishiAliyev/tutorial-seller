import { HttpError } from '@infra/api/HttpError.ts';
import { IsCourseOwnedResponseDto } from '@infra/dto/course/IsCourseOwnedResponseDto.ts';
import courseRepository from '@infra/repositories/course';
import { useQuery } from '@tanstack/react-query';

export type UseIsCourseOwnedProps = {
  courseSlug: string;
};

const useIsCourseOwned = ({ courseSlug }: UseIsCourseOwnedProps) => {
  const { error, data, isLoading } = useQuery<
    IsCourseOwnedResponseDto,
    HttpError,
    IsCourseOwnedResponseDto
  >({
    queryFn: async () => await courseRepository.isCourseOwned(courseSlug),
    queryKey: ['course', 'is-owned', courseSlug],
  });

  return {
    isOwned: data,
    loading: isLoading,
    error,
  };
};

export default useIsCourseOwned;
