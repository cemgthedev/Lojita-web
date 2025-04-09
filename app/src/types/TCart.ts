import { TProductItem } from "./TProduct";

export type TCart = {
    id?: string;
    isPaid?: boolean;
    products: TProductItem[];
    
    sellerId: string;
    buyerId: string;
    
    createdAt?: Date;
    updatedAt?: Date;
}