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
    // TODO: Add loading skeleton
    return (
      <div className="flex items-center justify-center h-full">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <ErrorBox messages="Oops! Something went wrong while getting course lessons... Please, try again later or contact with admin." />
    );
  }

  const allLessons = data.sections.flatMap(section => section.lessons);
  const currentLessonIndex = allLessons.findIndex(lesson => lesson.id === currentLesson?.id);
  const nextLesson = allLessons[currentLessonIndex + 1];
  const prevLesson = allLessons[currentLessonIndex - 1];

  const isNextDisabled = !nextLesson;
  const isPrevDisabled = !prevLesson;

  return (
    <div className="bg-white border-b border-gray-200 py-4 sm:py-6">
      <div className="flex items-center justify-between">
        <div className="hidden sm:flex items-center space-x-4">
          <Button
            variant="outline"
            disabled={isPrevDisabled}
            onClick={() => {
              if (prevLesson) {
                setCurrentLesson(prevLesson);
              }
            }}
          >
            Previous
          </Button>
          <Button
            variant="primary"
            disabled={isNextDisabled}
            onClick={() => {
              if (nextLesson) {
                setCurrentLesson(nextLesson);
              }
            }}
          >
            Next Lesson
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Buttons */}
      <div className="sm:hidden mt-4 flex space-x-3">
        <button className="flex-1 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors border border-gray-300 rounded-lg">
          Previous
        </button>
        <button className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
          Next Lesson
        </button>
      </div>
    </div>
  );
};

const MemoizedLessonsNavigate = memo(LessonsNavigate);

export default MemoizedLessonsNavigate;
