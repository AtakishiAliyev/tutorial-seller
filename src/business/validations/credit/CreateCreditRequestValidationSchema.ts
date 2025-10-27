import { z } from 'zod';

export const CreateCreditRequestValidationSchema = z.object({
  fin: z.string().length(7, {
    error: 'FIN 7 simvoldan ibarət olmalıdır.',
  }),
  phone: z.string().length(9, {
    error: 'Mobil nömrə 9 simvoldan ibarət olmalıdır. Nümunə: 505555555',
  }),
  birthDate: z.date({
    error: 'Doğum tarixi düzgün formatda deyil.',
  }),
});
