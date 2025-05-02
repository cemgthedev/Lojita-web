import { doc, setDoc } from 'firebase/firestore';

import { db } from '../api';

import { Collections } from '@/constants/firebase/collections';
import { TChat } from '@/types/TChat';

export async function updateChat({
  id,
  messages,
  sellerId,
  buyerId,
  createdAt,
  updatedAt,
}: TChat): Promise<void> {
  try {
    if (id) {
      await setDoc(doc(db, Collections.chats, id), {
        id,
        messages,
        sellerId,
        buyerId,
        createdAt,
        updatedAt,
      });
    }
  } catch (error) {
    throw error;
  }
}
