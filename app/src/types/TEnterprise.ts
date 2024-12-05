import { TAddress } from "./TAddress";

export type TEnterprise = {
  id: number;
  name: string; // Nome da empresa
  email: string; // E-mail da empresa
  password?: string; // Senha (opcional)
  avatarUrl?: string; // URL do avatar (opcional)
  permissionGroupId: number; // ID do grupo de permissões
  document: string; // Documento (CPF/CNPJ)
  phone?: string; // Telefone (opcional)
  address?: TAddress; // Objeto do tipo Address (opcional)
  addressId?: number; // ID do endereço (opcional)
};
