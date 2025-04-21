import { deleteDoc, doc } from 'firebase/firestore';

import { db } from '../api';

import { Collections } from '@/constants/firebase/collections';

export async function deleteOrder(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, Collections.orders, id));
  } catch (error) {
    throw error;
  }
}
