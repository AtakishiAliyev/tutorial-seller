import 'react-loading-skeleton/dist/skeleton.css';

import useIsCourseOwned from '@business/services/course/useIsCourseOwned.ts';
import Button from '@presentation/shared/ui/Button';
import ErrorBox from '@presentation/shared/ui/ErrorBox.tsx';
import { FC, memo, useCallback } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useVisibilityActions } from 'react-visibility-manager';

type CourseActionProps = {
  courseSlug: string;
  courseName: string; // prop courseName не использовался, но я его оставил
  courseId: string;
};

const CourseAction: FC<CourseActionProps> = props => {
  const { courseSlug, courseId, courseName } = props;
  const { loading, error, isOwned } = useIsCourseOwned(props);
  const { set } = useVisibilityActions();

  const handleBuyCourse = useCallback(async () => {
    set('buy-course', true, {
      courseId,
      courseSlug,
      courseName,
    });
  }, [courseId, courseName, courseSlug, set]);

  // 1. Обработка состояний загрузки и ошибок
  if (loading) {
    return <Skeleton height={44} width="100%" borderRadius={8} />;
  }

  if (error) {
    if (error.statusCode === 401) {
      return (
        <Button variant="primary" to={`/login?courseToBuy=${courseSlug}`} className="w-full">
          Almaq üçün daxil olun
        </Button>
      );
    }
    return (
      <ErrorBox messages="Oops! Kursun mülkiyyətini yoxlayarkən problem yarandı... Zəhmət olmasa, səhifəni yenidən yükləyin" />
    );
  }

  // 2. Главный "счастливый путь": пользователь владеет курсом и он активен
  if (isOwned?.isOwned && isOwned.isActive) {
    return (
      <Button variant="primary" to={`/courses/watch/${courseSlug}`} className="w-full">
        Kursu izləyin
      </Button>
    );
  }

  // 3. Пользователь владеет курсом, но он неактивен
  if (isOwned?.isOwned && !isOwned.isActive) {
    // Проверяем статус платежа, чтобы показать нужную кнопку
    if (isOwned.payment?.status === 'APPROVED') {
      return (
        <Button variant="primary" disabled={true} className="w-full">
          Bu kursa girişiniz yoxdur. Administrator ilə əlaqə saxlayın
        </Button>
      );
    } else {
      return (
        <Button variant="primary" onClick={handleBuyCourse} className="w-full">
          Kursu indi al
        </Button>
      );
    }
  }

  if (isOwned?.isOwned === false) {
    return (
      <Button
        onClick={handleBuyCourse}
        variant="primary"
        className="w-full flex items-center gap-2"
      >
        Kursu indi al
      </Button>
    );
  }

  return null;
};

const MemoizedCourseAction = memo(CourseAction);

export default MemoizedCourseAction;
