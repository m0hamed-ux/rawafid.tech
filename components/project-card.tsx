import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { Project } from "@/lib/content";

export function ProjectCard({
  project,
  className = "",
}: {
  project: Project;
  className?: string;
}) {
  return (
    <article className={`group ${className}`}>
      <Link
        href={`/projects/${project.slug}`}
        scroll={false}
        aria-label={`${project.name}: ${project.kind}`}
        className="block"
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-cream-deep">
          <Image
            src={project.image}
            alt={project.alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        </div>
        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-xl font-medium tracking-tight">
              {project.name}
            </h3>
            <p className="mt-1 text-sm text-moss">{project.kind}</p>
          </div>
          <span className="mt-1 flex size-9 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors group-hover:bg-forest group-hover:text-cream group-hover:border-forest">
            <ArrowUpRight size={16} weight="bold" />
          </span>
        </div>
      </Link>
    </article>
  );
}
