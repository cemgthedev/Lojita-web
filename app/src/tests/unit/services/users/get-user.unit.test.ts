import { auth, db } from "@/services/api";
import { getUser } from "@/services/users/get-user";
import { TEST_USER } from "@/tests/data";
import { TUser } from "@/types/TUser";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Módulo de busca de usuário", () => {
    beforeAll(async () => {
        try {
            await createUserWithEmailAndPassword(auth, TEST_USER.email, TEST_USER.password);
            await signInWithEmailAndPassword(auth, TEST_USER.email, TEST_USER.password);
            await setDoc(doc(db, "users", TEST_USER.id), {
                id: TEST_USER.id,
                avatarUrl: TEST_USER.avatarUrl,
                name: TEST_USER.name,
                document: TEST_USER.document,
                age: TEST_USER.age,
                gender: TEST_USER.gender,
                phone: TEST_USER.phone,
                address: TEST_USER.address,
                email: TEST_USER.email,
                password: TEST_USER.password,
                role: TEST_USER.role,
                createdAt: new Date(),
            } as TUser);
        } catch (error) {
            // Usuário não existe, ótimo!
        }
    });

    afterAll(async () => {
        try {
            await auth.currentUser?.delete();
            await deleteDoc(doc(db, "users", TEST_USER.id));
        } catch (error) {
            // Ignora erros se o usuário já não existir
        }
    });

    it("Deve buscar um usuário", async () => {
        const user = await getUser(TEST_USER.id);

        expect(user).toBeDefined(); 
    })
})