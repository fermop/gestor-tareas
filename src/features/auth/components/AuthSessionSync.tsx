"use client";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

/**
 * Syncs a lightweight `__session` cookie with Firebase Auth state.
 * This cookie is read by Next.js Middleware for server-side route protection.
 * It is NOT a security token — Firestore/Storage rules handle real authorization.
 */
export function AuthSessionSync() {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Set a session hint cookie (expires in 30 days)
        document.cookie = `__session=1; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
      } else {
        // Clear the session cookie
        document.cookie = "__session=; path=/; max-age=0";
      }
    });

    return () => unsubscribe();
  }, []);

  return null;
}
