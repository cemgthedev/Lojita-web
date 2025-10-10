import { TProductItem } from './TProduct';

export type TStatus = 'pending' | 'processing' | 'delivered' | 'cancelled';

export type TOrder = {
  id: string;
  status: TStatus;
  price: number;
  products: TProductItem[];

  sellerId: string;
  buyerId: string;

  createdAt?: Date;
  updatedAt?: Date;
};
