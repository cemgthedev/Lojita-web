import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { afterAll, beforeAll, describe, it } from 'vitest';

import { auth, db } from '@/services/api';
import { updateUser } from '@/services/users/update-user';
import { TEST_USER } from '@/tests/data';
import { TUser } from '@/types/TUser';

describe('Módulo de atualização de usuário', () => {
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

  afterAll(async () => {
    try {
      await auth.currentUser?.delete();
      await deleteDoc(doc(db, 'users', TEST_USER.id));
    } catch (error) {
      console.error(error);
    }
  });

  it('Deve atualizar um usuário', async () => {
    try {
      await updateUser({
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
        updatedAt: new Date(),
      } as TUser);
    } catch (error) {
      console.error(error);
    }
  });
});
