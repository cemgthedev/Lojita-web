import { doc, getDoc } from 'firebase/firestore';

import { db } from '../api';

import { Collections } from '@/constants/firebase/collections';
import { TFavorite } from '@/types/TFavorite';

export async function getFavorite(id: string): Promise<TFavorite> {
  try {
    const favoriteDoc = await getDoc(doc(db, Collections.products, id));
    const favorite = favoriteDoc.data() as TFavorite;

    return favorite;
  } catch (error) {
    throw error;
  }
}
