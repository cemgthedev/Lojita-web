export type TGenders =
  | { label: 'Masculino'; value: 'male' }
  | { label: 'Feminino'; value: 'female' }
  | { label: 'Outro'; value: 'other' };

export const genderOptions: TGenders[] = [
  { label: 'Masculino', value: 'male' },
  { label: 'Feminino', value: 'female' },
  { label: 'Outro', value: 'other' },
];

export enum ERoles {
  admin = 'admin',
  seller = 'seller',
  buyer = 'buyer',
}

export const rolesOptions = [
  { label: 'Vendedor', value: ERoles.seller },
  { label: 'Comprador', value: ERoles.buyer },
];

export type TGroupPermission = ERoles.admin | ERoles.seller | ERoles.buyer;

export type TUser = {
  id?: string;
  avatarUrl?: string;
  name: string;
  document: string;
  age: number;
  gender?: TGenders;
  phone?: string;
  address: string;
  email: string;
  password: string;
  role: TGroupPermission;

  createdAt?: Date;
  updatedAt?: Date;
};
