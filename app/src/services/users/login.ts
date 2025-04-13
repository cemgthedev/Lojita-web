import { signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { auth } from "../api";

export async function login(email: string, password: string): Promise<UserCredential> {
    try {
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
        return userCredentials;
    } catch (error) {
        throw error;
    }
}