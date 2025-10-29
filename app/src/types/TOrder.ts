import { TProductItem } from './TProduct';
import { TUser } from './TUser';

export type TStatus = 'pending' | 'processing' | 'delivered' | 'cancelled';

export const StatusLabels: Record<TStatus, string> = {
  pending: 'Pendente',
  processing: 'Processando',
  delivered: 'Entregue',
  cancelled: 'Cancelada',
};

export const getStatusOptions = () =>
  Object.entries(StatusLabels).map(([k, l]) => ({ key: k, label: l }));

export type TOrder = {
  id: string;
  status: TStatus;
  price?: number;
  quantity?: number;
  products?: TProductItem[];

  sellerId: string;
  seller?: TUser;
  buyerId: string;
  buyer?: TUser;

  createdAt?: Date;
  updatedAt?: Date;
};
