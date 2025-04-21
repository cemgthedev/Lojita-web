import { doc, getDoc } from 'firebase/firestore';

import { db } from '../../api';

import { Collections } from '@/constants/firebase/collections';
import { TSize } from '@/types/TSize';

export async function getSize(id: string): Promise<TSize> {
  try {
    const sizeDoc = await getDoc(doc(db, Collections.sizes, id));
    const size = sizeDoc.data() as TSize;

    return size;
  } catch (error) {
    throw error;
  }
}
