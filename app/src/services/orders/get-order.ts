import { doc, getDoc } from 'firebase/firestore';

import { db } from '../api';

import { Collections } from '@/constants/firebase/collections';
import { TOrder } from '@/types/TOrder';

export async function getOrder(id: string): Promise<TOrder> {
  try {
    const orderDoc = await getDoc(doc(db, Collections.orders, id));
    const order = orderDoc.data() as TOrder;

    return order;
  } catch (error) {
    throw error;
  }
}
