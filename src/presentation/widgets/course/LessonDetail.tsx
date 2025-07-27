import useGetCourseDetail from '@business/services/course/useGetCourseDetail';
import { useWatchCourseStore } from '@business/services/course/useWatchCourseStore';
import LessonResources from '@presentation/features/course/LessonResources';
import LessonsNavigate from '@presentation/features/course/LessonsNavigate';
import VideoPlayer from '@presentation/features/course/VideoPlayer';
import ErrorBox from '@presentation/shared/ui/ErrorBox';
import { FC, memo, useEffect } from 'react';

const LessonDetail: FC = () => {
  const currentLesson = useWatchCourseStore(state => state.currentLesson);
  const lastLessonId = useWatchCourseStore(state => state.lastLessonId);
  const courseSlug = useWatchCourseStore(state => state.courseSlug);
  const setCurrentLesson = useWatchCourseStore(state => state.setCurrentLesson);
  const { loading, data, error } = useGetCourseDetail({ courseSlug: courseSlug! });

  // Используем useEffect для восстановления последнего урока
  useEffect(() => {
    if (data && !currentLesson && lastLessonId) {
      const allLessons = data.sections.flatMap(section => section.lessons);
      const lastLesson = allLessons.find(lesson => lesson.id === lastLessonId);
      if (lastLesson) {
        setCurrentLesson(lastLesson);
      }
    }
  }, [data, currentLesson, lastLessonId, setCurrentLesson]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <ErrorBox messages="Oops! Something went wrong while getting course lessons... Please, try again later or contact with admin." />
    );
  }

  if (!currentLesson) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">
          {lastLessonId ? 'Last watched lesson not found' : 'Select a lesson to start watching'}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 px-5">
      <LessonsNavigate />
      <VideoPlayer
        lessonId={currentLesson.id}
        lastWatchedTime={currentLesson?.userProgresses?.progressSeconds}
        url={currentLesson.video?.url || ''}
      />
      <div className="bg-white rounded-b-lg shadow-sm border-x border-b border-gray-200 p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{currentLesson.title}</h1>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
          {currentLesson.description}
        </p>
        <LessonResources resources={currentLesson.resources} />
      </div>
    </div>
  );
};

const MemoizedLessonDetail = memo(LessonDetail);

export default MemoizedLessonDetail;
