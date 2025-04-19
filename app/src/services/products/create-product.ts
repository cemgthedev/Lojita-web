import { doc, setDoc } from 'firebase/firestore';

import { db } from '../api';

import { Collections } from '@/constants/firebase/collections';
import { TProduct } from '@/types/TProduct';

export async function createProduct({
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
    await setDoc(doc(db, Collections.products), {
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
      createdAt: new Date(),
    } as TProduct);
  } catch (error) {
    throw error;
  }
}
