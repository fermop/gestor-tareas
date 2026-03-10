import { db } from "@/lib/firebase";
import { collection, addDoc, query, where, doc, getDoc, orderBy, updateDoc, onSnapshot } from "firebase/firestore";
import { Project } from "../types/project";
import { validateProjectName, validateId } from "@/lib/validators";

export const projectsService = {
  // 1. Get a single project by ID
  getProjectById: async (projectId: string) => {
    validateId(projectId, "Project ID");

    const docRef = doc(db, "projects", projectId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Project;
    }
    return null;
  },

  // 2. Listen to projects in real-time
  subscribeToProjects: (userId: string, onUpdate: (projects: Project[]) => void) => {
    validateId(userId, "User ID");

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

  // 3. Create a new project
  createProject: async (name: string, userId: string) => {
    validateId(userId, "User ID");
    const validName = validateProjectName(name);

    const docRef = await addDoc(collection(db, "projects"), {
      name: validName,
      userId,
      createdAt: new Date().toISOString(),
    });

    return docRef.id;
  },

  // 4. Update project name
  updateProjectName: async (projectId: string, newName: string) => {
    validateId(projectId, "Project ID");
    const validName = validateProjectName(newName);

    const docRef = doc(db, "projects", projectId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error(`Project "${projectId}" not found.`);
    }

    await updateDoc(docRef, {
      name: validName,
    });
  }
};