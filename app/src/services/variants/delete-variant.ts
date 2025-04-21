import { deleteDoc, doc } from 'firebase/firestore';

import { db } from '../api';

import { Collections } from '@/constants/firebase/collections';

export async function deleteProductVariant(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, Collections.productVariants, id));
  } catch (error) {
    throw error;
  }
}
