import useGetOwnedCourses from '@business/services/course/useGetOwnedCourses.ts';
import ProfileCourseCard from '@presentation/entities/course/ProfileCourseCard.tsx';
import Text from '@presentation/shared/ui/Typography';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { FC } from 'react';

const UserOwnedCoursesTab: FC = () => {
  const { courses, loading, error } = useGetOwnedCourses({
    page: 1,
    limit: 50,
  });

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
        </div>
        <Text size="h3" weight="medium" color="muted">
          Kurslar yüklənir...
        </Text>
        <Text size="p" color="muted" className="text-center max-w-[400px]">
          Zəhmət olmasa gözləyin, kurs məlumatları yüklənir.
        </Text>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full">
          <div className="flex items-center mb-4">
            <AlertCircle className="h-6 w-6 text-red-500 mr-2" />
            <h3 className="text-lg font-medium text-red-800">Xəta baş verdi</h3>
          </div>
          <div className="text-red-700">
            <p>Kurs məlumatları yüklənərkən problem yaşandı.</p>
            <p className="mt-2 font-medium">{error.message || 'Naməlum xəta'}</p>
          </div>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <RefreshCw className="h-5 w-5 mr-2" />
          Yenidən yüklə
        </button>
      </div>
    );
  }

  // Empty state
  if (!courses?.data || courses?.data?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="bg-gray-50 rounded-full p-4 mb-4">
          <svg
            className="h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        </div>
        <Text size="h2" weight="semibold" color="muted" className="text-center">
          Hal-hazırda heç bir kursunuz yoxdur.
        </Text>
        <Text size="p" color="muted" className="mt-2 text-center max-w-[400px]">
          Yeni kurslar əldə etmək üçün əsas səyfəyə daxil olun və öyrənməyə başlayın.
        </Text>
      </div>
    );
  }

  // Success state
  return (
    <div className="flex flex-col gap-6">
      {courses?.data?.map(course => (
        <ProfileCourseCard key={course.id} course={course} />
      ))}
    </div>
  );
};

export default UserOwnedCoursesTab;
