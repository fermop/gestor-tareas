import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';

interface ModalConfirmDeleteProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ModalConfirmDelete({ isOpen, onClose, onConfirm }: ModalConfirmDeleteProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700">
        <DialogTitle className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Confirmar eliminación
        </DialogTitle>
        <DialogDescription className="text-zinc-500 dark:text-zinc-400">
          ¿Estás seguro de que quieres eliminar esta tarea? Esta acción no se puede deshacer.
        </DialogDescription>
        
        <DialogFooter className="flex justify-end gap-2 mt-4">
          <Button variant="outline" className="cursor-pointer" onClick={onClose}>
            Cancelar
          </Button>

          <Button 
            variant="destructive" 
            className="cursor-pointer" 
            onClick={onConfirm}
          >
            Eliminar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}