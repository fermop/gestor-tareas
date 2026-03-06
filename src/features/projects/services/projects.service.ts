import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

export interface Project {
  id: string;
  name: string;
  userId: string;
  createdAt: string;
}

export const projectsService = {
  // Función para leer datos (SELECT)
  getProjectsByUserId: async (userId: string) => {
    const q = query(collection(db, "projects"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Project[];
  },

  // Función para guardar datos (INSERT)
  createProject: async (name: string, userId: string) => {
    const docRef = await addDoc(collection(db, "projects"), {
      name,
      userId,
      createdAt: new Date().toISOString(),
    });
    
    return docRef.id;
  }
};