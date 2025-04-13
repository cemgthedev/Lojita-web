import { auth } from "@/services/api";
import { login } from "@/services/users/login";
import {
    createUserWithEmailAndPassword,
    deleteUser,
    signInWithEmailAndPassword
} from "firebase/auth";
import { afterEach, beforeAll, beforeEach, describe, expect, it } from "vitest";

// Dados de teste mais seguros
const TEST_CREDENTIALS = {
  email: `test.${Date.now()}@example.com`, // Email único por teste
  password: "testpassword123@kwy!"
};

describe("Módulo de login", () => {
  // Configuração inicial
  beforeAll(async () => {
    try {
      // Limpeza prévia caso o usuário já exista
      const userCredential = await signInWithEmailAndPassword(
        auth, 
        TEST_CREDENTIALS.email, 
        TEST_CREDENTIALS.password
      );
      await deleteUser(userCredential.user);
    } catch (error) {
      // Usuário não existe ainda, tudo bem
    }
  });

  // Cria um novo usuário antes de cada teste
  beforeEach(async () => {
    await createUserWithEmailAndPassword(
      auth,
      TEST_CREDENTIALS.email,
      TEST_CREDENTIALS.password
    );
  });

  // Limpeza após cada teste
  afterEach(async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth, 
        TEST_CREDENTIALS.email, 
        TEST_CREDENTIALS.password
      );
      await deleteUser(userCredential.user);
    } catch (error) {
      console.error("Cleanup failed:", error);
    }
  });

  describe("Login", () => {
    it("Deve retornar as credenciais do usuário no login bem sucedido", async () => {
      const userCredential = await login(
        TEST_CREDENTIALS.email, 
        TEST_CREDENTIALS.password
      );
      
      expect(userCredential).toBeDefined();
      expect(userCredential.user).toBeDefined();
      expect(userCredential.user.email).toBe(TEST_CREDENTIALS.email);
    });

    it("Deve gerar erro com email inválido", async () => {
      await expect(login("invalid-email", TEST_CREDENTIALS.password))
        .rejects.toThrow(); // Ou verifique o código de erro específico
    });

    it("Deve gerar erro com senha incorreta", async () => {
      await expect(login(TEST_CREDENTIALS.email, "wrong-password"))
        .rejects.toThrow();
    });

    it("Deve gerar erro com email não cadastrado", async () => {
      const nonExistentEmail = `nonexistent.${Date.now()}@example.com`;
      await expect(login(nonExistentEmail, "any-password"))
        .rejects.toThrow();
    });
  });
});