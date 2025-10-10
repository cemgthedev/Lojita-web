import { TProductVariant } from '@/types/TProductVariant';
import { colorsMock } from './colors';
import { sizesMock } from './sizes';

export const variantsMock: TProductVariant[] = [
  {
    id: 'v1',
    name: 'Camiseta Vermelha P',
    color: colorsMock[0],
    size: sizesMock[0],
    price: 59.9,
    stock: 30,
    sellerId: 'u2',
  },
  {
    id: 'v2',
    name: 'Camiseta Azul M',
    color: colorsMock[1],
    size: sizesMock[1],
    price: 59.9,
    stock: 25,
    sellerId: 'u2',
  },
  {
    id: 'v3',
    name: 'Camiseta Verde G',
    color: colorsMock[2],
    size: sizesMock[2],
    price: 59.9,
    stock: 20,
    sellerId: 'u2',
  },
  {
    id: 'v4',
    name: 'Camiseta Preta P',
    color: colorsMock[3],
    size: sizesMock[0],
    price: 59.9,
    stock: 35,
    sellerId: 'u2',
  },
  {
    id: 'v5',
    name: 'Camiseta Branca M',
    color: colorsMock[4],
    size: sizesMock[1],
    price: 59.9,
    stock: 40,
    sellerId: 'u2',
  },
  {
    id: 'v6',
    name: 'Whey Protein 1kg',
    color: colorsMock[9],
    size: sizesMock[4],
    price: 129.9,
    stock: 15,
    sellerId: 'u2',
  },
  {
    id: 'v7',
    name: 'Tênis Esportivo 32 inch',
    color: colorsMock[6],
    size: sizesMock[9],
    price: 299.9,
    stock: 12,
    sellerId: 'u2',
  },
];
