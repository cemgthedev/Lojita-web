import { auth } from "../api";

export async function deleteAuthUser(): Promise<boolean> {
    try {
        if(auth.currentUser) {
            await auth.currentUser.delete();
            return true;
        } else {
            return false;
        }
    } catch (error) {
        throw error;
    }
}