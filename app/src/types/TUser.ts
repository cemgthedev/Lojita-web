export enum EGenders {
  male = 'male',
  female = 'female',
  other = 'other',
}

export const gendersLabels: Record<EGenders, string> = {
  male: 'Masculino',
  female: 'Feminino',
  other: 'Outro',
}

export const genderOptions: { label: string; value: EGenders }[] = [
  { label: 'Masculino', value: EGenders.male },
  { label: 'Feminino', value: EGenders.female },
  { label: 'Outro', value: EGenders.other },
];

export enum ERoles {
  admin = 'admin',
  seller = 'seller',
  buyer = 'buyer',
}

export const rolesLabels: Record<ERoles, string> = {
  admin: 'Administrador',
  seller: 'Vendedor',
  buyer: 'Comprador',
}

export const rolesOptions = [
  { label: 'Vendedor', value: ERoles.seller },
  { label: 'Comprador', value: ERoles.buyer },
];

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
