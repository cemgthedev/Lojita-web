import { ContextOrders } from '@/providers/Orders.provider';
import { useContext } from 'react';

export const useOrders = () => useContext(ContextOrders);
