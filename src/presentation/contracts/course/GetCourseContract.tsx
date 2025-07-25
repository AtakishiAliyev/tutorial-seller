import { HttpError } from '@infra/api/HttpError.ts';
import { GetPublicCourseDto } from '@infra/dto/course/GetPublicCourseDto.ts';
import { PaginatedResult } from '@infra/shared/dto/PaginatedResult.ts';
import { createContext, FC, ReactNode, useContext } from 'react';

export interface CourseContextType {
  courses: PaginatedResult<GetPublicCourseDto> | undefined;
  error: HttpError | null;
  loading: boolean;
}

export interface CourseProviderProps extends CourseContextType {
  children: ReactNode;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const CourseProvider: FC<CourseProviderProps> = ({ children, courses, loading, error }) => {
  const contextValue: CourseContextType = {
    courses,
    error,
    loading,
  };

  return <CourseContext.Provider value={contextValue}>{children}</CourseContext.Provider>;
};

// Хук для использования контекста курсов
export const useCourseContext = (): CourseContextType => {
  const context = useContext(CourseContext);

  if (context === undefined) {
    throw new Error('useCourseContext must be used within a CourseProvider');
  }

  return context;
};

// Основной компонент-контракт
export const GetCourseContract: FC<CourseProviderProps> = ({
  children,
  courses,
  loading,
  error,
}) => {
  return (
    <CourseProvider courses={courses} error={error} loading={loading}>
      {children}
    </CourseProvider>
  );
};

export default GetCourseContract;
