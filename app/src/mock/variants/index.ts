import { TProductVariant } from '@/types/TProductVariant';
import { colorsMock } from './colors';
import { sizesMock } from './sizes';

export const variantsMock: TProductVariant[] = [
  // Variantes do produto p1 — Camiseta Básica Vermelha
  {
    id: 'v1',
    color: colorsMock[0],
    size: sizesMock[0],
    price: 59.9,
    stock: 30,
    productId: 'p1',
  },
  {
    id: 'v2',
    color: colorsMock[3],
    size: sizesMock[1],
    price: 69.9,
    stock: 25,
    productId: 'p1',
  },
  {
    id: 'v3',
    color: colorsMock[4],
    size: sizesMock[2],
    price: 79.9,
    stock: 20,
    productId: 'p1',
  },

  // Variantes do produto p2 — Tênis Esportivo Roxo
  {
    id: 'v4',
    color: colorsMock[6],
    size: sizesMock[9],
    price: 299.9,
    stock: 12,
    productId: 'p2',
  },

  // Variantes do produto p3 — Camiseta Azul Básica
  {
    id: 'v5',
    color: colorsMock[1],
    size: sizesMock[1],
    price: 59.9,
    stock: 20,
    productId: 'p3',
  },

  // Variantes do produto p4 — Camiseta Verde Básica
  {
    id: 'v6',
    color: colorsMock[2],
    size: sizesMock[2],
    price: 59.9,
    stock: 22,
    productId: 'p4',
  },

  // Variantes do produto p5 — Camiseta Preta Clássica
  {
    id: 'v7',
    color: colorsMock[3],
    size: sizesMock[0],
    price: 59.9,
    stock: 28,
    productId: 'p5',
  },

  // Variantes do produto p6 — Camiseta Branca Clássica
  {
    id: 'v8',
    color: colorsMock[4],
    size: sizesMock[1],
    price: 59.9,
    stock: 35,
    productId: 'p6',
  },
];
