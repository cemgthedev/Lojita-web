import { TUser } from "@/types/TUser";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../api";
import { register } from "../auth/register";

export async function createUser({avatarUrl, name, document, age, gender, phone, address, email, password, role}: TUser) {
    try {
        const user = await register(email, password);

        await setDoc(doc(db, "users", user.uid), {
            id: user.uid,
            avatarUrl: avatarUrl,
            name: name,
            document: document,
            age: age,
            gender: gender,
            phone: phone,
            address: address,
            email: email,
            password: password,
            role: role,
            createdAt: new Date(),
        } as TUser);
    } catch (error) {
        throw error;
    }
}