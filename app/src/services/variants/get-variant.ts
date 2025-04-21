import { doc, getDoc } from 'firebase/firestore';

import { db } from '../api';

import { Collections } from '@/constants/firebase/collections';
import { TProductVariant } from '@/types/TProductVariant';

export async function getProductVariant(id: string): Promise<TProductVariant> {
  try {
    const productVariantDoc = await getDoc(
      doc(db, Collections.productVariants, id),
    );
    const productVariant = productVariantDoc.data() as TProductVariant;

    return productVariant;
  } catch (error) {
    throw error;
  }
}
