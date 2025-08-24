import { useWatchCourseStore } from '@business/services/course/useWatchCourseStore.ts';
import ErrorBox from '@presentation/shared/ui/ErrorBox.tsx';
import { VisibilityProvider } from '@presentation/shared/ui/Visibility.tsx';
import CourseSectionsSidebar from '@presentation/widgets/course/CourseSectionsSidebar.tsx';
import LessonDetail from '@presentation/widgets/course/LessonDetail.tsx';
import { memo } from 'react';
import { useParams } from 'react-router-dom';

const CourseWatch = () => {
  const params = useParams();
  const courseSlug = params.courseSlug;
  const setCourseSlug = useWatchCourseStore(state => state.setCourseSlug);

  if (!courseSlug) {
    return (
      <ErrorBox messages="Oops! Kurs slug-ı göstərilməyib. Zəhmət olmasa, bir az sonra yenidən cəhd edin." />
    );
  }

  setCourseSlug(courseSlug);
  return (
    <main className="flex mb-2">
      <VisibilityProvider>
        <CourseSectionsSidebar />
        <LessonDetail />
      </VisibilityProvider>
    </main>
  );
};

const MemoizedCourseWatch = memo(CourseWatch);

export default MemoizedCourseWatch;
