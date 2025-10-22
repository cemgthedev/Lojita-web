import { TColor } from './TColor';
import { TSize } from './TSize';

export type TProductVariant = {
  id: string;
  name: string;
  imageUrls: string[];
  color: TColor;
  size: TSize;
  price: number;
  stock: number;

  productId: string;

  createdAt?: Date;
  updatedAt?: Date;
};
