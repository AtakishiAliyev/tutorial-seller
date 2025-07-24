import { z } from 'zod';

export const ForgotPasswordValidationSchema = z.object({
  email: z.email('Zəhmət olmasa düzgün e-poçt ünvanı daxil edin'),
});
