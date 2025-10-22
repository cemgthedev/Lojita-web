import { TColor } from './TColor';
import { TProductVariant } from './TProductVariant';
import { TSize } from './TSize';

export type TProduct = {
  id: string;
  name: string;
  description: string;
  category: string;
  options: {
    colors: TColor[];
    sizes: TSize[];
  };
  variants: TProductVariant[];

  sellerId: string;

  createdAt?: Date;
  updatedAt?: Date;
};

export type TProductItem = {
  price?: number;
  quantity?: number;

  productId: string;
  variantId?: string;
};
