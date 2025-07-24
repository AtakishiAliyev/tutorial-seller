import { z } from 'zod';

export const ConfirmEmailValidationSchema = z.object({
  token: z
    .string({ error: 'Kod 6 rəqəm olmalıdır' })
    .min(6, 'Kod 6 rəqəm olmalıdır')
    .max(6, 'Kod 6 rəqəm olmalıdır'),
});
