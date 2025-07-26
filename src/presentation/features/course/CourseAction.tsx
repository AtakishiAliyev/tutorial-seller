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
      <ErrorBox messages="Oops! Something went wrong while checking ownership of course... Please, restart the page" />
    );

  // User is not signed in (401 Unauthorized)
  if (error?.statusCode === 401) {
    return (
      <Button variant="primary" to={`/login?courseToBuy=${courseSlug}`} className="w-full">
        Sign in to buy
      </Button>
    );
  }

  if (isOwned?.isOwned === false) {
    return (
      <Button variant="primary" className="w-full">
        Buy now
      </Button>
    );
  }

  if (isOwned?.isOwned === true && isOwned?.isActive === false) {
    return (
      <Button variant="primary" disabled={true} className="w-full">
        You don't have access to this course. Contact with admin
      </Button>
    );
  }

  return (
    <Button variant="primary" to={`/courses/watch/${courseSlug}`} className="w-full">
      Watch course
    </Button>
  );
};

const MemoizedCourseAction = memo(CourseAction);

export default MemoizedCourseAction;
