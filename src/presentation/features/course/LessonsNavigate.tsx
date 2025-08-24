import useGetCourseDetail from '@business/services/course/useGetCourseDetail.ts';
import { useWatchCourseStore } from '@business/services/course/useWatchCourseStore.ts';
import Button from '@presentation/shared/ui/Button.tsx';
import ErrorBox from '@presentation/shared/ui/ErrorBox.tsx';
import { memo } from 'react';

const LessonsNavigate = () => {
  const courseSlug = useWatchCourseStore(state => state.courseSlug);
  const { loading, data, error } = useGetCourseDetail({ courseSlug: courseSlug! });
  const setCurrentLesson = useWatchCourseStore(state => state.setCurrentLesson);
  const currentLesson = useWatchCourseStore(state => state.currentLesson);

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Yüklənir...</p>
      </div>
    );
  }

  if (error) {
    return (
      <ErrorBox messages="Ups! Kurs dərslərini gətirərkən xəta baş verdi... Zəhmət olmasa, sonra yenidən cəhd edin və ya administrator ilə əlaqə saxlayın." />
    );
  }

  // Получаем все публичные уроки
  const publicLessons = data.sections
    .flatMap(section => section.lessons)
    .filter(lesson => lesson.isPublic);

  // Находим индекс текущего урока в массиве публичных уроков
  const currentLessonIndex = publicLessons.findIndex(lesson => lesson.id === currentLesson?.id);

  // Определяем следующий и предыдущий публичные уроки
  const nextLesson = publicLessons[currentLessonIndex + 1];
  const prevLesson = publicLessons[currentLessonIndex - 1];

  const isNextDisabled = !nextLesson;
  const isPrevDisabled = !prevLesson;

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 md:gap-4">
        <Button
          variant="outline"
          disabled={isPrevDisabled}
          onClick={() => setCurrentLesson(prevLesson)}
        >
          Əvvəlki
        </Button>
        <Button
          variant="primary"
          disabled={isNextDisabled}
          onClick={() => setCurrentLesson(nextLesson)}
        >
          Növbəti Dərs
        </Button>
      </div>
    </div>
  );
};

const MemoizedLessonsNavigate = memo(LessonsNavigate);

export default MemoizedLessonsNavigate;
