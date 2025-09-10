import { http } from '@infra/api';
import { BuyCourseResponseDto } from '@infra/dto/course/BuyCourseResponseDto.ts';
import { GetCourseDetailDto } from '@infra/dto/course/GetCourseDetailDto.ts';
import { GetCoursesQueryDto } from '@infra/dto/course/GetCoursesQueryDto.ts';
import { GetOwnedCoursesResponseDto } from '@infra/dto/course/GetOwnedCoursesResponseDto.ts';
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

const getAllMyCourses = async (dto: GetCoursesQueryDto) => {
  return http<PaginatedResult<GetOwnedCoursesResponseDto>>({
    url: '/courses/owned',
    method: 'GET',
    params: convertToHttpParams(dto, httpParamsPresets.query()),
  });
};

const buyCourse = async (courseSlug: string): Promise<BuyCourseResponseDto> => {
  return http<BuyCourseResponseDto>({
    url: `/courses/${courseSlug}/buy`,
    method: 'POST',
  });
};

const completePurchase = async (accessId: string, paymentId: string): Promise<void> => {
  return http({
    url: `/courses/${accessId}/complete-purchase/${paymentId}`,
    method: 'POST',
  });
};

const courseRepository = {
  getAllCourses,
  isCourseOwned,
  getCourseDetails,
  saveLessonProgress,
  getAllMyCourses,
  buyCourse,
  completePurchase,
};

export default courseRepository;
