import { TColor, TSize } from "./TProductOption";

export type TProductVariant = {
    id?: string;
    name: string;
    color: TColor;
    size: TSize;
    price: number;
    stock: number;

    sellerId: string;

    createdAt?: Date
    updatedAt?: Date
}
