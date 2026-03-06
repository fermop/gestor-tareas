"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import { tasksService } from "../services/tasks.service";
import { toast } from "sonner";
import { Paperclip } from "lucide-react";

export function TaskForm({ projectId }: { projectId: string }) {
  const [tituloTarea, setTituloTarea] = useState("");
  const [archivo, setArchivo] = useState<File | null>(null);
  const [estaGuardando, setEstaGuardando] = useState(false);

  const crearTarea = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tituloTarea.trim() || !auth.currentUser) return;

    setEstaGuardando(true);

    try {
      await tasksService.createTask(
        projectId, 
        tituloTarea, 
        auth.currentUser.uid, 
        archivo
      );

      setTituloTarea("");
      setArchivo(null);
      toast.success("Tarea guardada correctamente");
    } catch (error) {
      console.error("Error al crear la tarea:", error);
      toast.error("Hubo un problema al guardar la tarea");
    } finally {
      setEstaGuardando(false);
    }
  };

  return (
    <form onSubmit={crearTarea} className="flex flex-col gap-4 mt-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={tituloTarea}
          onChange={(e) => setTituloTarea(e.target.value)}
          placeholder="¿Qué necesitas hacer?"
          disabled={estaGuardando}
          className="flex-1 px-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500 disabled:opacity-50"
        />
        <button 
          type="submit"
          disabled={estaGuardando || !tituloTarea.trim()}
          className="px-6 py-2 bg-zinc-900 text-white rounded-md hover:bg-zinc-950 transition-colors cursor-pointer disabled:opacity-50 flex items-center justify-center min-w-[140px] disabled:cursor-not-allowed"
        >
          {estaGuardando ? "Guardando..." : "Agregar Tarea"}
        </button>
      </div>

      <div className="flex items-center gap-2">
        <label className="flex items-center gap-2 cursor-pointer text-sm text-zinc-600 hover:text-zinc-900 transition-colors">
          <Paperclip size={18} />
          <span>{archivo ? archivo.name : "Adjuntar imagen (opcional)"}</span>
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            onChange={(e) => setArchivo(e.target.files ? e.target.files[0] : null)}
            disabled={estaGuardando}
          />
        </label>
        {archivo && (
          <button 
            type="button" 
            onClick={() => setArchivo(null)}
            className="text-xs text-red-500 hover:underline cursor-pointer"
            disabled={estaGuardando}
          >
            Quitar
          </button>
        )}
      </div>
    </form>
  );
}