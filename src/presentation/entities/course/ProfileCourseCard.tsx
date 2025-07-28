import { GetOwnedCoursesResponseDto } from '@infra/dto/course/GetOwnedCoursesResponseDto.ts';
import { Calendar } from 'lucide-react';
import { FC, memo, ReactNode } from 'react';

type CourseCardProps = {
  course: GetOwnedCoursesResponseDto;
  footerSlot?: ReactNode;
};

const ProfileCourseCard: FC<CourseCardProps> = ({ course, footerSlot }) => {
  return (
    <div className="group flex flex-col sm:flex-row items-center rounded-xl border bg-white shadow-sm transition-all duration-300 ease-in-out hover:shadow-lg overflow-hidden">
      <div className="w-full sm:w-48 h-48 sm:h-auto sm:self-stretch relative overflow-hidden">
        <img
          className="w-full h-full transform object-cover transition-transform duration-300 group-hover:scale-105"
          src={course.preview}
          alt={course.title}
        />
      </div>
      <div className="flex-1 p-5">
        <h3 className="text-lg font-semibold text-gray-800 ">{course.title}</h3>
        <div className="mt-2 flex items-center text-sm text-gray-500">
          <Calendar className="mr-2" />
          <span>
            Purchased on:{' '}
            {new Date(course.userPurchases[0].purchaseDate).toLocaleDateString('az-AZ')}
          </span>{' '}
          {/* Replace with actual purchase date in future */}
        </div>
        <div className="mt-4 flex items-center justify-between mb-4">
          <p className="text-xl font-bold text-gray-900">${course.salePrice}</p>
          {/*  Replace in future with the real price from pay object  */}
        </div>
        {footerSlot}
      </div>
    </div>
  );
};

const MemoizedProfileCourseCard = memo(ProfileCourseCard);

export default MemoizedProfileCourseCard;
