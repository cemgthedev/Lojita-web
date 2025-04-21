import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';

import { db } from '../../api';

import { Collections } from '@/constants/firebase/collections';
import { MeasurementUnit, TSize } from '@/types/TSize';

interface SizeFilters {
  unit?: MeasurementUnit;
  minValue?: number;
  maxValue?: number;
  minCreatedAt?: Date;
  maxCreatedAt?: Date;
  minUpdatedAt?: Date;
  maxUpdatedAt?: Date;
}

export async function searchSize(filters: SizeFilters = {}): Promise<TSize[]> {
  try {
    let sizesQuery = query(collection(db, Collections.sizes));

    if (filters.unit) {
      sizesQuery = query(sizesQuery, where('unit', '==', filters.unit));
    }

    if (filters.minValue) {
      sizesQuery = query(sizesQuery, where('value', '>=', filters.minValue));
    }

    if (filters.maxValue) {
      sizesQuery = query(sizesQuery, where('value', '<=', filters.maxValue));
    }

    // Ordenação para facilitar filtros temporais
    sizesQuery = query(sizesQuery, orderBy('createdAt', 'desc'));

    const sizesSnapshot = await getDocs(sizesQuery);
    let sizes = sizesSnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as TSize,
    );

    // Aplicar filtros temporais que não podem ser combinados no Firestore
    if (filters.minCreatedAt) {
      sizes = sizes.filter(
        (color) => color.createdAt && color.createdAt >= filters.minCreatedAt!,
      );
    }

    if (filters.maxCreatedAt) {
      sizes = sizes.filter(
        (color) => color.createdAt && color.createdAt <= filters.maxCreatedAt!,
      );
    }

    if (filters.minUpdatedAt) {
      sizes = sizes.filter(
        (color) => color.updatedAt && color.updatedAt >= filters.minUpdatedAt!,
      );
    }

    if (filters.maxUpdatedAt) {
      sizes = sizes.filter(
        (color) => color.updatedAt && color.updatedAt <= filters.maxUpdatedAt!,
      );
    }

    return sizes;
  } catch (error) {
    console.error('Error searching sizes:', error);
    throw error;
  }
}
