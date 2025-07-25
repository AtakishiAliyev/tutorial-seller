import { HttpError } from '@infra/api/HttpError.ts';
import { GetCoursesQueryDto } from '@infra/dto/course/GetCoursesQueryDto.ts';
import { GetPublicCourseDto } from '@infra/dto/course/GetPublicCourseDto.ts';
import courseRepository from '@infra/repositories/course';
import { PaginatedResult } from '@infra/shared/dto/PaginatedResult.ts';
import { useQuery } from '@tanstack/react-query';

export type UseGetAllCoursesProps = GetCoursesQueryDto & {};

type UseGetAllCoursesReturn = {
  courses: PaginatedResult<GetPublicCourseDto> | undefined;
  error: HttpError | null;
  loading: boolean;
};

const useGetAllCourses = ({
  page,
  sort,
  search,
  limit,
}: UseGetAllCoursesProps): UseGetAllCoursesReturn => {
  const { error, data, isFetching } = useQuery<
    PaginatedResult<GetPublicCourseDto>,
    HttpError,
    PaginatedResult<GetPublicCourseDto>
  >({
    queryKey: ['courses', 'public', page, limit, sort, search],
    queryFn: async () =>
      await courseRepository.getAllCourses({
        page,
        limit,
        sort,
        search,
      }),
  });

  return {
    courses: data,
    error,
    loading: isFetching,
  };
};

export default useGetAllCourses;
