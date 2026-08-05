import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { formatDate, getPosts, readingTime } from "@/lib/blog";
import { siteName, siteUrl } from "@/lib/content";

// Pick up new posts from the database within the hour, no redeploy.
export const revalidate = 3600;

const pageTitle = "Blog: practical advice on websites, apps & growth";
const pageDescription =
  "Practical, plain-language articles from Rawafid on websites, mobile apps, e-commerce, and SEO. Written for business owners, not developers.";

export const metadata: Metadata = {
  title: "Blog",
  description: pageDescription,
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    type: "website",
    url: `${siteUrl}/blog`,
    title: `${pageTitle} | ${siteName}`,
    description: pageDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: `${pageTitle} | ${siteName}`,
    description: pageDescription,
  },
};

export default async function BlogPage() {
  const posts = await getPosts();
  const [latest, ...rest] = posts;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": `${siteUrl}/blog#blog`,
        url: `${siteUrl}/blog`,
        name: `${siteName} blog`,
        description: pageDescription,
        publisher: { "@id": `${siteUrl}/#organization` },
        inLanguage: "en",
        blogPost: posts.map((post) => ({
          "@type": "BlogPosting",
          "@id": `${siteUrl}/blog/${post.slug}#article`,
          headline: post.title,
          url: `${siteUrl}/blog/${post.slug}`,
          datePublished: post.publishedAt,
          dateModified: post.updatedAt,
          image: `${siteUrl}${post.cover}`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteUrl}/blog#breadcrumbs`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: `${siteUrl}/blog`,
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
      <main className="flex-1">
        <div className="mx-auto max-w-[1400px] px-5 pb-24 pt-14 md:px-8 md:pb-32 md:pt-20">
          <h1 className="max-w-2xl font-display text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl">
            Plain advice for growing online
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-moss">
            Websites, apps, stores, and search. Written for business owners,
            not developers. A new article every day.
          </p>

          {/* Latest post, featured */}
          {latest && (
            <Link
              href={`/blog/${latest.slug}`}
              className="group mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center"
            >
              <div className="relative aspect-[16/9] overflow-hidden rounded-3xl bg-cream-deep">
                <Image
                  src={latest.cover}
                  alt={latest.coverAlt}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </div>
              <div>
                <p className="text-sm text-moss">
                  {formatDate(latest.publishedAt)} · {readingTime(latest)} min
                  read
                </p>
                <h2 className="mt-3 font-display text-2xl font-medium tracking-tight transition-colors group-hover:text-forest md:text-4xl">
                  {latest.title}
                </h2>
                <p className="mt-4 max-w-md text-base leading-relaxed text-moss">
                  {latest.description}
                </p>
              </div>
            </Link>
          )}

          {/* Remaining posts */}
          {rest.length > 0 && (
            <div className="mt-20 grid grid-cols-1 gap-x-8 gap-y-14 border-t border-ink/10 pt-14 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group"
                >
                  <div className="relative aspect-[16/9] overflow-hidden rounded-3xl bg-cream-deep">
                    <Image
                      src={post.cover}
                      alt={post.coverAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                  <p className="mt-4 text-sm text-moss">
                    {formatDate(post.publishedAt)} · {readingTime(post)} min
                    read
                  </p>
                  <h2 className="mt-2 font-display text-xl font-medium tracking-tight transition-colors group-hover:text-forest">
                    {post.title}
                  </h2>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
