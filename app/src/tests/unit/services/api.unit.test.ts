import { describe, expect, it } from 'vitest';

import { auth, db } from '@/services/api';

describe('Modulo de autenticação', () => {
  describe('Inicialização', () => {
    it('Não foi definido', () => {
      expect(auth).toBeDefined();
    });
  });
});

describe('Modulo de banco de dados', () => {
  describe('Inicialização', () => {
    it('Não foi definido', () => {
      expect(db).toBeDefined();
    });
  });
});
