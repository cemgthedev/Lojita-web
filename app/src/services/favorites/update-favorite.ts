import { doc, setDoc } from 'firebase/firestore';

import { db } from '../api';

import { Collections } from '@/constants/firebase/collections';
import { TFavorite } from '@/types/TFavorite';

export async function updateFavorite({
  id,
  products,
  sellerId,
  buyerId,
  createdAt,
  updatedAt,
}: TFavorite): Promise<void> {
  try {
    if (id) {
      await setDoc(doc(db, Collections.favorites, id), {
        id,
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
