import { http } from '@infra/api';
import { ChangePasswordDto } from '@infra/dto/auth/ChangePasswordDto.ts';
import { ConfirmEmailDto } from '@infra/dto/auth/ConfirmEmailDto.ts';
import { ForgotPasswordDto } from '@infra/dto/auth/ForgotPasswordDto.ts';
import { RegisterDto } from '@infra/dto/auth/RegisterDto.ts';
import { ResendForgotPasswordDto } from '@infra/dto/auth/ResendForgotPasswordDto.ts';
import { ResetPasswordDto } from '@infra/dto/auth/ResetPasswordDto.ts';
import { SignInDto } from '@infra/dto/auth/SignInDto.ts';

const signIn = async (signInDto: SignInDto) => {
  return http({
    url: '/auth/login',
    method: 'POST',
    data: signInDto,
  });
};

const resendEmailConfirmation = async (resendEmailConfirmationDto: ResendForgotPasswordDto) => {
  return http({
    url: '/auth/resend-email-confirmation',
    method: 'POST',
    data: resendEmailConfirmationDto,
  });
};

const confirmEmail = async (confirmEmailDto: ConfirmEmailDto) => {
  return http({
    url: '/auth/confirm-email',
    method: 'POST',
    data: confirmEmailDto,
  });
};

const forgotPassword = async (forgotPasswordDto: ForgotPasswordDto) => {
  return http({
    url: '/auth/forgot-password',
    method: 'POST',
    data: forgotPasswordDto,
  });
};

const resendForgotPassword = async (resendForgotPasswordDto: ResendForgotPasswordDto) => {
  return http({
    url: '/auth/resend-forgot-password',
    method: 'POST',
    data: resendForgotPasswordDto,
  });
};

const resetPassword = async (resetPasswordDto: ResetPasswordDto) => {
  return http({
    url: '/auth/reset-password',
    method: 'POST',
    data: resetPasswordDto,
  });
};

const changePassword = async (dto: ChangePasswordDto) => {
  return http({
    url: '/auth/change-password',
    method: 'PATCH',
    data: dto,
  });
};

const register = async (registerDto: RegisterDto) => {
  return http({
    url: '/auth/register',
    method: 'POST',
    data: registerDto,
  });
};

const authRepository = {
  signIn,
  resendEmailConfirmation,
  confirmEmail,
  forgotPassword,
  resendForgotPassword,
  resetPassword,
  changePassword,
  register,
};

export default authRepository;
