import useGetCourseDetail from '@business/services/course/useGetCourseDetail.ts';
import CourseLesson from '@presentation/entities/course/CourseLesson.tsx';
import CourseSection from '@presentation/entities/course/CourseSection.tsx';
import ErrorBox from '@presentation/shared/ui/ErrorBox.tsx';
import {
  VisibilityProvider,
  VisibilityTarget,
  VisibilityTrigger,
} from '@presentation/shared/ui/Visibility.tsx';
import { ChevronDown } from 'lucide-react';
import { FC, memo } from 'react';

type CourseSectionsSidebarProps = {
  courseSlug: string;
};

const CourseSectionsSidebar: FC<CourseSectionsSidebarProps> = ({ courseSlug }) => {
  const { error, loading, data } = useGetCourseDetail({ courseSlug });

  if (loading) {
    // TODO: Add loading skeleton
    return (
      <div className="flex items-center justify-center h-full">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <ErrorBox messages="Oops! Something went wrong while gettiong course sections... Please, try again later or contact with admin." />
    );
  }

  return (
    <aside className="w-80 sm:w-[25vw] h-[100dvh]">
      <div className="w-full h-[100dvh]  bg-white shadow-sm border-r border-gray-200 overflow-y-auto scrollbar-hide flex flex-col">
        <div className="flex-1 p-4 sm:p-6">
          {/* Mobile Close Button */}
          {/*<div className="flex items-center justify-between mb-6 lg:block">*/}
          {/*    <h2 className="text-lg font-semibold text-gray-900">*/}
          {/*        Course Content*/}
          {/*    </h2>*/}
          {/*    <button*/}
          {/*        onClick={onClose}*/}
          {/*        className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"*/}
          {/*    >*/}
          {/*        <CloseOutlined className="text-gray-500" />*/}
          {/*    </button>*/}
          {/*</div>*/}

          {/* Course Modules */}
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
      </div>
    </aside>
  );
};

const MemoizedCourseSectionsSidebar = memo(CourseSectionsSidebar);

export default MemoizedCourseSectionsSidebar;
