import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';

import { db } from '../api';

import { Collections } from '@/constants/firebase/collections';
import { TOrder, TStatus } from '@/types/TOrder';

interface OrderFilters {
  status?: TStatus;
  minPrice?: number;
  maxPrice?: number;
  sellerId?: string;
  buyerId?: string;
  minCreatedAt?: Date;
  maxCreatedAt?: Date;
  minUpdatedAt?: Date;
  maxUpdatedAt?: Date;
}

export async function searchOrder(
  filters: OrderFilters = {},
): Promise<TOrder[]> {
  try {
    let ordersQuery = query(collection(db, Collections.orders));

    if (filters.status) {
      ordersQuery = query(ordersQuery, where('status', '==', filters.status));
    }

    if (filters.minPrice) {
      ordersQuery = query(ordersQuery, where('price', '>=', filters.minPrice));
    }

    if (filters.maxPrice) {
      ordersQuery = query(ordersQuery, where('price', '<=', filters.maxPrice));
    }

    if (filters.sellerId) {
      ordersQuery = query(
        ordersQuery,
        where('sellerId', '==', filters.sellerId),
      );
    }

    if (filters.buyerId) {
      ordersQuery = query(ordersQuery, where('buyerId', '==', filters.buyerId));
    }

    // Ordenação para facilitar filtros temporais
    ordersQuery = query(ordersQuery, orderBy('createdAt', 'desc'));

    const ordersSnapshot = await getDocs(ordersQuery);
    let orders = ordersSnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as TOrder,
    );

    // Aplicar filtros temporais que não podem ser combinados no Firestore
    if (filters.minCreatedAt) {
      orders = orders.filter(
        (order) => order.createdAt && order.createdAt >= filters.minCreatedAt!,
      );
    }

    if (filters.maxCreatedAt) {
      orders = orders.filter(
        (order) => order.createdAt && order.createdAt <= filters.maxCreatedAt!,
      );
    }

    if (filters.minUpdatedAt) {
      orders = orders.filter(
        (order) => order.updatedAt && order.updatedAt >= filters.minUpdatedAt!,
      );
    }

    if (filters.maxUpdatedAt) {
      orders = orders.filter(
        (order) => order.updatedAt && order.updatedAt <= filters.maxUpdatedAt!,
      );
    }

    return orders;
  } catch (error) {
    console.error('Error searching orders:', error);
    throw error;
  }
}
