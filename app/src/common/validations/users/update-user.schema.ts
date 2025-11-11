import z from 'zod/v3';
import { createUserSchema } from './create-user.schema';

export const updateUserSchema = createUserSchema.and(
  z.object({
    id: z.string(),
  }),
);

export type TUpdateUser = z.infer<typeof updateUserSchema>;
