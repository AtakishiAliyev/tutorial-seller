import { HttpError } from '@infra/api/HttpError.ts';
import { GetMeDto } from '@infra/dto/user/GetMeDto.ts';
import userRepository from '@infra/repositories/user';
import { useQuery } from '@tanstack/react-query';

type UseGetMeResponse = {
  me: GetMeDto | undefined;
  error: HttpError | null;
  loading: boolean;
};

const useGetMe = (): UseGetMeResponse => {
  const { error, data, isFetching } = useQuery<GetMeDto, HttpError, GetMeDto>({
    queryKey: ['users', 'me'],
    queryFn: userRepository.getMe,
  });

  return {
    me: data,
    error,
    loading: isFetching,
  };
};

export default useGetMe;
