import Link from "next/link";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/content";

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-[1400px] px-5 py-24 md:px-8 md:py-32">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <h2 className="max-w-xl font-display text-3xl font-medium tracking-tight md:text-5xl">
          Work we are proud of
        </h2>
        <Link
          href="/projects"
          className="text-sm text-moss underline underline-offset-4 transition-colors hover:text-ink"
        >
          All projects
        </Link>
      </div>

      {/* Asymmetric editorial grid: the two columns are offset on desktop */}
      <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.slug}
            project={project}
            className={i % 2 === 1 ? "md:translate-y-16" : ""}
          />
        ))}
      </div>

      {/* Spacer balances the offset column on desktop */}
      <div className="hidden md:block md:h-16" />
    </section>
  );
}
