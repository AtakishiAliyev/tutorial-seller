import { z } from 'zod';

export const ResetPasswordValidationSchema = z
  .object({
    password: z
      .string()
      .min(8, { error: 'Şifrə ən az 8 simvol olmalıdır' })
      .max(50, { error: 'Şifrə ən çox 50 simvol ola bilər' }),
    token: z
      .string()
      .min(6, { error: 'Kod 6 rəqəm olmalıdır' })
      .max(6, { error: 'Kod 6 rəqəm olmalıdır' }),
    submitPassword: z
      .string()
      .min(8, { error: 'Təkrar şifrə ən az 8 simvol olmalıdır' })
      .max(50, { error: 'Təkrar şifrə ən çox 50 simvol ola bilər' }),
  })
  .check(ctx => {
    const { password, submitPassword } = ctx.value;

    // Проверка совпадения паролей
    if (password !== submitPassword) {
      ctx.issues.push({
        code: 'custom',
        message: 'Şifrələr eyni olmalıdır',
        path: ['submitPassword'],
        input: submitPassword,
      });
    }
  });
