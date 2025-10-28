import { TColor } from '@/types/TColor';

export const colorsMock: TColor[] = [
  // Usadas em p1 — Camiseta Básica Vermelha
  { id: 'c1', name: 'Vermelho', hex: '#FF0000', productId: 'p1' },

  // Usadas em p3 — Camiseta Azul Básica
  { id: 'c2', name: 'Azul', hex: '#0000FF', productId: 'p3' },

  // Usadas em p4 — Camiseta Verde Básica
  { id: 'c3', name: 'Verde', hex: '#00FF00', productId: 'p4' },

  // Usadas em p5 — Camiseta Preta Clássica
  { id: 'c4', name: 'Preto', hex: '#000000', productId: 'p5' },

  // Usadas em p6 — Camiseta Branca Clássica
  { id: 'c5', name: 'Branco', hex: '#FFFFFF', productId: 'p6' },

  // Cor extra não usada (mantida genérica)
  { id: 'c6', name: 'Amarelo', hex: '#FFFF00', productId: 'p1' },

  // Usada em p2 — Tênis Esportivo Roxo
  { id: 'c7', name: 'Roxo', hex: '#800080', productId: 'p2' },

  // Outras cores genéricas
  { id: 'c8', name: 'Laranja', hex: '#FFA500', productId: 'p1' },
  { id: 'c9', name: 'Cinza', hex: '#808080', productId: 'p1' },
  { id: 'c10', name: 'Marrom', hex: '#8B4513', productId: 'p1' },
];
