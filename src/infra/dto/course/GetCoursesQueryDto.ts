import { PaginationDto } from '@infra/shared/dto/PaginationDto.ts';

export interface GetCoursesQueryDto extends PaginationDto {
  search?: string;
  sort?: 'ASC' | 'DESC';
}
