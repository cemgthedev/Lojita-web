import { doc, getDoc } from 'firebase/firestore';

import { db } from '../api';

import { Collections } from '@/constants/firebase/collections';
import { TProduct } from '@/types/TProduct';

export async function getProduct(id: string): Promise<TProduct> {
  try {
    const productDoc = await getDoc(doc(db, Collections.products, id));
    const product = productDoc.data() as TProduct;

    return product;
  } catch (error) {
    throw error;
  }
}
