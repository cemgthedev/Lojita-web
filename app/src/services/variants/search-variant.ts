import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';

import { db } from '../api';

import { Collections } from '@/constants/firebase/collections';
import { TProductVariant } from '@/types/TProductVariant';
import { MeasurementUnit } from '@/types/TSize';

interface ProductVariantFilters {
  unit?: MeasurementUnit;
  minValue?: number;
  maxValue?: number;
  minPrice?: number;
  maxPrice?: number;
  minStock?: number;
  maxStock?: number;
  minCreatedAt?: Date;
  maxCreatedAt?: Date;
  minUpdatedAt?: Date;
  maxUpdatedAt?: Date;
}

export async function searchProductVariant(
  filters: ProductVariantFilters = {},
): Promise<TProductVariant[]> {
  try {
    let productVariantsQuery = query(
      collection(db, Collections.productVariants),
    );

    if (filters.unit) {
      productVariantsQuery = query(
        productVariantsQuery,
        where('size.unit', '==', filters.unit),
      );
    }

    if (filters.minValue) {
      productVariantsQuery = query(
        productVariantsQuery,
        where('size.value', '>=', filters.minValue),
      );
    }

    if (filters.maxValue) {
      productVariantsQuery = query(
        productVariantsQuery,
        where('size.value', '<=', filters.maxValue),
      );
    }

    if (filters.minPrice) {
      productVariantsQuery = query(
        productVariantsQuery,
        where('price', '>=', filters.minPrice),
      );
    }

    if (filters.maxPrice) {
      productVariantsQuery = query(
        productVariantsQuery,
        where('price', '<=', filters.maxPrice),
      );
    }

    if (filters.minStock) {
      productVariantsQuery = query(
        productVariantsQuery,
        where('stock', '>=', filters.minStock),
      );
    }

    if (filters.maxStock) {
      productVariantsQuery = query(
        productVariantsQuery,
        where('stock', '<=', filters.maxStock),
      );
    }

    // Ordenação para facilitar filtros temporais
    productVariantsQuery = query(
      productVariantsQuery,
      orderBy('createdAt', 'desc'),
    );

    const productVariantsSnapshot = await getDocs(productVariantsQuery);
    let productVariants = productVariantsSnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as TProductVariant,
    );

    // Aplicar filtros temporais que não podem ser combinados no Firestore
    if (filters.minCreatedAt) {
      productVariants = productVariants.filter(
        (productVariant) =>
          productVariant.createdAt &&
          productVariant.createdAt >= filters.minCreatedAt!,
      );
    }

    if (filters.maxCreatedAt) {
      productVariants = productVariants.filter(
        (productVariant) =>
          productVariant.createdAt &&
          productVariant.createdAt <= filters.maxCreatedAt!,
      );
    }

    if (filters.minUpdatedAt) {
      productVariants = productVariants.filter(
        (productVariant) =>
          productVariant.updatedAt &&
          productVariant.updatedAt >= filters.minUpdatedAt!,
      );
    }

    if (filters.maxUpdatedAt) {
      productVariants = productVariants.filter(
        (productVariant) =>
          productVariant.updatedAt &&
          productVariant.updatedAt <= filters.maxUpdatedAt!,
      );
    }

    return productVariants;
  } catch (error) {
    console.error('Error searching productVariants:', error);
    throw error;
  }
}
