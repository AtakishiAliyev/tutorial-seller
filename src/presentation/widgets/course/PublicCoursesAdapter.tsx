import useGetAllCourses, {
  UseGetAllCoursesProps,
} from '@business/services/course/useGetAllCourses.ts';
import GetCourseContract from '@presentation/contracts/course/GetCourseContract.tsx';
import { validateNumberParam } from '@presentation/shared/utils/validateNumberParam.ts';
import { FC, memo, ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';

type PublicCoursesAdapterProps = UseGetAllCoursesProps & {
  children: ReactNode;
};

const PublicCoursesAdapter: FC<PublicCoursesAdapterProps> = ({
  sort,
  page,
  search,
  limit,
  children,
}) => {
  const [searchParams] = useSearchParams();
  const sortParam = sort || (searchParams.get('sort') as 'ASC' | 'DESC');
  const pageParam = page || searchParams.get('page');
  const validatedPageParam = validateNumberParam(pageParam, 1);
  const searchParam = search || searchParams.get('search') || undefined;
  const limitParam = limit || searchParams.get('limit');
  const validatedLimitParam = validateNumberParam(limitParam, 10);

  const { courses, loading, error } = useGetAllCourses({
    sort: sortParam,
    page: validatedPageParam,
    search: searchParam,
    limit: validatedLimitParam,
  });

  return (
    <GetCourseContract courses={courses} loading={loading} error={error}>
      {children}
    </GetCourseContract>
  );
};

const MemoizedPublicCoursesAdapter = memo(PublicCoursesAdapter);

export default MemoizedPublicCoursesAdapter;
