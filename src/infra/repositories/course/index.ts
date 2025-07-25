import { http } from '@infra/api';
import { GetCoursesQueryDto } from '@infra/dto/course/GetCoursesQueryDto.ts';
import { GetPublicCourseDto } from '@infra/dto/course/GetPublicCourseDto.ts';
import { IsCourseOwnedResponseDto } from '@infra/dto/course/IsCourseOwnedResponseDto.ts';
import { PaginatedResult } from '@infra/shared/dto/PaginatedResult.ts';
import { convertToHttpParams, httpParamsPresets } from '@infra/shared/utils/convertToHttpParams.ts';

const getAllCourses = async (dto: GetCoursesQueryDto) => {
  return http<PaginatedResult<GetPublicCourseDto>>({
    url: '/courses/public',
    method: 'GET',
    params: convertToHttpParams(dto, httpParamsPresets.query()),
  });
};

const isCourseOwned = async (courseId: string) => {
  return http<IsCourseOwnedResponseDto>({
    url: `/courses/${courseId}/is-owned`,
    method: 'GET',
  });
};

const courseRepository = {
  getAllCourses,
  isCourseOwned,
};

export default courseRepository;
