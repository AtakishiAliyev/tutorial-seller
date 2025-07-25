export interface GetPublicCourseDto {
  id: string;
  title: string;
  normalizedTitle: string;
  slug: string;
  description: string;
  basePrice: number;
  salePrice: number;
  preview: string;
  isPublic: boolean;
}
