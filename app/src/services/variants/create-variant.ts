import { doc, setDoc } from 'firebase/firestore';

import { db } from '../api';

import { Collections } from '@/constants/firebase/collections';
import { TProductVariant } from '@/types/TProductVariant';

export async function createVariant({
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
    await setDoc(doc(db, Collections.productVariants), {
      name,
      color,
      size,
      price,
      stock,
      sellerId,
      createdAt,
      updatedAt,
    });
  } catch (error) {
    throw error;
  }
}
