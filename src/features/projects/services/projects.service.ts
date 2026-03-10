import { db } from "@/lib/firebase";
import { collection, addDoc, query, where, doc, getDoc, orderBy, updateDoc, onSnapshot } from "firebase/firestore";
import { Project } from "../types/project";

export const projectsService = {
  // Función para leer un solo proyecto por su ID
  getProjectById: async (projectId: string) => {
    const docRef = doc(db, "projects", projectId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Project;
    }
    return null; // Retornamos null si el proyecto no existe
  },

  // Función para escuchar cambios en tiempo real (onSnapshot)
  subscribeToProjects: (userId: string, onUpdate: (projects: Project[]) => void) => {
    const q = query(
      collection(db, "projects"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const projects = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Project[];

      onUpdate(projects);
    });

    return unsubscribe;
  },

  // Función para guardar datos (INSERT)
  createProject: async (name: string, userId: string) => {
    const docRef = await addDoc(collection(db, "projects"), {
      name,
      userId,
      createdAt: new Date().toISOString(),
    });
    
    return docRef.id;
  },

  // Función para actualizar el nombre de un proyecto
  updateProjectName: async (projectId: string, newName: string) => {
    const docRef = doc(db, "projects", projectId);
    await updateDoc(docRef, {
      name: newName,
    });
  }
};