import { useWatchCourseStore } from '@business/services/course/useWatchCourseStore.ts';
import { Lesson } from '@infra/dto/course/GetCourseDetailDto.ts';
import { timeFormattor } from '@presentation/shared/utils/timeFormattor.ts';
import { CirclePlay } from 'lucide-react';
import { FC, memo, MouseEvent, useCallback } from 'react';

type CourseLessonProps = {
  lesson: Lesson;
};

const CourseLesson: FC<CourseLessonProps> = ({ lesson }) => {
  const setCurrentLesson = useWatchCourseStore(state => state.setCurrentLesson);
  const stopVideoPlaying = useWatchCourseStore(state => state.stopVideoPlaying);
  const currentLesson = useWatchCourseStore(state => state.currentLesson);

  const handleLessonClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      e.preventDefault();
      setCurrentLesson(lesson as Lesson);
      stopVideoPlaying();
    },
    [setCurrentLesson, stopVideoPlaying, lesson],
  );

  if (!lesson) {
    return null;
  }

  const isLessonCompleted = lesson.userProgress?.isCompleted === true;
  const isCurrentLesson = currentLesson?.id === lesson.id;

  return (
    <div
      onClick={handleLessonClick}
      className="flex items-start space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
    >
      <div className="mt-1">
        <input
          type="checkbox"
          checked={isLessonCompleted}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p
          className={`text-sm font-medium ${
            isLessonCompleted
              ? 'text-gray-900'
              : isCurrentLesson
                ? 'text-blue-700'
                : 'text-gray-500'
          }`}
        >
          {lesson.title}
        </p>
        <div className="flex items-center mt-1 space-x-1">
          {/* Video Icon */}
          <CirclePlay className="text-gray-400 text-sm" />
          <span className="text-xs text-gray-500">{timeFormattor(lesson.duration)}min</span>
        </div>
      </div>
    </div>
  );
};

const MemoizedCourseLesson = memo(CourseLesson);

export default MemoizedCourseLesson;
