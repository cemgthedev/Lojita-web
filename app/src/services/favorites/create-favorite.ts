import { doc, setDoc } from 'firebase/firestore';

import { db } from '../api';

import { Collections } from '@/constants/firebase/collections';
import { TFavorite } from '@/types/TFavorite';

export async function createFavorite({
  products,
  sellerId,
  buyerId,
  createdAt,
  updatedAt,
}: TFavorite): Promise<void> {
  try {
    await setDoc(doc(db, Collections.favorites), {
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
