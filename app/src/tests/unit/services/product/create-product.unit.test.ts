import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { Collections } from '@/constants/firebase/collections';
import { auth, db } from '@/services/api';
import { createProduct } from '@/services/products/create-product';
import { TEST_PRODUCT, TEST_USER } from '@/tests/data';
import { TProduct } from '@/types/TProduct';

describe('Módulo de criação de produto', () => {
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

      // Limpa produtos existentes antes dos testes
      const q = query(
        collection(db, Collections.products),
        where('sellerId', '==', TEST_USER.id),
      );
      const snapshot = await getDocs(q);

      await Promise.all(snapshot.docs.map((d) => deleteDoc(d.ref)));
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

  it('Deve criar um novo produto com todos os campos obrigatórios', async () => {
    // Arrange
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

    // Act
    await createProduct(productData);

    // Assert
    const productsQuery = query(
      collection(db, Collections.products),
      where('id', '==', TEST_PRODUCT.id),
    );
    const snapshot = await getDocs(productsQuery);

    expect(snapshot.docs).toHaveLength(1);

    const createdProduct = snapshot.docs[0].data() as TProduct;

    // Verifica campos principais
    expect(createdProduct.name).toBe(TEST_PRODUCT.name);
    expect(createdProduct.description).toBe(TEST_PRODUCT.description);
    expect(createdProduct.price).toBe(TEST_PRODUCT.price);
    expect(createdProduct.sellerId).toBe(TEST_USER.id);

    // Verifica se as datas foram criadas
    expect(createdProduct.createdAt).toBeInstanceOf(Date);
    expect(createdProduct.updatedAt).toBeInstanceOf(Date);
  });
});
