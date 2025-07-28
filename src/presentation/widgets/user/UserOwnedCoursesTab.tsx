import useGetOwnedCourses from '@business/services/course/useGetOwnedCourses.ts';
import ProfileCourseCard from '@presentation/entities/course/ProfileCourseCard.tsx';
import CourseAction from '@presentation/features/course/CourseAction.tsx';
import ErrorBox from '@presentation/shared/ui/ErrorBox.tsx';
import List from '@presentation/shared/ui/List.tsx';
import { memo } from 'react';

const UserOwnedCoursesTab = () => {
  const { loading, courses, error } = useGetOwnedCourses({
    sort: 'DESC',
    limit: 50,
    page: 1,
  });
  if (loading || !courses) {
    // TODO: Add skeleton loading
    return <div>Loading...</div>;
  }
  if (error) {
    return (
      <ErrorBox
        messages={
          error.message || 'An error occurred while fetching your courses. Please try again later.'
        }
      />
    );
  }
  return (
    <div>
      <List>
        {courses.data.map(course => (
          <ProfileCourseCard
            key={course.id}
            course={course}
            footerSlot={<CourseAction courseSlug={course.slug} />}
          />
        ))}
      </List>
    </div>
  );
};

const MemoizedUserOwnedCoursesTab = memo(UserOwnedCoursesTab);

export default MemoizedUserOwnedCoursesTab;
