import useGetCourseDetail from '@business/services/course/useGetCourseDetail';
import { useWatchCourseStore } from '@business/services/course/useWatchCourseStore';
import LessonResources from '@presentation/features/course/LessonResources';
import LessonsNavigate from '@presentation/features/course/LessonsNavigate';
import VideoPlayer from '@presentation/features/course/VideoPlayer';
import Button from '@presentation/shared/ui/Button.tsx';
import ErrorBox from '@presentation/shared/ui/ErrorBox';
import { useVisibility } from '@presentation/shared/ui/Visibility.tsx';
import { Menu, VideoOff } from 'lucide-react';
import { FC, memo, useCallback, useEffect } from 'react';

const LessonDetail: FC = () => {
  const currentLesson = useWatchCourseStore(state => state.currentLesson);
  const lastLessonId = useWatchCourseStore(state => state.lastLessonId);
  const courseSlug = useWatchCourseStore(state => state.courseSlug);
  const setCurrentLesson = useWatchCourseStore(state => state.setCurrentLesson);
  const { loading, data, error } = useGetCourseDetail({ courseSlug: courseSlug! });
  const { set } = useVisibility();

  const handleCourseSidebarOpen = useCallback(() => {
    set('course-sidebar', true);
  }, [set]);

  // Sonuncu dərsi bərpa etmək üçün useEffect istifadə olunur
  useEffect(() => {
    if (data && !currentLesson && lastLessonId) {
      const allLessons = data.sections.flatMap(section => section.lessons);
      const lastLesson = allLessons.find(lesson => lesson.id === lastLessonId);
      if (lastLesson) {
        setCurrentLesson(lastLesson);
      }
    }
  }, [data, currentLesson, lastLessonId, setCurrentLesson]);

  // Проверка наличия видео
  const hasVideo = currentLesson?.video?.url && currentLesson.video.url.trim() !== '';

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Yüklənir...</p>
      </div>
    );
  }

  if (error) {
    return (
      <ErrorBox messages="Ups! Kurs dərslərini gətirərkən xəta baş verdi... Zəhmət olmasa, sonra yenidən cəhd edin və ya administrator ilə əlaqə saxlayın." />
    );
  }

  if (!currentLesson) {
    return (
      <div className="flex flex-col items-center justify-center h-[50dvh] w-full px-6 text-center">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 max-w-md w-full">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Menu className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            {lastLessonId ? 'Dərs tapılmadı' : 'Dərs seçilməyib'}
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            {lastLessonId
              ? 'Son izlədiyiniz dərs artıq mövcud deyil. Sol tərəfdən başqa dərs seçin.'
              : 'Öyrənməyə başlamaq üçün sol tərəfdəki siyahıdan istədiyiniz dərsi seçin.'}
          </p>
          <Button onClick={handleCourseSidebarOpen} className="w-full md:hidden" variant="outline">
            <Menu className="w-4 h-4 mr-2" />
            Dərslər siyahısını aç
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 px-5">
      <div className="bg-white flex items-center border-b border-gray-200 py-4 sm:py-6 justify-between gap-2">
        <Button
          onClick={handleCourseSidebarOpen}
          className="w-fit md:hidden block"
          variant="outline"
        >
          <Menu />
        </Button>
        <LessonsNavigate />
      </div>

      {/* Условное отображение VideoPlayer или сообщения об отсутствии видео */}
      {hasVideo ? (
        <div className="mt-6 w-full lg:w-[750px]">
          <VideoPlayer
              lessonId={currentLesson.id}
              lastWatchedTime={currentLesson?.userProgresses?.progressSeconds}
              url={currentLesson.video?.url || ''}
          />
        </div>
      ) : (
        <div className="relative w-full h-[80dvh] md:h-[500px] bg-gray-100 rounded-t-lg flex items-center justify-center border-x border-t border-gray-200">
          <div className="text-center">
            <VideoOff className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-gray-600 text-xl mb-2">Video müvəqqəti mövcud deyil</h3>
            <p className="text-gray-500 text-sm">
              Bu dərsin videosu hazırda mövcud deyil. Zəhmət olmasa sonra yenidən cəhd edin.
            </p>
          </div>
        </div>
      )}

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
