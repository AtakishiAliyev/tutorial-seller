export type ServicesGeneralProps = {
  showErrorNotification?: boolean;
  showSuccessNotification?: boolean;
  afterError?: () => void;
  afterSuccess?: () => void;
  clearForm?: boolean;
};
