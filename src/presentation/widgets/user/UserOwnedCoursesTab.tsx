import { GetOwnedCoursesResponseDto } from '@infra/dto/course/GetOwnedCoursesResponseDto.ts';
import ProfileCourseCard from '@presentation/entities/course/ProfileCourseCard.tsx';
import Text from '@presentation/shared/ui/Typography';
import { FC } from 'react';

type UserOwnedCoursesTabProps = {
  courses: GetOwnedCoursesResponseDto[];
};

const UserOwnedCoursesTab: FC<UserOwnedCoursesTabProps> = ({ courses }) => {
  if (!courses || courses?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Text size="h2" weight="semibold" color="muted">
          Hal-hazırda heç bir kursunuz yoxdur.
        </Text>
        <Text size="p" color="muted" className="mt-2 text-center max-w-[400px]">
          Yeni kurslar əldə etmək üçün əsas səyfəyə daxil olun və öyrənməyə başlayın.
        </Text>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {courses.map(course => (
        <ProfileCourseCard key={course.id} course={course} />
      ))}
    </div>
  );
};

export default UserOwnedCoursesTab;
