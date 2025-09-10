export interface IsCourseOwnedResponseDto {
  isOwned: boolean;
  isActive: boolean;
  payment: {
    id: string;
    status: 'CREATED' | 'APPROVED';
    amount: number;
  };
}
