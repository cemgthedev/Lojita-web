import { TProductItem } from "./TProduct";

export type TFavorite = {
    id?: string;
    products: TProductItem[]

    sellerId: string;
    buyerId: string;

    createdAt?: Date;
    updatedAt?: Date;
}