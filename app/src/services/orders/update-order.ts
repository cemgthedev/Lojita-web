import { doc, setDoc } from 'firebase/firestore';

import { db } from '../api';

import { Collections } from '@/constants/firebase/collections';
import { TOrder } from '@/types/TOrder';

export async function updateOrder({
  id,
  status,
  price,
  products,
  sellerId,
  buyerId,
  createdAt,
  updatedAt,
}: TOrder): Promise<void> {
  try {
    if (id) {
      await setDoc(doc(db, Collections.orders, id), {
        id,
        status,
        price,
        products,
        sellerId,
        buyerId,
        createdAt,
        updatedAt,
      });
    }
  } catch (error) {
    throw error;
  }
}
