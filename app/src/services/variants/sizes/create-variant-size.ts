import { doc, setDoc } from 'firebase/firestore';

import { db } from '../../api';

import { Collections } from '@/constants/firebase/collections';
import { TSize } from '@/types/TSize';

export async function createSize({
  name,
  unit,
  value,
  sellerId,
  createdAt,
  updatedAt,
}: TSize): Promise<void> {
  try {
    await setDoc(doc(db, Collections.sizes), {
      name,
      unit,
      value,
      sellerId,
      createdAt,
      updatedAt,
    });
  } catch (error) {
    throw error;
  }
}
