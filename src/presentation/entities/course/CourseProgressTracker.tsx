import Text from '@presentation/shared/ui/Typography';
import { Clock } from 'lucide-react';
import { FC, memo } from 'react';

type CourseProgressTrackerProps = {
  completedLessons: number;
  totalLessons: number;
  completedDurationSeconds: number;
  totalDurationSeconds: number;
};

const CourseProgressTracker: FC<CourseProgressTrackerProps> = ({
  completedLessons,
  totalLessons,
  completedDurationSeconds,
  totalDurationSeconds,
}) => {
  const percentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  const completedMinutes = Math.round(completedDurationSeconds / 60);
  const totalMinutes = Math.round(totalDurationSeconds / 60);
  const remainingMinutes = totalMinutes - completedMinutes;

  return (
    <div className="space-y-3">
      {/* Заголовок и процент */}
      <div className="flex justify-between items-center">
        <Text size="p" weight="semibold" color="secondary" className="text-gray-900">
          Course Progress
        </Text>
        <Text size="subtitle" weight="semibold" color="muted" className="text-gray-600">
          {percentage}%
        </Text>
      </div>

      {/* Прогресс-бар */}
      <div className="w-full bg-gray-200 rounded-full h-2" title={`${percentage}% complete`}>
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>

      {/* Количество уроков */}
      <Text size="subtitle" color="secondary">
        {completedLessons} of {totalLessons} lessons completed
      </Text>

      {/* Детализация по времени */}
      <div className="space-y-1 pt-2">
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
          <Text size="subtitle" color="muted" className="flex-1">
            Time Completed
          </Text>
          <Text size="subtitle" weight="medium" color="secondary">
            {completedMinutes}min / {totalMinutes}min
          </Text>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 mr-2 flex-shrink-0" aria-hidden="true" />
          <Text size="subtitle" color="muted" className="flex-1">
            Estimated remaining
          </Text>
          <Text size="subtitle" weight="medium" color="secondary">
            {remainingMinutes}min
          </Text>
        </div>
      </div>
    </div>
  );
};

const MemoizedCourseProgressTracker = memo(CourseProgressTracker);

export default MemoizedCourseProgressTracker;
