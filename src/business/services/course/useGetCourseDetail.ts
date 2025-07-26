import { useWatchCourseStore } from '@business/services/course/useWatchCourseStore.ts';
import { HttpError } from '@infra/api/HttpError.ts';
import { GetCourseDetailDto } from '@infra/dto/course/GetCourseDetailDto.ts';
import courseRepository from '@infra/repositories/course';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export type UseGetCourseDetailProps = {
  courseSlug: string;
};

export type CourseDetailWithProgress = GetCourseDetailDto & {
  totalDuration: number;
  userTotalProgress: number;
};

const useGetCourseDetail = ({ courseSlug }: UseGetCourseDetailProps) => {
  const setCourseTotalDuration = useWatchCourseStore(state => state.setCourseTotalDuration);
  const setUserTotalProgress = useWatchCourseStore(state => state.setUserTotalProgress);

  const { error, data, isLoading } = useQuery<
    GetCourseDetailDto,
    HttpError,
    CourseDetailWithProgress
  >({
    queryFn: async () => await courseRepository.getCourseDetails(courseSlug),
    queryKey: ['course', 'owned', courseSlug],
    select: courseData => {
      const totalDuration = courseData.sections.reduce((total, section) => {
        const sectionDuration = section.lessons.reduce((sectionTotal, lesson) => {
          return sectionTotal + (lesson.duration || 0);
        }, 0);
        return total + sectionDuration;
      }, 0);

      const userTotalProgress = courseData.sections.reduce((total, section) => {
        const sectionProgress = section.lessons.reduce((sectionTotal, lesson) => {
          // Суммируем прогресс по каждому уроку, если он есть
          return sectionTotal + (lesson.userProgress?.progressSeconds || 0);
        }, 0);
        return total + sectionProgress;
      }, 0);

      return {
        ...courseData,
        totalDuration,
        userTotalProgress,
      };
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data && data.totalDuration !== undefined && data.userTotalProgress !== undefined) {
      setCourseTotalDuration(data.totalDuration);
      setUserTotalProgress(data.userTotalProgress);
    }
  }, [data, setCourseTotalDuration, setUserTotalProgress]);

  return {
    data,
    loading: isLoading,
    error,
  };
};

export default useGetCourseDetail;
