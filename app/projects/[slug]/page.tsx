import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { Header } from "@/components/header";
import { ProjectDetail } from "@/components/project-detail";
import { Footer } from "@/components/footer";
import { projects, siteName, siteUrl } from "@/lib/content";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: `${project.name}, ${project.kind}`,
    description: project.summary,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      type: "article",
      url: `${siteUrl}/projects/${project.slug}`,
      title: `${project.name}, ${project.kind} | ${siteName}`,
      description: project.summary,
      images: [{ url: project.image, alt: project.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name}, ${project.kind} | ${siteName}`,
      description: project.summary,
      images: [project.image],
    },
  };
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const projectUrl = `${siteUrl}/projects/${project.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${projectUrl}#webpage`,
        url: projectUrl,
        name: `${project.name}, ${project.kind}`,
        description: project.summary,
        isPartOf: { "@id": `${siteUrl}/#website` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${siteUrl}${project.image}`,
        },
        inLanguage: "en",
      },
      {
        "@type": "CreativeWork",
        "@id": `${projectUrl}#work`,
        name: project.name,
        headline: project.kind,
        description: project.summary,
        url: projectUrl,
        image: `${siteUrl}${project.image}`,
        creator: { "@id": `${siteUrl}/#organization` },
        genre: project.sector,
        keywords: [...project.deliverables, ...project.stack].join(", "),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${projectUrl}#breadcrumbs`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Projects",
            item: `${siteUrl}/projects`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: project.name,
            item: projectUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header variant="solid" />
      <main className="flex-1 pt-8 md:pt-10">
        <div className="mx-auto max-w-3xl px-5 pb-8 md:px-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-moss transition-colors hover:text-ink"
          >
            <ArrowLeft size={16} weight="bold" />
            All projects
          </Link>
        </div>
        <ProjectDetail project={project} />
      </main>
      <Footer />
    </>
  );
}
