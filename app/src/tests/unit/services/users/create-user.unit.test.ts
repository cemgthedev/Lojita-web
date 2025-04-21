import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { Collections } from '@/constants/firebase/collections';
import { auth, db } from '@/services/api';
import { createUser } from '@/services/users/create-user';
import { TEST_CREDENTIALS, TEST_USER } from '@/tests/data';
import { TUser } from '@/types/TUser';

describe('Modulo de criação de usuário', () => {
  beforeAll(async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        TEST_CREDENTIALS.email,
        TEST_CREDENTIALS.password,
      );
      await signInWithEmailAndPassword(
        auth,
        TEST_CREDENTIALS.email,
        TEST_CREDENTIALS.password,
      );
    } catch (error) {
      console.error(error);
    }
  });

  afterAll(async () => {
    try {
      await auth.currentUser?.delete();
      await signInWithEmailAndPassword(
        auth,
        TEST_USER.email,
        TEST_USER.password,
      );
      await deleteDoc(doc(db, 'users', TEST_USER.id));
      await auth.currentUser?.delete();
    } catch (error) {
      console.error(error);
    }
  });

  it('Deve criar e retornar um novo usuário', async () => {
    createUser({
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

    const userDoc = await getDoc(doc(db, Collections.users, TEST_USER.id));
    const user = userDoc.data() as TUser;

    expect(user).toBeDefined();
    expect(user).toHaveProperty('email', TEST_USER.email);
    expect(user).toHaveProperty('id');
  });
});
