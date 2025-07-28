import { z } from 'zod';

export const ChangePasswordValidationSchema = z
  .object({
    oldPassword: z
      .string()
      .min(8, { error: 'Köhnə şifrə ən azı 8 simvol uzunluğunda olmalıdır.' })
      .max(50, { error: 'Köhnə şifrə maksimum 50 simvol uzunluğunda ola bilər.' }),
    newPassword: z
      .string()
      .min(8, { error: 'Yeni şifrə ən azı 8 simvol uzunluğunda olmalıdır.' })
      .max(50, { error: 'Yeni şifrə maksimum 50 simvol uzunluğunda ola bilər.' }),

    submitNewPassword: z
      .string()
      .min(8, { error: 'Təsdiq şifrəsi ən azı 8 simvol uzunluğunda olmalıdır.' })
      .max(50, { error: 'Təsdiq şifrəsi maksimum 50 simvol uzunluğunda ola bilər.' }),
  })
  .check(ctx => {
    const { newPassword, submitNewPassword } = ctx.value;

    // Проверка совпадения паролей
    if (newPassword !== submitNewPassword) {
      ctx.issues.push({
        code: 'custom',
        message: 'Şifrələr eyni olmalıdır',
        path: ['submitNewPassword'],
        input: submitNewPassword,
      });
    }
  });
