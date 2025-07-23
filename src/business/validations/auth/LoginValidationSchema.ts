import { z } from 'zod';

export const LoginValidationSchema = z.object({
  email: z.email('Zəhmət olmasa düzgün e-poçt ünvanı daxil edin'),
  password: z
    .string()
    .min(8, 'Şifrə ən az 8 simvol olmalıdır')
    .max(50, 'Şifrə ən çox 50 simvol ola bilər'),
});
