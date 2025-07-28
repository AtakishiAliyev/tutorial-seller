import { GetPublicCourseDto } from '@infra/dto/course/GetPublicCourseDto.ts';

export interface GetOwnedCoursesResponseDto extends GetPublicCourseDto {
  userPurchases: UserPurchaseDto[];
}

export interface UserPurchaseDto {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  isActive: boolean;
  purchaseDate: string;
}
