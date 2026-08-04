import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { BookingForm } from "@/components/booking-form";
import { siteName, siteUrl } from "@/lib/content";

const pageTitle = "Start a project";
const pageDescription =
  "Tell us about your business and what you need: a few short questions about your goals, budget, and timeline, and we come back with a plan and a fixed quote.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/booking",
  },
  openGraph: {
    type: "website",
    url: `${siteUrl}/booking`,
    title: `${pageTitle} | ${siteName}`,
    description: pageDescription,
  },
  twitter: {
    card: "summary",
    title: `${pageTitle} | ${siteName}`,
    description: pageDescription,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": `${siteUrl}/booking#webpage`,
      url: `${siteUrl}/booking`,
      name: `${pageTitle} | ${siteName}`,
      description: pageDescription,
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: { "@id": `${siteUrl}/#organization` },
      inLanguage: "en",
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${siteUrl}/booking#breadcrumbs`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        {
          "@type": "ListItem",
          position: 2,
          name: "Start a project",
          item: `${siteUrl}/booking`,
        },
      ],
    },
  ],
};

export default function BookingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Focused flow: no site header or footer, just a way back */}
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-5 pb-24 pt-8 md:px-8 md:pt-10">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="font-display text-xl font-semibold tracking-tight text-ink"
            >
              rawafid<span className="text-forest">.tech</span>
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-moss transition-colors hover:text-ink"
            >
              <ArrowLeft size={16} weight="bold" />
              Back to site
            </Link>
          </div>

          <h1 className="mt-12 font-display text-4xl font-medium leading-[1.05] tracking-tight md:text-5xl">
            Let&apos;s start your project
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-moss">
            A few short questions so our first conversation is a useful one.
            It takes about two minutes, and we reply within two working days.
          </p>

          <div className="mt-12">
            <BookingForm />
          </div>
        </div>
      </main>
    </>
  );
}
