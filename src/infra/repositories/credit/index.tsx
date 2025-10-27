import { http } from '@infra/api';
import { CheckIfUserHasCreditRequestResponse } from '@infra/dto/credit/CheckIfUserHasCreditRequestResponse.ts';
import { CreateCreditRequestDto } from '@infra/dto/credit/CreateCreditRequestDto.ts';

const createCreditRequest = async (courseId: string, dto: CreateCreditRequestDto) => {
  return http<void>({
    url: `/credits/${courseId}`,
    method: 'POST',
    data: dto,
  });
};

const checkIfUserHasCreditRequest = async (courseId: string) => {
  return http<CheckIfUserHasCreditRequestResponse>({
    url: `/credits/check-user-credit/${courseId}`,
    method: 'GET',
  });
};

const creditRepository = {
  createCreditRequest,
  checkIfUserHasCreditRequest,
};

export default creditRepository;
