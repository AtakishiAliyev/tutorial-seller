import useBuyCourse from '@business/services/course/useBuyCourse';
import BuyCourseContract from '@presentation/contracts/course/BuyCourseContract.tsx';
import { type FC, memo, ReactNode } from 'react';

type BuyCourseWidgetProps = {
  children?: ReactNode;
};

const BuyCourseWidget: FC<BuyCourseWidgetProps> = ({ children }) => {
  const { loading, buyCourse, error } = useBuyCourse({
    showErrorNotification: true,
  });

  return (
    <BuyCourseContract buyCourse={buyCourse} loading={loading} error={error}>
      {children}
    </BuyCourseContract>
  );
};

const MemoizedBuyCourseWidget = memo(BuyCourseWidget);

export default MemoizedBuyCourseWidget;
