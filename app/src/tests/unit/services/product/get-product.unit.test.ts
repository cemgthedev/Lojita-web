import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { Collections } from '@/constants/firebase/collections';
import { auth, db } from '@/services/api';
import { getProduct } from '@/services/products/get-product';
import { TEST_PRODUCT, TEST_USER } from '@/tests/data';
import { TProduct } from '@/types/TProduct';

describe('Módulo de busca de produto pelo id', () => {
  beforeAll(async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        TEST_USER.email,
        TEST_USER.password,
      );
      await signInWithEmailAndPassword(
        auth,
        TEST_USER.email,
        TEST_USER.password,
      );

      const productData: TProduct = {
        id: TEST_PRODUCT.id,
        name: TEST_PRODUCT.name,
        description: TEST_PRODUCT.description,
        price: TEST_PRODUCT.price,
        imageUrls: TEST_PRODUCT.imageUrls,
        category: TEST_PRODUCT.category,
        unitCategory: TEST_PRODUCT.unitCategory,
        stock: TEST_PRODUCT.stock,
        options: TEST_PRODUCT.options,
        variants: TEST_PRODUCT.variants,
        sellerId: TEST_USER.id,
        createdAt: new Date(),
      };

      await setDoc(doc(db, Collections.products), productData);
    } catch (error) {
      console.error('Erro no beforeAll:', error);
      throw error;
    }
  });

  afterAll(async () => {
    try {
      // Limpeza mais completa
      const q = query(
        collection(db, Collections.products),
        where('sellerId', '==', TEST_USER.id),
      );
      const snapshot = await getDocs(q);

      await Promise.all(snapshot.docs.map((d) => deleteDoc(d.ref)));

      await auth.currentUser?.delete();
    } catch (error) {
      console.error('Erro no afterAll:', error);
    }
  });

  it('Deve buscar um produto pelo id', async () => {
    const product = await getProduct(TEST_PRODUCT.id || '');

    expect(product).toBeDefined();
    expect(product.name).toBe(TEST_PRODUCT.name);
    expect(product.description).toBe(TEST_PRODUCT.description);
    expect(product.price).toBe(TEST_PRODUCT.price);
    expect(product.imageUrls).toBe(TEST_PRODUCT.imageUrls);
    expect(product.category).toBe(TEST_PRODUCT.category);
    expect(product.unitCategory).toBe(TEST_PRODUCT.unitCategory);
    expect(product.stock).toBe(TEST_PRODUCT.stock);
    expect(product.options).toBe(TEST_PRODUCT.options);
    expect(product.variants).toBe(TEST_PRODUCT.variants);
    expect(product.sellerId).toBe(TEST_USER.id);
    expect(product.createdAt).toBeDefined();
    expect(product.updatedAt).toBeUndefined();
  });
});
