"use client";

import { UserInfo } from "./UserInfo";
import { ChangePasswordForm } from "./ChangePasswordForm";

export function SettingsView() {
  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-zinc-800 dark:text-zinc-200">
        Configuración
      </h1>

      <UserInfo />
      <ChangePasswordForm />
    </div>
  );
}
