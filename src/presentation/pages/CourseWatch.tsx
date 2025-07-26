import ErrorBox from '@presentation/shared/ui/ErrorBox.tsx';
import CourseSectionsSidebar from '@presentation/widgets/course/CourseSectionsSidebar.tsx';
import { memo } from 'react';
import { useParams } from 'react-router-dom';

const CourseWatch = () => {
  const params = useParams();
  const courseSlug = params.courseSlug;
  if (!courseSlug) {
    return <ErrorBox messages="Oops! Course slug is not provided. Please, try again later." />;
  }
  return (
    <main>
      <CourseSectionsSidebar courseSlug={courseSlug} />
    </main>
  );
};

const MemoizedCourseWatch = memo(CourseWatch);

export default MemoizedCourseWatch;
