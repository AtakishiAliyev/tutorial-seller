import { HttpError } from '@infra/api/HttpError.ts';
import { GetCoursesQueryDto } from '@infra/dto/course/GetCoursesQueryDto.ts';
import { GetOwnedCoursesResponseDto } from '@infra/dto/course/GetOwnedCoursesResponseDto.ts';
import { GetPublicCourseDto } from '@infra/dto/course/GetPublicCourseDto.ts';
import courseRepository from '@infra/repositories/course';
import { PaginatedResult } from '@infra/shared/dto/PaginatedResult.ts';
import { useQuery } from '@tanstack/react-query';

export type UseGetOwnedCoursesProps = GetCoursesQueryDto & {};

type UseGetOwnedCoursesReturn = {
  courses: PaginatedResult<GetPublicCourseDto> | undefined;
  error: HttpError | null;
  loading: boolean;
};

const useGetOwnedCourses = ({
  page = 1,
  sort,
  search,
  limit = 50,
}: UseGetOwnedCoursesProps): UseGetOwnedCoursesReturn => {
  const { error, data, isFetching } = useQuery<
    PaginatedResult<GetOwnedCoursesResponseDto>,
    HttpError,
    PaginatedResult<GetOwnedCoursesResponseDto>
  >({
    queryKey: ['courses', 'owned', page, limit, sort, search],
    queryFn: async () =>
      await courseRepository.getAllMyCourses({
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

export default useGetOwnedCourses;
