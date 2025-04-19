import { doc, setDoc } from 'firebase/firestore';

import { db } from '../api';

import { Collections } from '@/constants/firebase/collections';
import { TProduct } from '@/types/TProduct';

export async function updateProduct({
  id,
  imageUrls,
  name,
  description,
  category,
  unitCategory,
  price,
  stock,
  options,
  variants,
  sellerId,
}: TProduct) {
  try {
    if (id) {
      await setDoc(doc(db, Collections.products, id), {
        id,
        imageUrls,
        name,
        description,
        category,
        unitCategory,
        price,
        stock,
        options,
        variants,
        sellerId,
        updatedAt: new Date(),
      } as TProduct);
    }
  } catch (error) {
    throw error;
  }
}
