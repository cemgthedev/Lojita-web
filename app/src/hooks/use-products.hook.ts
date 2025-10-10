import { ContextProducts } from '@/providers/Products.provider';
import { useContext } from 'react';

export const useProducts = () => useContext(ContextProducts);
