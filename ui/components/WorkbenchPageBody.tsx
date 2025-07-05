import { PageMain, PageHeader, WorkbenchItem } from "@/ui";
import type { WorkbenchPost } from "@/lib/types";
import Image from "next/image";

export interface WorkbenchProps {
  projects: WorkbenchPost[];
}

export function WorkbenchPageBody({ projects }: WorkbenchProps) {
  return (
    <PageMain>
      <PageHeader
        title="Digital Workbench"
        summary="A curated collection of projects where code meets creativity, and ideas transform into digital reality."
        logo={
          <Image
            src="/workbench-foto.png"
            alt="Workbench Logo"
            className="md:w-32 md:h-32"
            loading="lazy"
            width={600}
            height={600}
          />
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {projects.map((project) => (
          <WorkbenchItem key={project.id} project={project} />
        ))}
      </div>
    </PageMain>
  );
}
