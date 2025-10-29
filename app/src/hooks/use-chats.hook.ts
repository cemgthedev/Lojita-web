import { ContextChats } from '@/providers/Chats.provider';
import { useContext } from 'react';

export const useChats = () => useContext(ContextChats);
