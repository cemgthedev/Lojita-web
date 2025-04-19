import { doc, setDoc } from 'firebase/firestore';

import { db } from '../api';

import { TUser } from '@/types/TUser';

export async function updateUser({
  id,
  avatarUrl,
  name,
  document,
  age,
  gender,
  phone,
  address,
  email,
  password,
  role,
}: TUser) {
  try {
    if (id) {
      await setDoc(doc(db, 'users', id), {
        id: id,
        avatarUrl: avatarUrl,
        name: name,
        document: document,
        age: age,
        gender: gender,
        phone: phone,
        address: address,
        email: email,
        password: password,
        role: role,
        updatedAt: new Date(),
      } as TUser);
    } else {
      throw new Error('Id de usuário inválido');
    }
  } catch (error) {
    throw error;
  }
}
