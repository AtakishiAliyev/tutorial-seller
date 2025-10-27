import { useCourseContext } from '@presentation/contracts/course/GetCourseContract.tsx';
import CourseCard from '@presentation/entities/course/CourseCard.tsx';
import CourseAction from '@presentation/features/course/CourseAction.tsx';
import ErrorBox from '@presentation/shared/ui/ErrorBox.tsx';
import List from '@presentation/shared/ui/List.tsx';
import { cn } from '@presentation/shared/utils/cn.ts';
import BuyCourseWidget from '@presentation/widgets/course/BuyCourseWidget.tsx';
import { BuyCourseModal } from '@presentation/widgets/credit/BuyCourseModal.tsx';
import CreateCreditRequestWidget from '@presentation/widgets/credit/CreateCreditRequestWidget.tsx';
import { FC, memo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { VisibilityProvider, VisibilityTarget, VisibilityTrigger } from 'react-visibility-manager';

type CourseListProps = {
  className?: string;
};

const CourseList: FC<CourseListProps> = ({ className }) => {
  const { courses, loading, error } = useCourseContext();
  const [searchParams, _setSearchParams] = useSearchParams();
  const courseCredit = searchParams.get('courseCredit') || '';

  if (error) {
    return (
      <ErrorBox
        messages={`Oops! Kursları əldə edərkən nəsə səhv oldu... Zəhmət olmasa, bir az sonra yenidən cəhd edin. Status: ${error?.statusCode} Error: ${error?.message}`}
      />
    );
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin mx-auto mb-4"></div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Yüklənir...</h3>
        <p className="text-gray-600">Zəhmət olmasa, gözləyin.</p>
      </div>
    );
  }

  if (courses?.data?.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"></div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Heç bir kurs tapılmadı</h3>
        <p className="text-gray-600">
          Axtarış və ya filteri dəyişdirərək istədiyinizi tapmağa cəhd edin.
        </p>
      </div>
    );
  }

  return (
    <BuyCourseWidget>
      <VisibilityProvider>
        <CreateCreditRequestWidget>
          <List className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6', className)}>
            {courses?.data &&
              courses.data.map(course => (
                <CourseCard
                  key={course.slug}
                  footerSlot={
                    <CourseAction
                      courseId={course.id}
                      courseName={course.title}
                      courseSlug={course.slug}
                    />
                  }
                  course={course}
                />
              ))}
          </List>
          <VisibilityTrigger propName="onClose" triggerKey="buy-course">
            <VisibilityTarget isOpenPropName="isOpen" metaPropName="meta" targetKey="buy-course">
              <BuyCourseModal />
            </VisibilityTarget>
          </VisibilityTrigger>
        </CreateCreditRequestWidget>
      </VisibilityProvider>
    </BuyCourseWidget>
  );
};

const MemoizedCourseList = memo(CourseList);

export default MemoizedCourseList;
