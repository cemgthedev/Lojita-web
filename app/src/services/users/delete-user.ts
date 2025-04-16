import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../api";

export async function deleteUser(id: string): Promise<void> {
    try {
        await deleteDoc(doc(db, "users", id));
    } catch (error) {
        throw error;
    }
}