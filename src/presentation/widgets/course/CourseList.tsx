import { useCourseContext } from '@presentation/contracts/course/GetCourseContract.tsx';
import CourseCard from '@presentation/entities/course/CourseCard.tsx';
import CourseAction from '@presentation/features/course/CourseAction.tsx';
import ErrorBox from '@presentation/shared/ui/ErrorBox.tsx';
import List from '@presentation/shared/ui/List.tsx';
import { cn } from '@presentation/shared/utils/cn.ts';
import BuyCourseWidget from '@presentation/widgets/course/BuyCourseWidget.tsx';
import { FC, memo } from 'react';

type CourseListProps = {
  className?: string;
};

const CourseList: FC<CourseListProps> = ({ className }) => {
  const { courses, loading, error } = useCourseContext();

  if (loading) return null;

  if (error)
    return (
      <ErrorBox messages="Oops! Kursları əldə edərkən nəsə səhv oldu... Zəhmət olmasa, bir az sonra yenidən cəhd edin." />
    );

  if (courses?.data?.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          {/*<SearchOutlined className="text-gray-400 text-xl" />*/}
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Heç bir kurs tapılmadı</h3>
        <p className="text-gray-600">
          Axtarış və ya filteri dəyişdirərək istədiyinizi tapmağa cəhd edin.
        </p>
      </div>
    );
  }

  return (
    <List className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6', className)}>
      <BuyCourseWidget>
        {courses?.data &&
          courses.data.map(course => (
            <CourseCard
              key={course.slug}
              footerSlot={<CourseAction courseName={course.title} courseSlug={course.slug} />}
              course={course}
            />
          ))}
      </BuyCourseWidget>
    </List>
  );
};

const MemoizedCourseList = memo(CourseList);

export default MemoizedCourseList;
