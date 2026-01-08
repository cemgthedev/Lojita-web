export enum EGenders {
  male = 'male',
  female = 'female',
  other = 'other',
}

export const GendersLabels: Record<EGenders, string> = {
  male: 'Masculino',
  female: 'Feminino',
  other: 'Outro',
};

export const getGenderOptions = () =>
  Object.entries(GendersLabels).map(([k, l]) => ({ key: k, label: l }));

export enum ERoles {
  admin = 'admin',
  seller = 'seller',
  buyer = 'buyer',
}

export const RolesLabels: Record<ERoles, string> = {
  admin: 'Administrador',
  seller: 'Vendedor',
  buyer: 'Comprador',
};

export const getRolesOptions = () =>
  Object.entries(RolesLabels).map(([k, l]) => ({ key: k, label: l }));

export type TUser = {
  id?: string;
  avatarUrl?: string | null;
  name: string;
  document: string;
  age?: number | null;
  gender?: EGenders | null;
  phone?: string | null;
  address?: string | null;
  email: string;
  password: string;
  role: ERoles;

  createdAt?: Date;
  updatedAt?: Date;
};
