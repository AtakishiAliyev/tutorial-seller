import { z } from 'zod';

export const RegisterValidationSchema = z.object({
  name: z.string().min(3, 'Ad ən az 3 simvol olmalıdır').max(50, 'Ad ən çox 50 simvol ola bilər'),
  surname: z
    .string()
    .min(3, 'Soyad ən az 3 simvol olmalıdır')
    .max(50, 'Soyad ən çox 50 simvol ola bilər'),
  phone: z
    .string()
    .min(13, 'Nömrə 13 simvoldan ibarət olmalıdır') // +994XXXXXXXXX
    .max(13, 'Nömrə 13 simvoldan ibarət olmalıdır')
    .refine(value => value.startsWith('+994'), {
      message: 'Nömrə +994 ilə başlamalıdır',
    })
    .refine(value => /^\+994[0-9]{9}$/.test(value), {
      message: 'Zəhmət olmasa düzgün mobil nömrə daxil edin',
    }),
  email: z.string().email('Zəhmət olmasa düzgün e-poçt ünvanı daxil edin'),
  password: z
    .string()
    .min(8, 'Şifrə ən az 8 simvol olmalıdır')
    .max(50, 'Şifrə ən çox 50 simvol ola bilər'),
});
