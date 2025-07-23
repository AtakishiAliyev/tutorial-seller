export interface GetMeDto {
  id: string;
  email: string;
  name: string;
  surname: string;
  phone: string;
  isEmailConfirmed: boolean;
  status: 'active' | 'inactive' | 'banned';
  roles: Role[];
  createdAt: string;
}

export enum Role {
  ADMIN = 'admin',
  CLIENT = 'client',
}
