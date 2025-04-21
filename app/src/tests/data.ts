import { TProduct } from '@/types/TProduct';

// Credenciais de teste
export const TEST_CREDENTIALS = {
  email: `testcredencial@example.com`, // Email único por teste
  password: 'testpassword123@kwy!',
};

// Dados de teste de usuário
export const TEST_USER = {
  id: 'test-user',
  avatarUrl: 'https://example.com/avatar.jpg',
  name: 'John Doe',
  document: '123456789',
  age: 30,
  gender: { name: 'Masculino', value: 'male' },
  phone: '1234567890',
  address: '123 Main St, Anytown, USA',
  email: `testuser@example.com`, // Email único por teste
  password: 'testpassword123@kwy!',
  role: 'admin',
};

// Dados de teste de produto
export const TEST_PRODUCT: TProduct = {
  id: 'test-product',
  name: 'Test Product',
  description: 'This is a test product',
  price: 19.99,
  imageUrls: ['https://example.com/product.jpg'],
  category: 'Electronics',
  unitCategory: 'weight',
  stock: 10,
  sellerId: 'test-seller',
  options: { colors: [], sizes: [] },
  variants: [],
};
