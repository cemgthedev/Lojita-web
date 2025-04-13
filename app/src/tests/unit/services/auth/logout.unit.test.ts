import { logout } from "@/services/auth/logout";
import { describe, expect, it } from "vitest";

describe("Modulo de logout", () => {
    describe("Logout", () => {
        it("Deve retornar um usuário", async () => {
            const response = await logout();
            expect(response).equals(true);
        });
    });
});