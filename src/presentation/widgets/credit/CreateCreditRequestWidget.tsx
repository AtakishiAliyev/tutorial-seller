import useCheckIfUserHasCreditRequest from '@business/services/credit/useCheckIfUserHasCreditRequest.ts';
import useCreateCreditRequest from '@business/services/credit/useCreateCreditRequest.ts';
import CreateCreditRequestContract from '@presentation/contracts/credit/CreateCreditRequestContract.tsx';
import { type FC, memo, type ReactNode } from 'react';
import { useVisibilityTarget } from 'react-visibility-manager';

type CreateCreditRequestWidgetProps = {
  children?: ReactNode;
};

const CreateCreditRequestWidget: FC<CreateCreditRequestWidgetProps> = ({ children }) => {
  const { meta } = useVisibilityTarget('buy-course');
  const courseId = meta?.courseId as string;
  const { loading, error, createCreditRequest, form, isSuccess } = useCreateCreditRequest({
    showErrorNotification: true,
    clearForm: true,
    showSuccessNotification: true,
    courseId,
  });

  const {
    loading: doesUserAlreadyRequestedLoading,
    error: doesUserAlreadyRequestedError,
    data: doesUserAlreadyRequested,
  } = useCheckIfUserHasCreditRequest({ courseId });

  return (
    <CreateCreditRequestContract
      form={form}
      isSuccess={isSuccess}
      createCreditRequestError={error}
      createCreditRequestLoading={loading}
      createCreditRequest={createCreditRequest}
      doesUserAlreadyRequestedLoading={doesUserAlreadyRequestedLoading}
      doesUserAlreadyRequestedError={doesUserAlreadyRequestedError?.message || []}
      doesUserAlreadyRequested={doesUserAlreadyRequested?.doesUserHasCreditForThisCourse || false}
    >
      {children}
    </CreateCreditRequestContract>
  );
};

const MemoizedCreateCreditRequestWidget = memo(CreateCreditRequestWidget);

export default MemoizedCreateCreditRequestWidget;
