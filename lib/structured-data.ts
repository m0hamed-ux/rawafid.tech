import {
  email,
  faqs,
  projects,
  services,
  siteDescription,
  siteName,
  siteUrl,
} from "@/lib/content";

/**
 * One @graph with linked entities (@id references) instead of separate
 * scripts: AI engines and search crawlers resolve the relationships
 * between the business, the website, the page, the services, and the FAQ.
 *
 * Deliberately omitted:
 * - Review/AggregateRating schema: we have no third-party reviews yet, and
 *   fabricated or self-serving review markup violates Google's structured
 *   data policies.
 * - Product schema: an agency sells services, so Service + OfferCatalog is
 *   the correct vocabulary.
 */
export const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#organization`,
      name: siteName,
      alternateName: "Rawafid.tech",
      url: siteUrl,
      email,
      description: siteDescription,
      image: `${siteUrl}/images/hero.jpg`,
      priceRange: "$$",
      areaServed: [
        { "@type": "Place", name: "Asia" },
        { "@type": "Place", name: "Worldwide" },
      ],
      knowsAbout: [
        "Web design",
        "Web development",
        "Mobile app development",
        "E-commerce",
        "Technical SEO",
        "Digital marketing",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        email,
        contactType: "sales",
        availableLanguage: ["English"],
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Web agency services",
        itemListElement: services.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            "@id": `${siteUrl}/services#${service.slug}`,
            name: service.title,
            description: service.body,
            url: `${siteUrl}/services#${service.slug}`,
            provider: { "@id": `${siteUrl}/#organization` },
            areaServed: { "@type": "Place", name: "Asia" },
          },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: siteName,
      description: siteDescription,
      publisher: { "@id": `${siteUrl}/#organization` },
      inLanguage: "en",
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/#webpage`,
      url: siteUrl,
      name: "Rawafid | Web agency for design, development & growth",
      description: siteDescription,
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: { "@id": `${siteUrl}/#organization` },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${siteUrl}/images/hero.jpg`,
      },
      inLanguage: "en",
    },
    {
      "@type": "ItemList",
      "@id": `${siteUrl}/#projects-list`,
      name: "Selected projects by Rawafid",
      itemListElement: projects.map((project, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: project.name,
        url: `${siteUrl}/projects/${project.slug}`,
      })),
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.a,
        },
      })),
    },
  ],
};
