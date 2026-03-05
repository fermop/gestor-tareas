import { EllipsisVertical, Trash2 } from "lucide-react"
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
}

export function TaskDropdownMenu({ tareaId, onDeleteClick }: TaskDropdownMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          <EllipsisVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-zinc-50 dark:bg-zinc-800">
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">Editar tarea</DropdownMenuItem>
          <DropdownMenuSeparator />
          
          <DropdownMenuItem 
            className="bg-red-500 dark:bg-red-700 hover:bg-red-800 text-white cursor-pointer" 
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