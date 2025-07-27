import { useWatchCourseStore } from '@business/services/course/useWatchCourseStore.ts';
import ErrorBox from '@presentation/shared/ui/ErrorBox.tsx';
import CourseSectionsSidebar from '@presentation/widgets/course/CourseSectionsSidebar.tsx';
import LessonDetail from '@presentation/widgets/course/LessonDetail.tsx';
import { memo } from 'react';
import { useParams } from 'react-router-dom';

const CourseWatch = () => {
  const params = useParams();
  const courseSlug = params.courseSlug;
  const setCourseSlug = useWatchCourseStore(state => state.setCourseSlug);

  if (!courseSlug) {
    return <ErrorBox messages="Oops! Course slug is not provided. Please, try again later." />;
  }

  setCourseSlug(courseSlug);
  return (
    <main className="flex mb-2">
      <CourseSectionsSidebar />
      <LessonDetail />
    </main>
  );
};

const MemoizedCourseWatch = memo(CourseWatch);

export default MemoizedCourseWatch;
