import { updateAddressFormSchema } from "@/common/validations/update-address.schema";
import { z } from "zod";


const messages = {
  required_error_id: "ID é obrigatório",
  invalid_type_id: "ID inválido",
  required_error_name: "Nome da empresa é obrigatório",
  invalid_type_name: "Nome da empresa inválido",
  required_error_email: "Email da empresa é obrigatório",
  invalid_type_email: "Email da empresa inválido",
  required_error_password: "Senha é obrigatória",
  invalid_type_password: "Senha inválida",
  required_error_document: "Documento é obrigatório",
  invalid_type_document: "Documento inválido",
  required_error_phone: "Telefone é obrigatório",
  invalid_type_phone: "Telefone inválido",
  required_error_permission_group: "Grupo de permissões é obrigatório",
  invalid_type_permission_group: "Grupo de permissões inválido",
  required_error_avatar_url: "URL do avatar é obrigatória",
  invalid_type_avatar_url: "URL do avatar inválida",
};

export const updateEnterpriseFormSchema = z.object({
  id: z
    .number({
      required_error: messages.required_error_id,
      invalid_type_error: messages.invalid_type_id,
    })
    .min(1, { message: messages.invalid_type_id }),
  name: z
    .string({
      required_error: messages.required_error_name,
      invalid_type_error: messages.invalid_type_name,
    })
    .min(3, { message: messages.invalid_type_name }),
  email: z
    .string({
      required_error: messages.required_error_email,
      invalid_type_error: messages.invalid_type_email,
    })
    .email({ message: messages.invalid_type_email }),
  password: z
    .string({
      required_error: messages.required_error_password,
      invalid_type_error: messages.invalid_type_password,
    })
    .min(6, { message: messages.invalid_type_password }),
  passwordConfirmation: z
    .string({
      required_error: messages.required_error_password,
      invalid_type_error: messages.invalid_type_password,
    })
    .min(6, { message: messages.invalid_type_password }),
  avatarUrl: z
    .string({
      required_error: messages.required_error_avatar_url,
      invalid_type_error: messages.invalid_type_avatar_url,
    })
    .url({ message: messages.invalid_type_avatar_url }),
  permissionGroupId: z
    .number({
      required_error: messages.required_error_permission_group,
      invalid_type_error: messages.invalid_type_permission_group,
    })
    .optional()
    .nullable(),
  document: z
    .string({
      required_error: messages.invalid_type_document,
      invalid_type_error: messages.invalid_type_document,
    }),
  phone: z
    .string({
      required_error: messages.required_error_phone,
      invalid_type_error: messages.invalid_type_phone,
    })
    .optional()
    .nullable(),
  address: updateAddressFormSchema,
  addressId: z.number().optional().nullable(),
})
.superRefine(({ passwordConfirmation, password }, ctx) => {
  if (passwordConfirmation !== password) {
    ctx.addIssue({
      code: "custom",
      message: "As senhas precisam ser iguais",
      path: ["passwordConfirmation"],
    });
  }
});

export type UpdateEnterpriseFormData = z.infer<typeof updateEnterpriseFormSchema>;