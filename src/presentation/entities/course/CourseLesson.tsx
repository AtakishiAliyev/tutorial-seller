import useSaveLessonProgress from '@business/services/course/useSaveLessonProgress.ts';
import { useWatchCourseStore } from '@business/services/course/useWatchCourseStore.ts';
import { Lesson } from '@infra/dto/course/GetCourseDetailDto.ts';
import Text from '@presentation/shared/ui/Typography.tsx';
import { timeFormattor } from '@presentation/shared/utils/timeFormattor.ts';
import { CirclePlay, Lock } from 'lucide-react';
import { ChangeEvent, FC, memo, MouseEvent, useCallback } from 'react';

type CourseLessonProps = {
  lesson: Lesson;
};

const CourseLesson: FC<CourseLessonProps> = ({ lesson }) => {
  const setCurrentLesson = useWatchCourseStore(state => state.setCurrentLesson);
  const stopVideoPlaying = useWatchCourseStore(state => state.stopVideoPlaying);
  const currentLesson = useWatchCourseStore(state => state.currentLesson);
  const { loading, saveLessonProgress } = useSaveLessonProgress({
    lessonId: lesson.id,
    invalidateQueries: true,
    showErrorNotification: true,
    showSuccessNotification: false,
  });

  const handleLessonClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      // Блокируем клик для непубличных уроков
      if (!lesson.isPublic) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      e.stopPropagation();
      e.preventDefault();
      setCurrentLesson(lesson as Lesson);
      stopVideoPlaying();
    },
    [setCurrentLesson, lesson, stopVideoPlaying],
  );

  if (!lesson) {
    return null;
  }

  const isLessonCompleted = lesson.userProgresses?.isCompleted === true;
  const isCurrentLesson = currentLesson?.id === lesson.id;
  const isPublicLesson = lesson.isPublic;

  return (
    <div
      onClick={handleLessonClick}
      id={`lesson-${lesson.id}`}
      className={`flex items-start space-x-3 p-2 rounded transition-colors ${
        isPublicLesson ? 'cursor-pointer hover:bg-gray-50' : 'cursor-not-allowed opacity-60'
      }`}
    >
      <div className="mt-1">
        {isPublicLesson ? (
          <input
            type="checkbox"
            disabled={loading}
            checked={isLessonCompleted}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 disabled:opacity-50"
            onClick={e => e.stopPropagation()}
            onChange={async (e: ChangeEvent<HTMLInputElement>) => {
              e.stopPropagation();
              e.preventDefault();
              await saveLessonProgress({
                isCompleted: !isLessonCompleted,
              });
            }}
          />
        ) : (
          <Lock className="w-4 h-4 text-gray-400" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font-medium ${
            isCurrentLesson && isPublicLesson
              ? 'text-blue-700'
              : isPublicLesson
                ? 'text-gray-500'
                : 'text-gray-400'
          }`}
        >
          {lesson.title}
          {!isPublicLesson && ' (Mövcud deyil)'}
        </p>
        <div className="flex items-center mt-1 space-x-1">
          {/* Video Icon */}
          <CirclePlay className="text-gray-400 text-sm" />
          <Text color={isPublicLesson ? 'muted' : 'secondary'} size="caption">
            {timeFormattor(lesson.duration)}min
          </Text>
        </div>
      </div>
    </div>
  );
};

const MemoizedCourseLesson = memo(CourseLesson);

export default MemoizedCourseLesson;
