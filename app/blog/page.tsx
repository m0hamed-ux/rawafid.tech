import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Pagination } from "@/components/pagination";
import { formatDate, getPosts, readingTime } from "@/lib/blog";
import { siteName, siteUrl } from "@/lib/content";

// Pick up new posts from the database within 60 seconds.
export const revalidate = 60;

const pageTitle = "Blog: practical advice on websites, apps & growth";
const pageDescription =
  "Practical, plain-language articles from Rawafid on websites, mobile apps, e-commerce, and SEO. Written for business owners, not developers.";

const POSTS_PER_PAGE = 6;

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const searchParams = await props.searchParams;
  const pageParam = parseInt(searchParams.page || "1", 10);
  const page = isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;

  const canonical = page > 1 ? `/blog?page=${page}` : "/blog";
  const displayTitle = page > 1 ? `Blog (Page ${page})` : "Blog";

  return {
    title: displayTitle,
    description: pageDescription,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      url: `${siteUrl}${canonical}`,
      title: `${pageTitle}${page > 1 ? ` (Page ${page})` : ""} | ${siteName}`,
      description: pageDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: `${pageTitle}${page > 1 ? ` (Page ${page})` : ""} | ${siteName}`,
      description: pageDescription,
    },
  };
}

export default async function BlogPage(props: Props) {
  const searchParams = await props.searchParams;
  const pageParam = parseInt(searchParams.page || "1", 10);

  const posts = await getPosts();
  const totalPosts = posts.length;

  const remainingPosts = Math.max(0, totalPosts - 1);
  const totalPages = Math.max(1, Math.ceil(remainingPosts / POSTS_PER_PAGE));
  const currentPage = Math.min(
    Math.max(1, isNaN(pageParam) ? 1 : pageParam),
    totalPages
  );

  const isPageOne = currentPage === 1;
  const latest = isPageOne ? posts[0] : null;

  const startIndex = isPageOne ? 1 : 1 + (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = isPageOne ? 1 + POSTS_PER_PAGE : 1 + currentPage * POSTS_PER_PAGE;
  const gridPosts = posts.slice(startIndex, endIndex);

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
          image: post.cover.startsWith("http")
            ? post.cover
            : `${siteUrl}${post.cover}`,
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
            {!isPageOne && (
              <span className="ml-3 text-2xl font-normal text-moss md:text-4xl">
                (Page {currentPage})
              </span>
            )}
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-moss">
            Websites, apps, stores, and search. Written for business owners,
            not developers. A new article every day.
          </p>

          {/* Latest post, featured (Page 1 only) */}
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

          {/* Grid posts */}
          {gridPosts.length > 0 && (
            <div className="mt-20 grid grid-cols-1 gap-x-8 gap-y-14 border-t border-ink/10 pt-14 md:grid-cols-2 lg:grid-cols-3">
              {gridPosts.map((post) => (
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

          {/* Pagination Controls */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            baseUrl="/blog"
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
