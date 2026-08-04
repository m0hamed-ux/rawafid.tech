import Image from "next/image";
import type { Project } from "@/lib/content";

export function ProjectDetail({
  project,
  inModal = false,
}: {
  project: Project;
  inModal?: boolean;
}) {
  // The modal overlays the homepage (which already has an h1),
  // so heading levels step down one rank there.
  const Title = inModal ? "h2" : "h1";
  const Heading = inModal ? "h3" : "h2";

  return (
    <article className={inModal ? "" : "mx-auto max-w-3xl px-5 md:px-8"}>
      <div
        className={`relative overflow-hidden bg-cream-deep ${
          inModal
            ? "aspect-[16/9] rounded-t-3xl"
            : "aspect-[16/9] rounded-3xl"
        }`}
      >
        <Image
          src={project.image}
          alt={project.alt}
          fill
          priority={!inModal}
          sizes="(max-width: 880px) 100vw, 880px"
          className="object-cover"
        />
      </div>

      <div className={inModal ? "p-7 md:p-10" : "py-10"}>
        <p className="text-sm text-moss">{project.sector}</p>
        <Title className="mt-2 font-display text-3xl font-medium tracking-tight md:text-4xl">
          {project.name}
        </Title>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-moss">
          {project.summary}
        </p>

        <div className="mt-9 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <Heading className="font-display text-lg font-medium tracking-tight">
              The brief
            </Heading>
            <p className="mt-2 text-sm leading-relaxed text-moss">
              {project.brief}
            </p>
          </div>
          <div>
            <Heading className="font-display text-lg font-medium tracking-tight">
              What we did
            </Heading>
            <p className="mt-2 text-sm leading-relaxed text-moss">
              {project.work}
            </p>
          </div>
        </div>

        <div className="mt-9 border-t border-ink/10 pt-7">
          <Heading className="font-display text-lg font-medium tracking-tight">
            Deliverables
          </Heading>
          <ul className="mt-4 flex flex-wrap gap-2.5">
            {project.deliverables.map((item) => (
              <li
                key={item}
                className="rounded-full bg-sage px-4 py-2 text-sm text-forest"
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-moss">
            Built with {project.stack.join(", ")}.
          </p>
        </div>
      </div>
    </article>
  );
}
