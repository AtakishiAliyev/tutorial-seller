import { useWatchCourseStore } from '@business/services/course/useWatchCourseStore.ts';
import { Lesson, Section } from '@infra/dto/course/GetCourseDetailDto.ts';
import Text from '@presentation/shared/ui/Typography.tsx';
import { cn } from '@presentation/shared/utils/cn.ts';
import { timeFormattor } from '@presentation/shared/utils/timeFormattor.ts';
import { ComponentType, FC, memo, useEffect, useMemo } from 'react';

type CourseSectionProps = {
  isOpen?: boolean;
  section: Section;
  ToggleButtonIcon?: ComponentType<{ className?: string }>;
  isAnimating?: boolean;
  onClick?: () => void;
  LessonComponent: ComponentType<{
    lesson: Lesson;
    prevLesson?: Lesson | null;
    nextLesson?: Lesson | null;
  }>;
};

const CourseSection: FC<CourseSectionProps> = ({
  isOpen,
  ToggleButtonIcon,
  isAnimating,
  onClick,
  section,
  LessonComponent,
}) => {
  const currentLesson = useWatchCourseStore(state => state.currentLesson);
  const sectionDuration = useMemo(() => {
    return section.lessons.reduce((total, lesson) => total + (lesson.duration || 0), 0);
  }, [section.lessons]);
  const sectionDurationFormatted = useMemo(() => timeFormattor(sectionDuration), [sectionDuration]);
  const completedLessonsCount = useMemo(() => {
    return section.lessons.filter(lesson => lesson.userProgresses?.isCompleted).length;
  }, [section.lessons]);
  const totalLessonsCount = useMemo(() => {
    return section.lessons.length;
  }, [section.lessons]);

  const isCurrentLessonInSection = useMemo(() => {
    return currentLesson && section.lessons.some(lesson => lesson.id === currentLesson.id);
  }, [currentLesson, section.lessons]);

  useEffect(() => {
    if (isCurrentLessonInSection && !isOpen) {
      onClick?.();
    }
  }, [isCurrentLessonInSection, isOpen, onClick]);

  if (section.lessons?.length === 0) {
    return <div>Placeholder for empty section. TODO: Add empty section component</div>;
  }

  return (
    <div className="border border-gray-200 rounded-lg bg-white">
      {/* Module Header */}
      <div
        className={cn({
          'flex items-center justify-between p-4 gap-4 hover:bg-gray-50 transition-colors': true,
          'cursor-pointer': !isCurrentLessonInSection,
          'cursor-not-allowed bg-gray-100': isCurrentLessonInSection,
        })}
        onClick={!isCurrentLessonInSection ? onClick : undefined}
        aria-disabled={!isCurrentLessonInSection}
      >
        <div className="flex flex-col gap-1">
          <Text weight="semibold" color="primary">
            {section.title}
          </Text>
          <Text size="subtitle" color="muted">
            {completedLessonsCount} / {totalLessonsCount} | {sectionDurationFormatted}min
          </Text>
        </div>
        <div>
          {!isCurrentLessonInSection ? (
            ToggleButtonIcon ? (
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
            )
          ) : null}
        </div>
      </div>

      {/* Module Content */}
      {isOpen && (
        <div className="border-t border-gray-200">
          <div className="p-4 space-y-3">
            {section.lessons.map((lesson, index) => (
              <LessonComponent
                key={lesson.id}
                lesson={lesson}
                prevLesson={index > 0 ? section.lessons[index - 1] : null}
                nextLesson={index < section.lessons.length - 1 ? section.lessons[index + 1] : null}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const MemoizedCourseSection = memo(CourseSection);

export default MemoizedCourseSection;
