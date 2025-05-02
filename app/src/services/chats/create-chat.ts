import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';

import { db } from '../api';

import { Collections } from '@/constants/firebase/collections';
import { TChat } from '@/types/TChat';

export async function createChat({
  messages,
  sellerId,
  buyerId,
  createdAt,
  updatedAt,
}: TChat): Promise<void> {
  try {
    const existingChat = query(
      collection(db, Collections.chats),
      where('sellerId', '==', sellerId),
      where('buyerId', '==', buyerId),
    );
    let existingChatSnapshot = await getDocs(existingChat);

    if (existingChatSnapshot.size > 0) {
      const chat = existingChatSnapshot.docs[0].data();

      await setDoc(doc(db, Collections.chats, chat.id), {
        id: chat.id,
        messages: [...chat.messages, ...messages],
        sellerId,
        buyerId,
        createdAt: chat.createdAt,
        updatedAt,
      });
    } else {
      await setDoc(doc(db, Collections.chats), {
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
