import { signOut } from "firebase/auth";
import { auth } from "../api";

export async function logout(): Promise<boolean> {
    try {
        await signOut(auth);
        return true;
    } catch (error) {
        throw error;
    }
}