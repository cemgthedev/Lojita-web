import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';

import { db } from '../api';

import { Collections } from '@/constants/firebase/collections';
import { TFavorite } from '@/types/TFavorite';

interface FavoriteFilters {
  sellerId?: string;
  buyerId?: string;
  minCreatedAt?: Date;
  maxCreatedAt?: Date;
  minUpdatedAt?: Date;
  maxUpdatedAt?: Date;
}

export async function searchFavorite(
  filters: FavoriteFilters = {},
): Promise<TFavorite[]> {
  try {
    let favoritesQuery = query(collection(db, Collections.favorites));

    if (filters.sellerId) {
      favoritesQuery = query(
        favoritesQuery,
        where('sellerId', '==', filters.sellerId),
      );
    }

    if (filters.buyerId) {
      favoritesQuery = query(
        favoritesQuery,
        where('buyerId', '==', filters.buyerId),
      );
    }

    // Ordenação para facilitar filtros temporais
    favoritesQuery = query(favoritesQuery, orderBy('createdAt', 'desc'));

    const favoritesSnapshot = await getDocs(favoritesQuery);
    let favorites = favoritesSnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as TFavorite,
    );

    // Aplicar filtros temporais que não podem ser combinados no Firestore
    if (filters.minCreatedAt) {
      favorites = favorites.filter(
        (favorite) =>
          favorite.createdAt && favorite.createdAt >= filters.minCreatedAt!,
      );
    }

    if (filters.maxCreatedAt) {
      favorites = favorites.filter(
        (favorite) =>
          favorite.createdAt && favorite.createdAt <= filters.maxCreatedAt!,
      );
    }

    if (filters.minUpdatedAt) {
      favorites = favorites.filter(
        (favorite) =>
          favorite.updatedAt && favorite.updatedAt >= filters.minUpdatedAt!,
      );
    }

    if (filters.maxUpdatedAt) {
      favorites = favorites.filter(
        (favorite) =>
          favorite.updatedAt && favorite.updatedAt <= filters.maxUpdatedAt!,
      );
    }

    return favorites;
  } catch (error) {
    console.error('Error searching favorites:', error);
    throw error;
  }
}
