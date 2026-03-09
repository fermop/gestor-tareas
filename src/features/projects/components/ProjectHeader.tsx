"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { projectsService } from "../services/projects.service";
import { ModalUpdateProjectName } from "./ModalUpdateProjectName";

export function ProjectHeader({ projectId }: { projectId: string }) {
  const [projectName, setProjectName] = useState<string | null>(null);

  // EFECTO 1: Cargar la información del proyecto usando nuestro servicio
  useEffect(() => {
    const fetchProject = async () => {
      try {
        // Usamos la función que creamos en el paso anterior
        const project = await projectsService.getProjectById(projectId);
        if (project) {
          setProjectName(project.name);
        }
      } catch (error) {
        console.error("Error al cargar el encabezado del proyecto:", error);
      }
    };

    fetchProject();
  }, [projectId]);

  // EFECTO 2: Actualizar el título de la pestaña en el navegador
  useEffect(() => {
    // Usamos projectName, que es la variable que declaraste arriba
    if (projectName) {
      document.title = `${projectName} | Gestor de Tareas`;
    } else {
      document.title = "Cargando proyecto... | Gestor de Tareas";
    }

    // Al desmontar el componente (salir de la página), restauramos el título
    return () => {
      document.title = "Gestor de Tareas";
    };
  }, [projectName]); // Se vuelve a ejecutar si projectName cambia

  return (
    <div className="mb-8 space-y-4">
      {/* Componente Breadcrumb de Shadcn */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/proyectos" className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-600">
                Mis Proyectos
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            {projectName ? (
              <BreadcrumbPage className="font-medium text-zinc-900 dark:text-zinc-300">
                {projectName}
              </BreadcrumbPage>
            ) : (
              <Skeleton className="h-4 w-24" />
            )}
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-zinc-800 dark:text-zinc-50">
            {projectName ? projectName : <Skeleton className="h-9 w-64" />}
          </h1>
          {projectName && (
            <ModalUpdateProjectName
              projectId={projectId}
              currentName={projectName}
              onSuccess={setProjectName}
            />
          )}
        </div>
      </div>
    </div>
  );
}