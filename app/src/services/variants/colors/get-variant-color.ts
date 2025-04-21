import { doc, getDoc } from 'firebase/firestore';

import { db } from '../../api';

import { Collections } from '@/constants/firebase/collections';
import { TColor } from '@/types/TColor';

export async function getColor(id: string): Promise<TColor> {
  try {
    const colorDoc = await getDoc(doc(db, Collections.colors, id));
    const color = colorDoc.data() as TColor;

    return color;
  } catch (error) {
    throw error;
  }
}
