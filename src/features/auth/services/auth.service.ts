import { auth } from "@/lib/firebase";
import { 
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup, 
  createUserWithEmailAndPassword 
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
  registerWithEmail: async (email: string, pass: string) => {
    return await createUserWithEmailAndPassword(auth, email, pass);
  }
};