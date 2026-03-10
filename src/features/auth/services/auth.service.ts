import { auth } from "@/lib/firebase";
import { 
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup, 
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

export const authService = {
  // 1. Iniciar sesión con Email
  loginWithEmail: async (email: string, pass: string) => {
    return await signInWithEmailAndPassword(auth, email, pass);
  },

  // 2. Iniciar sesión con Google
  loginWithGoogle: async () => {
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(auth, provider);
  },

  // 3. Registrar nuevo usuario
  registerWithEmail: async (email: string, pass: string, name: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    await updateProfile(userCredential.user, { displayName: name });
    return userCredential;
  },

  // 4. Cerrar sesión
  logout: async () => {
    document.cookie = "__session=; path=/; max-age=0";
    await signOut(auth);
  },
};