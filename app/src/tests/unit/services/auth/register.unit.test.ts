import { auth } from "@/services/api";
import { deleteAuthUser } from "@/services/auth/delete";
import { register } from "@/services/auth/register";
import { TEST_CREDENTIALS } from "@/tests/data";
import { signInWithEmailAndPassword } from "firebase/auth";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Módulo de registro de usuário", () => {
  // Limpeza antes de todos os testes
  beforeAll(async () => {
    try {
      await signInWithEmailAndPassword(auth, TEST_CREDENTIALS.email, TEST_CREDENTIALS.password);
      await deleteAuthUser();
    } catch (error) {
      // Usuário não existe, ótimo!
    }
  });

  // Limpeza após cada teste
  afterAll(async () => {
    try {
      await deleteAuthUser();
    } catch (error) {
      // Ignora erros se o usuário já não existir
    }
  });

  describe("Registro", () => {
    it("Deve criar e retornar um novo usuário", async () => {
      const user = await register(TEST_CREDENTIALS.email, TEST_CREDENTIALS.password);
      
      expect(user).toBeDefined();
      expect(user).toHaveProperty("email", TEST_CREDENTIALS.email);
      expect(user).toHaveProperty("uid");
    });

    it("Deve gerar erro com email inválido", async () => {
      await expect(register("invalid-email", TEST_CREDENTIALS.password))
        .rejects.toThrow("auth/invalid-email");
    });

    it("Deve gerar erro com senha fraca", async () => {
      await expect(register(TEST_CREDENTIALS.email, "123"))
        .rejects.toThrow("auth/weak-password");
    });
  });
});