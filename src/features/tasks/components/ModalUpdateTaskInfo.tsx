"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Paperclip, X, Trash2 } from "lucide-react";
import { Task } from "../services/tasks.service";

interface ModalUpdateTaskInfoProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (newTitle: string, newFile: File | null, removeImage: boolean) => Promise<void>; 
}

export default function ModalUpdateTaskInfo({ task, isOpen, onClose, onConfirm }: ModalUpdateTaskInfoProps) {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [removeImage, setRemoveImage] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (task && isOpen) {
      setTitle(task.title);
      setFile(null);
      setRemoveImage(false);
    }
  }, [task, isOpen]);

  const hasChanges = () => {
    if (!task) return false;
    const titleChanged = title.trim() !== task.title;
    const fileChanged = file !== null;
    return titleChanged || fileChanged || removeImage;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] ?? null;
    setFile(selectedFile);
    if (selectedFile) setRemoveImage(false);
  };

  const handleRemoveImage = () => {
    setRemoveImage(true);
    setFile(null);
  };

  const handleGuardar = async () => {
    if (!title.trim() || !hasChanges()) return;
    setIsSaving(true);
    try {
      await onConfirm(title.trim(), file, removeImage);
      onClose();
    } finally {
      setIsSaving(false);
    }
  };

  // Determine current image state for display
  const hasStoredImage = !!task?.imageUrl && !removeImage;
  const hasNewFile = file !== null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-white dark:bg-stone-900 ring-1 ring-stone-200/80 dark:ring-stone-800/60 border-none">
        <DialogTitle className="text-lg font-semibold text-stone-800 dark:text-stone-100">
          Actualizar tarea
        </DialogTitle>
        
        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="task-name">Nombre de la tarea</Label>
            <Input 
              id="task-name" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              disabled={isSaving}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Imagen adjunta (opcional)</Label>
            <div className="flex items-center gap-2 mt-1">
              <label className="flex items-center gap-2 cursor-pointer text-sm text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-200 transition-colors">
                <Paperclip size={16} />
                <span className="truncate max-w-50">
                  {hasNewFile
                    ? file!.name
                    : hasStoredImage
                      ? "Cambiar imagen actual"
                      : "Adjuntar nueva imagen"}
                </span>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleFileChange}
                  disabled={isSaving}
                />
              </label>
              {hasNewFile && (
                <button 
                  type="button" 
                  onClick={() => setFile(null)}
                  className="text-xs text-red-500 hover:text-red-600 dark:text-red-400 flex items-center gap-1 cursor-pointer transition-colors"
                  disabled={isSaving}
                >
                  <X size={12} />
                  Quitar
                </button>
              )}
            </div>

            {/* Remove stored image option */}
            {hasStoredImage && !hasNewFile && (
              <button
                type="button"
                onClick={handleRemoveImage}
                className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 cursor-pointer transition-colors w-fit mt-1"
                disabled={isSaving}
              >
                <Trash2 size={12} />
                Eliminar imagen actual
              </button>
            )}

            {/* Feedback when image is marked for removal */}
            {removeImage && !hasNewFile && (
              <div className="flex items-center justify-between text-xs text-stone-400 dark:text-stone-500 bg-stone-100 dark:bg-stone-800/50 rounded-lg px-3 py-2 mt-1">
                <span>La imagen se eliminará al guardar</span>
                <button
                  type="button"
                  onClick={() => setRemoveImage(false)}
                  className="text-amber-600 dark:text-amber-400 hover:underline cursor-pointer ml-2"
                  disabled={isSaving}
                >
                  Deshacer
                </button>
              </div>
            )}
          </div>
        </div>
        
        <DialogFooter className="flex justify-end gap-2 mt-4">
          <Button variant="outline" className="cursor-pointer" onClick={onClose} disabled={isSaving}>
            Cancelar
          </Button>
          <Button className="cursor-pointer bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-400 dark:text-stone-900" onClick={handleGuardar} disabled={isSaving || !title.trim() || !hasChanges()}>
            {isSaving ? "Guardando..." : "Guardar cambios"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}