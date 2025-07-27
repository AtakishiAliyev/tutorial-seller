import { http } from '@infra/api';
import { GetCourseDetailDto } from '@infra/dto/course/GetCourseDetailDto.ts';
import { GetCoursesQueryDto } from '@infra/dto/course/GetCoursesQueryDto.ts';
import { GetPublicCourseDto } from '@infra/dto/course/GetPublicCourseDto.ts';
import { IsCourseOwnedResponseDto } from '@infra/dto/course/IsCourseOwnedResponseDto.ts';
import { SaveLessonProgressDto } from '@infra/dto/course/SaveLessonProgressDto.ts';
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

const getCourseDetails = async (courseSlug: string): Promise<GetCourseDetailDto> => {
  return http<GetCourseDetailDto>({
    url: `/courses/owned/${courseSlug}`,
    method: 'GET',
  });
};

const saveLessonProgress = async (lessonId: string, dto: SaveLessonProgressDto): Promise<void> => {
  return http({
    url: `/lessons-progresses/${lessonId}`,
    method: 'POST',
    data: dto,
  });
};

const courseRepository = {
  getAllCourses,
  isCourseOwned,
  getCourseDetails,
  saveLessonProgress,
};

export default courseRepository;
