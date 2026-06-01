import 'react-loading-skeleton/dist/skeleton.css';

import useIsCourseOwned from '@business/services/course/useIsCourseOwned.ts';
import { useBuyCourseContract } from '@presentation/contracts/course/BuyCourseContract.tsx';
import Button from '@presentation/shared/ui/Button';
import ErrorBox from '@presentation/shared/ui/ErrorBox.tsx';
import { FC, memo, useCallback } from 'react';
import Skeleton from 'react-loading-skeleton';

type CourseActionProps = {
  courseSlug: string;
  courseName: string; // Оставил, как вы и просили, хотя для прямой покупки он может уже не понадобиться
  courseId: string;
};

const CourseAction: FC<CourseActionProps> = props => {
  const { courseSlug } = props;

  // 1. Состояние владения курсом
  const { loading: ownershipLoading, error, isOwned } = useIsCourseOwned(props);

  // 2. Достаем метод покупки из контекста (который мы обернули в BuyCourseWidget)
  const { buyCourse, loading: buyLoading } = useBuyCourseContract();

  // Прямой вызов покупки без всяких модалок
  const handleBuyCourse = useCallback(async () => {
    if (courseSlug) {
      await buyCourse(courseSlug);
    }
  }, [buyCourse, courseSlug]);

  // Обработка состояний загрузки владения курсом и ошибок
  if (ownershipLoading) {
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

  // Главный "счастливый путь": пользователь владеет курсом и он активен
  if (isOwned?.isOwned && isOwned.isActive) {
    return (
      <Button variant="primary" to={`/courses/watch/${courseSlug}`} className="w-full">
        Kursu izləyin
      </Button>
    );
  }

  // Пользователь владеет курсом, но он неактивен
  if (isOwned?.isOwned && !isOwned.isActive) {
    if (isOwned.payment?.status === 'APPROVED') {
      return (
        <Button variant="primary" disabled={true} className="w-full">
          Bu kursa girişiniz yoxdur. Administrator ilə əlaqə saxlayın
        </Button>
      );
    } else {
      return (
        <Button
          variant="primary"
          onClick={handleBuyCourse}
          disabled={buyLoading}
          className="w-full"
        >
          {buyLoading ? 'Yüklənir...' : 'Kursu indi al'}
        </Button>
      );
    }
  }

  // У пользователя нет курса
  if (isOwned?.isOwned === false) {
    return (
      <Button
        onClick={handleBuyCourse}
        variant="primary"
        disabled={buyLoading}
        className="w-full flex items-center justify-center gap-2"
      >
        {buyLoading ? 'Yüklənir...' : 'Kursu indi al'}
      </Button>
    );
  }

  return null;
};

const MemoizedCourseAction = memo(CourseAction);

export default MemoizedCourseAction;

