import { TColor } from './TColor';
import { TProductVariant } from './TProductVariant';
import { MeasurementUnit, TSize } from './TSize';

export type TProduct = {
  id: string;
  imageUrls: string[];
  name: string;
  description: string;
  category: string;
  unitCategory: MeasurementUnit['type'];
  price: number;
  stock: number;
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
