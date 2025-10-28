import { TSize } from '@/types/TSize';

export const sizesMock: TSize[] = [
  {
    id: 's1',
    name: 'P',
    unit: { type: 'length', value: 'cm' },
    value: 60,
    productId: 'p1', // também usado em p5
  },
  {
    id: 's2',
    name: 'M',
    unit: { type: 'length', value: 'cm' },
    value: 70,
    productId: 'p1', // também usado em p3 e p6
  },
  {
    id: 's3',
    name: 'G',
    unit: { type: 'length', value: 'cm' },
    value: 80,
    productId: 'p1', // também usado em p4
  },
  {
    id: 's4',
    name: '1kg',
    unit: { type: 'weight', value: 'kg' },
    value: 1,
    productId: 'p1',
  },
  {
    id: 's5',
    name: '2kg',
    unit: { type: 'weight', value: 'kg' },
    value: 2,
    productId: 'p1',
  },
  {
    id: 's6',
    name: '500g',
    unit: { type: 'weight', value: 'g' },
    value: 500,
    productId: 'p1',
  },
  {
    id: 's7',
    name: '250ml',
    unit: { type: 'volume', value: 'ml' },
    value: 250,
    productId: 'p1',
  },
  {
    id: 's8',
    name: '1L',
    unit: { type: 'volume', value: 'l' },
    value: 1,
    productId: 'p1',
  },
  {
    id: 's9',
    name: '500ml',
    unit: { type: 'volume', value: 'ml' },
    value: 500,
    productId: 'p1',
  },
  {
    id: 's10',
    name: 'Grande',
    unit: { type: 'length', value: 'inch' },
    value: 32,
    productId: 'p2',
  },
];
