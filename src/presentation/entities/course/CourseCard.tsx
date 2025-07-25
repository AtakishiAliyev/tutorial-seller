import { GetPublicCourseDto } from '@infra/dto/course/GetPublicCourseDto.ts';
import Divider from '@presentation/shared/ui/Divider.tsx';
import Text from '@presentation/shared/ui/Typography';
import { FC, memo, ReactNode } from 'react';

type CourseCardProps = {
  course: GetPublicCourseDto;
  footerSlot?: ReactNode;
};

const CourseCard: FC<CourseCardProps> = ({ course, footerSlot }) => {
  const hasDiscount = course.salePrice < course.basePrice;

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200">
      {/* Course Image */}
      <div className="aspect-video bg-gradient-to-br from-blue-600 via-purple-600 to-red-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <img src={course.preview} alt={course.title} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Course Info */}
      <div className="p-4 space-y-4">
        {/* Title */}
        <div>
          <h4 className="font-semibold text-gray-900 text-lg mb-1">{course.title}</h4>
        </div>

        <Divider className="!my-2 h-[1px]" />

        {/* Price Section */}
        <div className="flex items-center gap-2 !mt-0">
          {hasDiscount ? (
            <>
              <Text size="h4" weight="semibold" color="primary">
                {course.salePrice.toFixed(2)} AZN
              </Text>
              <Text size="subtitle" weight="normal" color="muted" className="line-through">
                {course.basePrice.toFixed(2)} AZN
              </Text>
            </>
          ) : (
            <Text size="h4" weight="semibold">
              {course.basePrice.toFixed(2)} AZN
            </Text>
          )}
        </div>

        <div>{footerSlot}</div>
      </div>
    </div>
  );
};

const MemoizedCourseCard = memo(CourseCard);

export default MemoizedCourseCard;
