import { auth } from "@/services/api";
import { deleteUser } from "@/services/auth/delete";
import { register } from "@/services/auth/register";
import { signInWithEmailAndPassword } from "firebase/auth";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

// Dados de teste
const TEST_USER = {
  email: "test.user@example.com",
  password: "securePassword123!"
};

describe("Módulo de registro de usuário", () => {
  // Limpeza antes de todos os testes
  beforeAll(async () => {
    try {
      await signInWithEmailAndPassword(auth, TEST_USER.email, TEST_USER.password);
      await deleteUser();
    } catch (error) {
      // Usuário não existe, ótimo!
    }
  });

  // Limpeza após cada teste
  afterAll(async () => {
    try {
      await deleteUser();
    } catch (error) {
      // Ignora erros se o usuário já não existir
    }
  });

  describe("Registro", () => {
    it("Deve criar e retornar um novo usuário", async () => {
      const user = await register(TEST_USER.email, TEST_USER.password);
      
      expect(user).toBeDefined();
      expect(user).toHaveProperty("email", TEST_USER.email);
      expect(user).toHaveProperty("uid");
    });

    it("Deve gerar erro com email inválido", async () => {
      await expect(register("invalid-email", TEST_USER.password))
        .rejects.toThrow("auth/invalid-email");
    });

    it("Deve gerar erro com senha fraca", async () => {
      await expect(register(TEST_USER.email, "123"))
        .rejects.toThrow("auth/weak-password");
    });
  });
});