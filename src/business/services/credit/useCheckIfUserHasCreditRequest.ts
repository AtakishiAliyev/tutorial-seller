import { HttpError } from '@infra/api/HttpError.ts';
import { CheckIfUserHasCreditRequestResponse } from '@infra/dto/credit/CheckIfUserHasCreditRequestResponse.ts';
import creditRepository from '@infra/repositories/credit';
import { useQuery } from '@tanstack/react-query';

export type UseGetCourseDetailProps = {
  courseId: string;
};

const useCheckIfUserHasCreditRequest = ({ courseId }: UseGetCourseDetailProps) => {
  const { error, data, isLoading } = useQuery<
    CheckIfUserHasCreditRequestResponse,
    HttpError,
    CheckIfUserHasCreditRequestResponse
  >({
    queryFn: async () => await creditRepository.checkIfUserHasCreditRequest(courseId),
    queryKey: ['credits', 'check', courseId],
    enabled: !!courseId,
  });

  return {
    data,
    loading: isLoading,
    error,
  };
};

export default useCheckIfUserHasCreditRequest;
