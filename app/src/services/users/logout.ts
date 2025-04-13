import { signOut } from "firebase/auth";
import { auth } from "../api";

export async function logout() {
    try {
        await signOut(auth);
    } catch (error) {
        throw error;
    }
}