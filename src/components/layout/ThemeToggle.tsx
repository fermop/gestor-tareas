"use client";

import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";
import { SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton className="cursor-pointer text-stone-600 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-400">
            <Sun className="w-4 h-4 hidden dark:block" />
            <Moon className="w-4 h-4 block dark:hidden" />
            <span>Cambiar tema</span>
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="bg-white dark:bg-stone-900 ring-1 ring-stone-200/80 dark:ring-stone-800/60 border-none shadow-lg"
          side="top"
          align="start"
        >
          <DropdownMenuLabel className="text-stone-500 dark:text-stone-400">
            Tema
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-stone-100 dark:bg-stone-800" />
          <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
            <DropdownMenuRadioItem value="system" className="cursor-pointer text-stone-700 dark:text-stone-300">
              <Monitor className="w-4 h-4" />
              Predeterminado
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="light" className="cursor-pointer text-stone-700 dark:text-stone-300">
              <Sun className="w-4 h-4" />
              Claro
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="dark" className="cursor-pointer text-stone-700 dark:text-stone-300">
              <Moon className="w-4 h-4" />
              Oscuro
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  );
}