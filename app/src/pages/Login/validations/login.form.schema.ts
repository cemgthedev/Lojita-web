import { z } from 'zod';

const messages = {
  required_email: 'O e-mail deve ser preenchido.',
  invalid_email: 'O e-mail informado parece ser inválido.',
  required_password: 'A senha deve ser preenchida.',
  invalid_password: 'A senha informada parece ser inválida.',
};

export const loginFormSchema = z.object({
  email: z
    .string()
    .email(messages.invalid_email)
    .nonempty(messages.required_email),
  password: z.string().nonempty(messages.required_password),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;
