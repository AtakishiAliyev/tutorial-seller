export enum PaymentStatusEnum {
  APPROVED = 'APPROVED',
  CREATED = 'CREATED',
  FAILED = 'FAILED',
}

export type PaymentResponseDto = {
  amount: number;
  status: PaymentStatusEnum;
  userCourse: {
    id: string;
  };
  orderId: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type BuyCourseResponseDto = {
  payment: PaymentResponseDto;
  paymentLink: string;
};
