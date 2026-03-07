import { EllipsisVertical, Trash2, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface TaskDropdownMenuProps {
  tareaId: string;
  onDeleteClick: (id: string) => void;
  onEditClick: (id: string) => void;
}

export function TaskDropdownMenu({ tareaId, onDeleteClick, onEditClick }: TaskDropdownMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="cursor-pointer h-8 w-8 p-0">
          <EllipsisVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-zinc-50 dark:bg-zinc-800" align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer" onSelect={() => onEditClick(tareaId)}>
            <Pencil className="h-4 w-4" />
            Editar tarea
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          
          <DropdownMenuItem 
            className="bg-red-500 dark:bg-red-700 hover:bg-red-800 focus:bg-red-600 text-white cursor-pointer" 
            onSelect={() => onDeleteClick(tareaId)}
          >
             <Trash2 className="h-4 w-4 text-white mr-2" />
             Eliminar tarea
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}