import { Lesson, Section } from '@infra/dto/course/GetCourseDetailDto.ts';
import Text from '@presentation/shared/ui/Typography.tsx';
import { cn } from '@presentation/shared/utils/cn.ts';
import { timeFormattor } from '@presentation/shared/utils/timeFormattor.ts';
import { ComponentType, FC, memo, useMemo } from 'react';

type CourseSectionProps = {
  isOpen?: boolean;
  section: Section;
  ToggleButtonIcon?: ComponentType<{ className?: string }>;
  isAnimating?: boolean;
  onClick?: () => void;
  LessonComponent: ComponentType<{ lesson: Lesson }>;
};

const CourseSection: FC<CourseSectionProps> = ({
  isOpen,
  ToggleButtonIcon,
  isAnimating,
  onClick,
  section,
  LessonComponent,
}) => {
  const sectionDuration = useMemo(() => {
    return section.lessons.reduce((total, lesson) => total + (lesson.duration || 0), 0);
  }, [section.lessons]);
  const sectionDurationFormatted = useMemo(() => timeFormattor(sectionDuration), [sectionDuration]);
  const completedLessonsCount = useMemo(() => {
    return section.lessons.filter(lesson => lesson.userProgress?.isCompleted).length;
  }, [section.lessons]);
  const totalLessonsCount = useMemo(() => {
    return section.lessons.length;
  }, [section.lessons]);

  console.log('isOpen', isOpen);
  console.log('OnClick', onClick);

  if (section.lessons?.length === 0) {
    return <div>Placeholder for empty section. TODO: Add empty section component</div>;
  }

  return (
    <div className="border border-gray-200 rounded-lg bg-white">
      {/* Module Header */}
      <div
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={onClick}
      >
        <div className="flex-1">
          <Text color="primary">{section.title}</Text>
          <Text size="caption" color="muted" className="mt-1">
            {completedLessonsCount} / {totalLessonsCount} | {sectionDurationFormatted}min
          </Text>
        </div>
        <div className="ml-4">
          {ToggleButtonIcon ? (
            <ToggleButtonIcon
              className={cn({
                transform: true,
                'transition-all duration-300': isAnimating,
                'rotate-180': isOpen,
                'rotate-0': !isOpen,
              })}
            />
          ) : (
            <span>{isOpen ? '▲' : '▼'}</span>
          )}
        </div>
      </div>

      {/* Module Content */}
      {isOpen && (
        <div className="border-t border-gray-200">
          <div className="p-4 space-y-3">
            {section.lessons.map(lesson => (
              <LessonComponent key={lesson.id} lesson={lesson} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const MemoizedCourseSection = memo(CourseSection);

export default MemoizedCourseSection;
