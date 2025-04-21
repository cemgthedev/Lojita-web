import { doc, setDoc } from 'firebase/firestore';

import { db } from '../api';

import { Collections } from '@/constants/firebase/collections';
import { TProductVariant } from '@/types/TProductVariant';

export async function createVariant({
  id,
  name,
  color,
  size,
  price,
  stock,
  sellerId,
  createdAt,
  updatedAt,
}: TProductVariant): Promise<void> {
  try {
    if (id) {
      await setDoc(doc(db, Collections.productVariants, id), {
        id,
        name,
        color,
        size,
        price,
        stock,
        sellerId,
        createdAt,
        updatedAt,
      });
    }
  } catch (error) {
    throw error;
  }
}
