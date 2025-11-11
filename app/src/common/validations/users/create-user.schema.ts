import { messages } from '@/common/messages';
import z from 'zod/v3';

export const createUserSchema = z
  .object({
    avatarUrl: z
      .string({
        required_error: messages.users.required_error_avatar_url,
        invalid_type_error: messages.users.invalid_avatar_url,
      })
      .nullable()
      .optional(),
    name: z.string({
      required_error: messages.users.required_error_name,
      invalid_type_error: messages.users.invalid_name,
    }),
    document: z.string({
      required_error: messages.users.required_error_document,
      invalid_type_error: messages.users.invalid_document,
    }),
    age: z
      .number({
        required_error: messages.users.required_error_age,
        invalid_type_error: messages.users.invalid_age,
      })
      .nullable()
      .optional(),
    gender: z
      .string({
        required_error: messages.users.required_error_gender,
        invalid_type_error: messages.users.invalid_gender,
      })
      .nullable()
      .optional(),
    phone: z.string({
      required_error: messages.users.required_error_phone,
      invalid_type_error: messages.users.invalid_phone,
    }),
    address: z.string({
      required_error: messages.users.required_error_address,
      invalid_type_error: messages.users.invalid_address,
    }),
    email: z.string({
      required_error: messages.users.required_error_email,
      invalid_type_error: messages.users.invalid_email,
    }),
    password: z.string({
      required_error: messages.users.required_error_password,
      invalid_type_error: messages.users.invalid_password,
    }),
    confirmPassword: z.string({
      required_error: messages.users.required_error_password,
      invalid_type_error: messages.users.invalid_password,
    }),
    role: z.string({
      required_error: messages.users.required_error_role,
      invalid_type_error: messages.users.invalid_role,
    }),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'As senhas devem ser iguais.',
        path: ['confirmPassword'],
      });
    }
  });

export type TCreateUser = z.infer<typeof createUserSchema>;
