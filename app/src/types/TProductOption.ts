export type TColor = {
  id?: string;
  name: string;
  hex: string;

  sellerId: string;

  createdAt?: Date;
  updatedAt?: Date;
};

export type MeasurementUnit =
  | { type: 'length'; value: 'cm' | 'm' | 'inch' } // Comprimento
  | { type: 'weight'; value: 'kg' | 'g' | 'lb' } // Peso
  | { type: 'volume'; value: 'ml' | 'l' | 'gal' }; // Volume

export type TSize = {
  id?: string;
  name: string;
  unit: MeasurementUnit;
  value: number;

  sellerId: string;

  createdAt?: Date;
  updatedAt?: Date;
};

export const Units = {
  length: ['cm', 'm', 'inch'] as const,
  weight: ['kg', 'g', 'lb'] as const,
  volume: ['ml', 'l', 'gal'] as const,
};

export type TProductOption = TColor | TSize;
