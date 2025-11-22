import { TColor } from './TColor';
import { TProductVariant } from './TProductVariant';
import { TSize } from './TSize';

export type TProduct = {
  id: string;
  coverUrl?: string;
  name: string;
  description: string;
  category: string;
  options?: {
    colors: TColor[];
    sizes: TSize[];
  };
  variants: TProductVariant[];
  totalStock: number;

  sellerId: string;

  createdAt?: Date;
  updatedAt?: Date;
};

export type TProductItem = {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;

  sellerId: string;
  buyerId: string;

  productId: string;
  variantId: string;
};
