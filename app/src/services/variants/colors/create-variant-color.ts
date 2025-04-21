import { doc, setDoc } from 'firebase/firestore';

import { db } from '../../api';

import { Collections } from '@/constants/firebase/collections';
import { TColor } from '@/types/TColor';

export async function createColor({
  name,
  hex,
  sellerId,
  createdAt,
  updatedAt,
}: TColor): Promise<void> {
  try {
    await setDoc(doc(db, Collections.colors), {
      name,
      hex,
      sellerId,
      createdAt,
      updatedAt,
    });
  } catch (error) {
    throw error;
  }
}
