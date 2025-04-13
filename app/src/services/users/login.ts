import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../api";

export async function login(email: string, password: string) {
    try {
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredentials.user;
        return user;
    } catch (error) {
        throw error;
    }
}