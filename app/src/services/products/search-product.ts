import { collection, getDocs } from 'firebase/firestore';

import { db } from '../api';

import { Collections } from '@/constants/firebase/collections';
import { TProduct } from '@/types/TProduct';

export async function searchProduct(): Promise<TProduct[]> {
  try {
    const productsCollection = collection(db, Collections.products);
    const productsSnapshot = await getDocs(productsCollection);
    const products = productsSnapshot.docs.map((doc) => doc.data() as TProduct);

    return products;
  } catch (error) {
    throw error;
  }
}
