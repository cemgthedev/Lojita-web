import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';

import { db } from '../../api';

import { Collections } from '@/constants/firebase/collections';
import { TColor } from '@/types/TColor';

interface ColorFilters {
  hex?: string;
  minCreatedAt?: Date;
  maxCreatedAt?: Date;
  minUpdatedAt?: Date;
  maxUpdatedAt?: Date;
}

export async function searchColor(
  filters: ColorFilters = {},
): Promise<TColor[]> {
  try {
    let colorsQuery = query(collection(db, Collections.colors));

    if (filters.hex) {
      colorsQuery = query(colorsQuery, where('hex', '==', filters.hex));
    }

    // Ordenação para facilitar filtros temporais
    colorsQuery = query(colorsQuery, orderBy('createdAt', 'desc'));

    const colorsSnapshot = await getDocs(colorsQuery);
    let colors = colorsSnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as TColor,
    );

    // Aplicar filtros temporais que não podem ser combinados no Firestore
    if (filters.minCreatedAt) {
      colors = colors.filter(
        (color) => color.createdAt && color.createdAt >= filters.minCreatedAt!,
      );
    }

    if (filters.maxCreatedAt) {
      colors = colors.filter(
        (color) => color.createdAt && color.createdAt <= filters.maxCreatedAt!,
      );
    }

    if (filters.minUpdatedAt) {
      colors = colors.filter(
        (color) => color.updatedAt && color.updatedAt >= filters.minUpdatedAt!,
      );
    }

    if (filters.maxUpdatedAt) {
      colors = colors.filter(
        (color) => color.updatedAt && color.updatedAt <= filters.maxUpdatedAt!,
      );
    }

    return colors;
  } catch (error) {
    console.error('Error searching colors:', error);
    throw error;
  }
}
