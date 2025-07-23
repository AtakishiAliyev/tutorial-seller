import { http } from '@infra/api/index.js';
import { GetMeDto } from '@infra/dto/user/GetMeDto.ts';

const getMe = async (): Promise<GetMeDto> => {
  return http<GetMeDto>({
    url: '/users/me',
    method: 'GET',
  });
};

const updateMe = async dto => {
  return http({
    url: '/users/me',
    method: 'PUT',
    data: dto,
  });
};

const userRepository = {
  getMe,
  updateMe,
};

export default userRepository;
