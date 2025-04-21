import { doc, setDoc } from 'firebase/firestore';

import { db } from '../api';

import { Collections } from '@/constants/firebase/collections';
import { TOrder } from '@/types/TOrder';

export async function createOrder({
  status,
  price,
  products,
  sellerId,
  buyerId,
  createdAt,
  updatedAt,
}: TOrder): Promise<void> {
  try {
    await setDoc(doc(db, Collections.orders), {
      status,
      price,
      products,
      sellerId,
      buyerId,
      createdAt,
      updatedAt,
    });
  } catch (error) {
    throw error;
  }
}
