import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProjectCard } from "@/components/project-card";
import { projects, siteName, siteUrl } from "@/lib/content";

const pageTitle = "Projects: websites, apps & stores we built";
const pageDescription =
  "Selected projects by Rawafid: an organic skincare store, a restaurant website with reservations, a mobile banking app, and a direct booking site for a boutique riad.";

export const metadata: Metadata = {
  title: "Projects",
  description: pageDescription,
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    type: "website",
    url: `${siteUrl}/projects`,
    title: `${pageTitle} | ${siteName}`,
    description: pageDescription,
    images: [
      {
        url: projects[0].image,
        alt: projects[0].alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${pageTitle} | ${siteName}`,
    description: pageDescription,
    images: [projects[0].image],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${siteUrl}/projects#webpage`,
      url: `${siteUrl}/projects`,
      name: `${pageTitle} | ${siteName}`,
      description: pageDescription,
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: { "@id": `${siteUrl}/#organization` },
      inLanguage: "en",
      mainEntity: { "@id": `${siteUrl}/projects#list` },
    },
    {
      "@type": "ItemList",
      "@id": `${siteUrl}/projects#list`,
      name: "Selected projects by Rawafid",
      itemListElement: projects.map((project, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: project.name,
        url: `${siteUrl}/projects/${project.slug}`,
      })),
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${siteUrl}/projects#breadcrumbs`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        {
          "@type": "ListItem",
          position: 2,
          name: "Projects",
          item: `${siteUrl}/projects`,
        },
      ],
    },
  ],
};

export default function ProjectsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header variant="solid" />
      <main className="flex-1">
        <div className="mx-auto max-w-[1400px] px-5 pb-24 pt-14 md:px-8 md:pb-32 md:pt-20">
          <h1 className="max-w-2xl font-display text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl">
            Work we are proud of
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-moss">
            Websites, apps, and stores across commerce, hospitality, and
            fintech. Click any project for the full story.
          </p>

          <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2">
            {projects.map((project, i) => (
              <ProjectCard
                key={project.slug}
                project={project}
                className={i % 2 === 1 ? "md:translate-y-16" : ""}
              />
            ))}
          </div>
          <div className="hidden md:block md:h-16" />
        </div>
      </main>
      <Footer />
    </>
  );
}
