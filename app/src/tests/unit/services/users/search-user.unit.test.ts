import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { auth, db } from '@/services/api';
import { searchUser } from '@/services/users/search-user';
import { TEST_USER } from '@/tests/data';
import { TUser } from '@/types/TUser';

describe('Módulo de busca de usuário', () => {
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

      await setDoc(doc(db, 'users', TEST_USER.id), {
        id: TEST_USER.id,
        avatarUrl: TEST_USER.avatarUrl,
        name: TEST_USER.name,
        document: TEST_USER.document,
        age: TEST_USER.age,
        gender: TEST_USER.gender,
        phone: TEST_USER.phone,
        address: TEST_USER.address,
        email: TEST_USER.email,
        password: TEST_USER.password,
        role: TEST_USER.role,
        createdAt: new Date(),
      } as TUser);
    } catch (error) {
      console.error(error);
    }
  });

  // Limpeza depois de todos os testes
  afterAll(async () => {
    try {
      await auth.currentUser?.delete();
      await deleteDoc(doc(db, 'users', TEST_USER.id));
    } catch (error) {
      console.error(error);
    }
  });

  it('Deve buscar um usuário', async () => {
    try {
      const user = await searchUser();

      expect(user).toBeDefined();
      expect(user.length).toBeGreaterThan(0);
    } catch (error) {
      console.error(error);
    }
  });
});
