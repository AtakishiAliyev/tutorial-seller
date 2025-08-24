import 'react-loading-skeleton/dist/skeleton.css';

import useIsCourseOwned from '@business/services/course/useIsCourseOwned.ts';
import Button from '@presentation/shared/ui/Button'; // Import your Button component
import ErrorBox from '@presentation/shared/ui/ErrorBox.tsx';
import { FC, memo } from 'react';
import Skeleton from 'react-loading-skeleton';

type CourseActionProps = {
  courseSlug: string;
};

const CourseAction: FC<CourseActionProps> = props => {
  const { courseSlug } = props;
  const { loading, error, isOwned } = useIsCourseOwned(props);

  if (loading) return <Skeleton height={44} width="100%" borderRadius={8} />;

  if (error && error.statusCode !== 401)
    return (
      <ErrorBox messages="Oops! Kursun mülkiyyətini yoxlayarkən problem yarandı... Zəhmət olmasa, səhifəni yenidən yükləyin" />
    );

  // İstifadəçi daxil olmayıb (401 Unauthorized)
  if (error?.statusCode === 401) {
    return (
      <Button variant="primary" to={`/login?courseToBuy=${courseSlug}`} className="w-full">
        Almaq üçün daxil olun
      </Button>
    );
  }

  if (isOwned?.isOwned === false) {
    return (
      <Button variant="primary" className="w-full">
        İndi al
      </Button>
    );
  }

  if (isOwned?.isOwned === true && isOwned?.isActive === false) {
    return (
      <Button variant="primary" disabled={true} className="w-full">
        Bu kursa girişiniz yoxdur. Administrator ilə əlaqə saxlayın
      </Button>
    );
  }

  return (
    <Button variant="primary" to={`/courses/watch/${courseSlug}`} className="w-full">
      Kursu izləyin
    </Button>
  );
};

const MemoizedCourseAction = memo(CourseAction);

export default MemoizedCourseAction;
