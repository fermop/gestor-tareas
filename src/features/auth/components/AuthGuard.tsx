"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Loader2 } from "lucide-react";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const [cargando, setCargando] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      } else {
        setCargando(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (cargando) {
    return (
      <div className="min-h-screen bg-stone-50 dark:bg-stone-950 grid place-items-center">
        <Loader2 className="w-10 h-10 text-stone-900 dark:text-stone-50 animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}