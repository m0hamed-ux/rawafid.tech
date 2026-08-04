import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { services, siteName, siteUrl } from "@/lib/content";

const pageTitle = "Web design, mobile apps, e-commerce & SEO services";
const pageDescription =
  "The services Rawafid offers: custom web design and development, iOS and Android apps, e-commerce stores, and SEO with digital marketing. Remote, for clients across Asia and worldwide.";

export const metadata: Metadata = {
  title: "Services",
  description: pageDescription,
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    type: "website",
    url: `${siteUrl}/services`,
    title: `${pageTitle} | ${siteName}`,
    description: pageDescription,
    images: [{ url: "/images/craft.jpg", alt: "Website wireframe sketches next to a laptop" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${pageTitle} | ${siteName}`,
    description: pageDescription,
    images: ["/images/craft.jpg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/services#webpage`,
      url: `${siteUrl}/services`,
      name: `${pageTitle} | ${siteName}`,
      description: pageDescription,
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: { "@id": `${siteUrl}/#organization` },
      inLanguage: "en",
    },
    ...services.map((service) => ({
      "@type": "Service",
      "@id": `${siteUrl}/services#${service.slug}`,
      name: service.title,
      description: service.detail,
      url: `${siteUrl}/services#${service.slug}`,
      provider: { "@id": `${siteUrl}/#organization` },
      areaServed: { "@type": "Place", name: "Asia" },
      serviceType: service.points.join(", "),
    })),
    {
      "@type": "BreadcrumbList",
      "@id": `${siteUrl}/services#breadcrumbs`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        {
          "@type": "ListItem",
          position: 2,
          name: "Services",
          item: `${siteUrl}/services`,
        },
      ],
    },
  ],
};

export default function ServicesPage() {
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
            Design, build, and grow. Under one roof.
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-moss">
            Four services that cover a digital product's whole life, from the
            first sketch to the traffic that finds it.
          </p>

          <div className="mt-16">
            {services.map((service) => (
              <section
                key={service.slug}
                id={service.slug}
                className="grid scroll-mt-24 grid-cols-1 gap-6 border-t border-ink/10 py-12 md:grid-cols-12 md:gap-10 md:py-16"
              >
                <div className="md:col-span-4">
                  <h2 className="font-display text-2xl font-medium tracking-tight md:text-3xl">
                    {service.title}
                  </h2>
                </div>
                <div className="md:col-span-8 lg:col-span-7">
                  <p className="text-base leading-relaxed text-moss">
                    {service.detail}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-2.5">
                    {service.points.map((point) => (
                      <li
                        key={point}
                        className="rounded-full bg-sage px-4 py-2 text-sm text-forest"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
