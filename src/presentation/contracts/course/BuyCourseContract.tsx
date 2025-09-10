import { HttpError } from '@infra/api/HttpError.ts';
import { BuyCourseResponseDto } from '@infra/dto/course/BuyCourseResponseDto.ts';
import { UseMutateAsyncFunction } from '@tanstack/react-query';
import { createContext, FC, memo, ReactNode, useContext, useMemo } from 'react';

export interface BuyCourseContextType {
  buyCourse: UseMutateAsyncFunction<BuyCourseResponseDto, HttpError, string>;
  error: string[];
  loading: boolean;
}

export interface BuyCourseProviderProps extends BuyCourseContextType {
  children: ReactNode;
}

const BuyCourseContext = createContext<BuyCourseContextType | undefined>(undefined);

export const BuyCourseProvider: FC<BuyCourseProviderProps> = ({
  children,
  buyCourse,
  loading,
  error,
}) => {
  const contextValue: BuyCourseContextType = useMemo(
    () => ({
      buyCourse,
      loading,
      error,
    }),
    [buyCourse, loading, error],
  );

  return <BuyCourseContext.Provider value={contextValue}>{children}</BuyCourseContext.Provider>;
};

export const useBuyCourseContract = (): BuyCourseContextType => {
  const context = useContext(BuyCourseContext);

  if (context === undefined) {
    throw new Error('useBuyCourseContext must be used within a BuyCourseProvider');
  }

  return context;
};

// Основной компонент-контракт
const GetBuyCourseContract: FC<BuyCourseProviderProps> = ({
  children,
  buyCourse,
  loading,
  error,
}) => {
  return (
    <BuyCourseProvider buyCourse={buyCourse} loading={loading} error={error}>
      {children}
    </BuyCourseProvider>
  );
};

const MemoizedGetBuyCourseContract = memo(GetBuyCourseContract);

export default MemoizedGetBuyCourseContract;
