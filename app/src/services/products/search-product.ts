import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';

import { db } from '../api';

import { Collections } from '@/constants/firebase/collections';
import { TProduct } from '@/types/TProduct';

interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minStock?: number;
  maxStock?: number;
  minCreatedAt?: Date;
  maxCreatedAt?: Date;
  minUpdatedAt?: Date;
  maxUpdatedAt?: Date;
  sellerId?: string;
}

export async function searchProduct(
  filters: ProductFilters = {},
): Promise<TProduct[]> {
  try {
    let productsQuery = query(collection(db, Collections.products));

    // Aplicar filtros que podem ser feitos no Firestore
    if (filters.category) {
      productsQuery = query(
        productsQuery,
        where('category', '==', filters.category),
      );
    }

    if (filters.minPrice) {
      productsQuery = query(
        productsQuery,
        where('price', '>=', filters.minPrice),
      );
    }

    if (filters.maxPrice) {
      productsQuery = query(
        productsQuery,
        where('price', '<=', filters.maxPrice),
      );
    }

    if (filters.minStock) {
      productsQuery = query(
        productsQuery,
        where('stock', '>=', filters.minStock),
      );
    }

    if (filters.maxStock) {
      productsQuery = query(
        productsQuery,
        where('stock', '<=', filters.maxStock),
      );
    }

    if (filters.sellerId) {
      productsQuery = query(
        productsQuery,
        where('sellerId', '==', filters.sellerId),
      );
    }

    // Ordenação para facilitar filtros temporais
    productsQuery = query(productsQuery, orderBy('createdAt', 'desc'));

    const productsSnapshot = await getDocs(productsQuery);
    let products = productsSnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as TProduct,
    );

    // Aplicar filtros temporais que não podem ser combinados no Firestore
    if (filters.minCreatedAt) {
      products = products.filter(
        (product) =>
          product.createdAt && product.createdAt >= filters.minCreatedAt!,
      );
    }

    if (filters.maxCreatedAt) {
      products = products.filter(
        (product) =>
          product.createdAt && product.createdAt <= filters.maxCreatedAt!,
      );
    }

    if (filters.minUpdatedAt) {
      products = products.filter(
        (product) =>
          product.updatedAt && product.updatedAt >= filters.minUpdatedAt!,
      );
    }

    if (filters.maxUpdatedAt) {
      products = products.filter(
        (product) =>
          product.updatedAt && product.updatedAt <= filters.maxUpdatedAt!,
      );
    }

    return products;
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
}
