import { CreateCreditRequestDto } from '@infra/dto/credit/CreateCreditRequestDto.ts';
import {
  type BaseSyntheticEvent,
  createContext,
  FC,
  memo,
  type ReactNode,
  useContext,
  useMemo,
} from 'react';
import { UseFormReturn } from 'react-hook-form';

export interface CreateCreditRequestContextType {
  createCreditRequest: (e?: BaseSyntheticEvent) => Promise<void>;
  createCreditRequestError: string[];
  createCreditRequestLoading: boolean;
  doesUserAlreadyRequested: boolean;
  doesUserAlreadyRequestedError: string[];
  doesUserAlreadyRequestedLoading: boolean;
  form: UseFormReturn<CreateCreditRequestDto>;
  isSuccess?: boolean;
}

export interface CreateCreditRequestProviderProps extends CreateCreditRequestContextType {
  children: ReactNode;
}

const CreateCreditRequestContext = createContext<CreateCreditRequestContextType | undefined>(
  undefined,
);

export const CreateCreditRequestProvider: FC<CreateCreditRequestProviderProps> = ({
  children,
  createCreditRequestError,
  createCreditRequestLoading,
  doesUserAlreadyRequested,
  doesUserAlreadyRequestedError,
  doesUserAlreadyRequestedLoading,
  createCreditRequest,
  form,
  isSuccess,
}) => {
  const contextValue: CreateCreditRequestContextType = useMemo(
    () => ({
      createCreditRequestError,
      createCreditRequestLoading,
      doesUserAlreadyRequested,
      doesUserAlreadyRequestedError,
      doesUserAlreadyRequestedLoading,
      createCreditRequest,
      form,
      isSuccess,
    }),
    [
      createCreditRequestError,
      createCreditRequestLoading,
      doesUserAlreadyRequested,
      doesUserAlreadyRequestedError,
      doesUserAlreadyRequestedLoading,
      createCreditRequest,
      form,
      isSuccess,
    ],
  );

  return (
    <CreateCreditRequestContext.Provider value={contextValue}>
      {children}
    </CreateCreditRequestContext.Provider>
  );
};

export const useCreateCreditRequestContract = (): CreateCreditRequestContextType => {
  const context = useContext(CreateCreditRequestContext);

  if (context === undefined) {
    throw new Error(
      'useCreateCreditRequestContext must be used within a CreateCreditRequestProvider',
    );
  }

  return context;
};

// Основной компонент-контракт
const CreateCreditRequestContract: FC<CreateCreditRequestProviderProps> = ({
  children,
  createCreditRequestError,
  createCreditRequestLoading,
  doesUserAlreadyRequested,
  doesUserAlreadyRequestedError,
  doesUserAlreadyRequestedLoading,
  createCreditRequest,
  form,
  isSuccess,
}) => {
  return (
    <CreateCreditRequestProvider
      form={form}
      createCreditRequest={createCreditRequest}
      createCreditRequestLoading={createCreditRequestLoading}
      createCreditRequestError={createCreditRequestError}
      doesUserAlreadyRequested={doesUserAlreadyRequested}
      doesUserAlreadyRequestedError={doesUserAlreadyRequestedError}
      doesUserAlreadyRequestedLoading={doesUserAlreadyRequestedLoading}
      isSuccess={isSuccess}
    >
      {children}
    </CreateCreditRequestProvider>
  );
};

const MemoizedCreateCreditRequestContract = memo(CreateCreditRequestContract);

export default MemoizedCreateCreditRequestContract;
