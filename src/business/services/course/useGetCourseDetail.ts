import { HttpError } from '@infra/api/HttpError.ts';
import { GetCourseDetailDto } from '@infra/dto/course/GetCourseDetailDto.ts';
import courseRepository from '@infra/repositories/course';
import { useQuery } from '@tanstack/react-query';

export type UseGetCourseDetailProps = {
  courseSlug: string;
};

export type CourseDetailWithProgress = GetCourseDetailDto & {
  totalDuration: number;
  userTotalProgress: number;
  totalLessonsCount: number;
  totalCompletedLessonsCount: number;
};

const useGetCourseDetail = ({ courseSlug }: UseGetCourseDetailProps) => {
  const { error, data, isLoading } = useQuery<
    GetCourseDetailDto,
    HttpError,
    CourseDetailWithProgress
  >({
    queryFn: async () => await courseRepository.getCourseDetails(courseSlug),
    queryKey: ['course', 'watch', courseSlug],
    select: courseData => {
      const totalDuration = courseData.sections.reduce((total, section) => {
        const sectionDuration = section.lessons.reduce((sectionTotal, lesson) => {
          return sectionTotal + (lesson.duration || 0);
        }, 0);
        return total + sectionDuration;
      }, 0);

      const userTotalProgress = courseData.sections.reduce((total, section) => {
        const sectionProgress = section.lessons.reduce((sectionTotal, lesson) => {
          // Суммируем прогресс по каждому уроку, если он есть. Если урок завершен, добавляем его полную длительность.
          // Если урок не завершен, добавляем прогресс пользователя.
          return (
            sectionTotal +
            (lesson.userProgresses?.isCompleted
              ? lesson.duration
              : lesson.userProgresses?.progressSeconds || 0)
          );
        }, 0);
        return total + sectionProgress;
      }, 0);

      const totalLessonsCount = courseData.sections.reduce((total, section) => {
        return total + section.lessons.length;
      }, 0);

      const totalCompletedLessonsCount = courseData.sections.reduce((total, section) => {
        return total + section.lessons.filter(lesson => lesson.userProgresses?.isCompleted).length;
      }, 0);

      return {
        ...courseData,
        totalDuration,
        userTotalProgress,
        totalLessonsCount,
        totalCompletedLessonsCount,
      };
    },
    refetchOnWindowFocus: false,
  });

  return {
    data,
    loading: isLoading,
    error,
  };
};

export default useGetCourseDetail;
