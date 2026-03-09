"use client";

import { auth } from "@/lib/firebase";
import { Mail, User, ShieldCheck } from "lucide-react";

export function UserInfo() {
  const user = auth.currentUser;

  if (!user) return null;

  const displayName = user.displayName || "Usuario";
  const email = user.email || "Sin correo";
  const providerId = user.providerData[0]?.providerId;
  const isGoogleUser = providerId === "google.com";

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mb-4">
        Información de la cuenta
      </h2>

      <div className="space-y-4">
        {/* Nombre */}
        <div className="flex items-center gap-3">
          <User className="w-5 h-5 text-zinc-500" />
          <div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Nombre</p>
            <p className="text-zinc-800 dark:text-zinc-200 font-medium">
              {displayName}
            </p>
          </div>
        </div>

        {/* Correo */}
        <div className="flex items-center gap-3">
          <Mail className="w-5 h-5 text-zinc-500" />
          <div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Correo electrónico
            </p>
            <p className="text-zinc-800 dark:text-zinc-200 font-medium">
              {email}
            </p>
          </div>
        </div>

        {/* Proveedor */}
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-zinc-500" />
          <div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Método de inicio de sesión
            </p>
            <p className="text-zinc-800 dark:text-zinc-200 font-medium">
              {isGoogleUser ? "Google" : "Email / Contraseña"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
