import { cn } from '@presentation/shared/utils/cn.ts';
import { FC, memo, ReactNode } from 'react';

type CourseFilterProps = {
  className?: string;
  searchSlot?: ReactNode;
  sortSlot?: ReactNode;
};

const CourseFilter: FC<CourseFilterProps> = ({ sortSlot, searchSlot, className }) => {
  return (
    <div className={cn('flex justify-between gap-2', className)}>
      {searchSlot && searchSlot}
      {sortSlot && sortSlot}
    </div>
  );
};

const MemoizedCourseFilter = memo(CourseFilter);

export default MemoizedCourseFilter;
