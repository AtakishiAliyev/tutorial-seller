import useGetCourseDetail, {
  CourseDetailWithProgress,
} from '@business/services/course/useGetCourseDetail.ts';
import { useWatchCourseStore } from '@business/services/course/useWatchCourseStore.ts';
import { Dialog, Transition } from '@headlessui/react';
import CourseLesson from '@presentation/entities/course/CourseLesson.tsx';
import CourseProgressTracker from '@presentation/entities/course/CourseProgressTracker.tsx';
import CourseSection from '@presentation/entities/course/CourseSection.tsx';
import useWindowWidth from '@presentation/shared/hooks/useWindowWidth.ts';
import ErrorBox from '@presentation/shared/ui/ErrorBox.tsx';
import {
  useVisibility,
  VisibilityProvider,
  VisibilityTarget,
  VisibilityTrigger,
} from '@presentation/shared/ui/Visibility.tsx';
import { ChevronDown } from 'lucide-react';
import { FC, memo, ReactNode, useEffect } from 'react';
import { Fragment } from 'react';

type SidebarContentProps = {
  data: CourseDetailWithProgress;
};

// Компонент контента сайдбара (общий для мобильной и десктопной версии)
const SidebarContent: FC<SidebarContentProps> = ({ data }) => (
  <div className="flex flex-col h-full">
    <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
      <div className="space-y-4">
        <VisibilityProvider>
          {data?.sections?.map(section => (
            <VisibilityTrigger triggerKey={`section-${section.id}`} key={section.id}>
              <VisibilityTarget targetKey={`section-${section.id}`}>
                <CourseSection
                  section={section}
                  LessonComponent={CourseLesson}
                  isAnimating={true}
                  ToggleButtonIcon={ChevronDown}
                />
              </VisibilityTarget>
            </VisibilityTrigger>
          ))}
        </VisibilityProvider>
      </div>
    </div>
    <div className="border-t border-gray-200 p-4 sm:p-6">
      <CourseProgressTracker
        completedDurationSeconds={data.userTotalProgress}
        completedLessons={data.totalCompletedLessonsCount}
        totalDurationSeconds={data.totalDuration}
        totalLessons={data.totalLessonsCount}
      />
    </div>
  </div>
);

const MobileSidebar: FC<{
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}> = ({ isOpen, onClose, children }) => (
  <Transition show={isOpen} as={Fragment}>
    <Dialog as="div" className="relative z-50" onClose={onClose}>
      <Transition.Child
        as={Fragment}
        enter="ease-in-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in-out duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
      </Transition.Child>

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-300"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-300"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="pointer-events-auto w-screen max-w-xs">
                <div className="flex h-full flex-col bg-white shadow-xl">
                  {children}
                  <button
                    className="absolute top-4 right-4 p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close menu</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </div>
    </Dialog>
  </Transition>
);

const CourseSectionsSidebar: FC = () => {
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth > 0 && windowWidth < 768;
  const { state, set, reset } = useVisibility();

  // eslint-disable-next-line no-shadow
  const courseSlug = useWatchCourseStore(state => state.courseSlug);
  const { error, loading, data } = useGetCourseDetail({ courseSlug: courseSlug! });

  useEffect(() => {
    reset({
      'course-sidebar': false,
    });
  }, []);

  // Закрываем мобильный сайдбар при переходе на десктоп
  useEffect(() => {
    if (!isMobile && state['course-sidebar']) {
      set('course-sidebar', false);
    }
  }, [isMobile, set, state]);

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <ErrorBox messages="Oops! Something went wrong while getting course sections... Please, try again later or contact with admin." />
    );
  }

  return (
    <>
      {isMobile ? (
        <MobileSidebar
          isOpen={state['course-sidebar']}
          onClose={() => set('course-sidebar', false)}
        >
          <SidebarContent data={data} />
        </MobileSidebar>
      ) : (
        <aside className="w-80 sm:w-[35vw] lg:w-[25vw] relative">
          <div className="sticky h-[100dvh] top-0 w-full right-0 left-0 bottom-0 bg-white shadow-sm border-r border-gray-200 overflow-y-auto scrollbar-hide flex flex-col">
            <SidebarContent data={data} />
          </div>
        </aside>
      )}
    </>
  );
};

const MemoizedCourseSectionsSidebar = memo(CourseSectionsSidebar);

export default MemoizedCourseSectionsSidebar;
