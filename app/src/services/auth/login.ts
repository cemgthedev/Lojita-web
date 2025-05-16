import { signInWithEmailAndPassword, User } from 'firebase/auth';

import { auth } from '../api';

import { TCredentials } from '@/types/TCredentials';

export interface LoginResponse {
  user: User;
  token: string;
}

export async function login({ email, password }: TCredentials): Promise<void> {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;
  }
}
