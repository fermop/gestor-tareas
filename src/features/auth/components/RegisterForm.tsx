"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { authService } from "../services/auth.service";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await authService.registerWithEmail(email, password);
      toast.success("Cuenta creada exitosamente");
      router.push("/proyectos");
    } catch (error: any) {
      console.error(error);
      if (error.code === "auth/email-already-in-use") {
        toast.error("Este correo ya está registrado");
      } else {
        toast.error("Error al crear la cuenta");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-zinc-50 dark:bg-zinc-900">
      <div className="w-full max-w-md p-8 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-600 rounded-2xl shadow-sm">
        <h1 className="text-2xl font-bold text-zinc-800 dark:text-zinc-200 mb-6 text-center">Crear cuenta</h1>

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              type="email"
              required
              className="bg-white dark:bg-zinc-800"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              required
              className="bg-white dark:bg-zinc-800"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer"
          >
            {loading ? "Registrando..." : "Registrarse"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
          ¿Ya tienes cuenta? <Link href="/login" className="text-zinc-900 dark:text-zinc-300 font-semibold hover:underline">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
}