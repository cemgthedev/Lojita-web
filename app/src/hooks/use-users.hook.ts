import { ContextUsers } from '@/providers/Users.provider';
import { useContext } from 'react';

export const useUsers = () => useContext(ContextUsers);
