import { RegisterForm } from "@/features/auth/components/RegisterForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registro | Gestor de Tareas",
};

export default function RegisterPage() {
  return <RegisterForm />;
}