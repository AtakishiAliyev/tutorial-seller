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
      <div className="flex justify-between items-center">
        <Text size="p" weight="semibold" color="secondary" className="text-gray-900">
          Kursun Gedişatı
        </Text>
        <Text size="subtitle" weight="semibold" color="muted" className="text-gray-600">
          {percentage}%
        </Text>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2" title={`${percentage}% tamamlanıb`}>
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>

      {/* Dərslərin sayı */}
      <Text size="subtitle" color="secondary">
        {totalLessons} dərsdən {completedLessons}-i tamamlandı
      </Text>

      {/* Vaxtın təfərrüatları */}
      <div className="space-y-1 pt-2">
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
          <Text size="subtitle" color="muted" className="flex-1">
            Tamamlanan vaxt
          </Text>
          <Text size="subtitle" weight="medium" color="secondary">
            {completedMinutes} dəq / {totalMinutes} dəq
          </Text>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 mr-2 flex-shrink-0" aria-hidden="true" />
          <Text size="subtitle" color="muted" className="flex-1">
            Təxmini qalan vaxt
          </Text>
          <Text size="subtitle" weight="medium" color="secondary">
            {remainingMinutes} dəq
          </Text>
        </div>
      </div>
    </div>
  );
};

const MemoizedCourseProgressTracker = memo(CourseProgressTracker);

export default MemoizedCourseProgressTracker;
