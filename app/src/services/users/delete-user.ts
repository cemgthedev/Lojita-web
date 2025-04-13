import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../api";

export async function deleteUser(uid: string): Promise<void> {
    try {
        await deleteDoc(doc(db, "users", uid));
    } catch (error) {
        throw error;
    }
}