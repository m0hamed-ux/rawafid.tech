import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

const projects = [
  {
    name: "Terra",
    kind: "E-commerce for an organic skincare brand",
    image: "/images/project-terra.jpg",
    alt: "Terra skincare online store homepage with cream and sage tones",
  },
  {
    name: "Atlas Kitchen",
    kind: "Website & reservations for a Mediterranean restaurant",
    image: "/images/project-atlas.jpg",
    alt: "Atlas Kitchen restaurant website with dark olive design and food photography",
  },
  {
    name: "Sanad",
    kind: "Mobile banking app, iOS & Android",
    image: "/images/project-sanad.jpg",
    alt: "Sanad banking app shown on two phone mockups",
  },
  {
    name: "Dar Nour",
    kind: "Booking site for a boutique riad",
    image: "/images/project-darnour.jpg",
    alt: "Dar Nour riad booking website with a sunlit courtyard photograph",
  },
];

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-[1400px] px-5 py-24 md:px-8 md:py-32">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <h2 className="max-w-xl font-display text-3xl font-medium tracking-tight md:text-5xl">
          Work we are proud of
        </h2>
        <p className="max-w-sm text-sm leading-relaxed text-moss">
          A few recent projects across the web, mobile, and commerce.
        </p>
      </div>

      {/* Asymmetric editorial grid: the two columns are offset on desktop */}
      <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2">
        {projects.map((project, i) => (
          <article
            key={project.name}
            className={`group ${i % 2 === 1 ? "md:translate-y-16" : ""}`}
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
          </article>
        ))}
      </div>

      {/* Spacer balances the offset column on desktop */}
      <div className="hidden md:block md:h-16" />
    </section>
  );
}
