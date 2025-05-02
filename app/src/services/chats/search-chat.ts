import { collection, getDocs, query, where } from 'firebase/firestore';

import { db } from '../api';

import { Collections } from '@/constants/firebase/collections';
import { TChat } from '@/types/TChat';

interface ChatFilters {
  sellerId?: string;
  buyerId?: string;
}

export async function searchChat({
  sellerId,
  buyerId,
}: ChatFilters): Promise<TChat[]> {
  try {
    let chatsQuery = query(collection(db, Collections.chats));

    if (sellerId) {
      chatsQuery = query(chatsQuery, where('sellerId', '==', sellerId));
    }

    if (buyerId) {
      chatsQuery = query(chatsQuery, where('buyerId', '==', buyerId));
    }

    let chatsSnapshot = await getDocs(chatsQuery);

    if (chatsSnapshot.size > 0) {
      const chats: TChat[] = chatsSnapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() }) as TChat,
      );

      return Array.isArray(chats) ? chats : [];
    } else {
      return [];
    }
  } catch (error) {
    throw error;
  }
}
