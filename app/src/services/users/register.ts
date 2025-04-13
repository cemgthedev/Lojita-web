import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../api";

export async function register(email: string, password: string) {
    try {
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredentials.user;
        return user;
    } catch (error) {
        throw error;
    }
}