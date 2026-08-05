import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PostBody } from "@/components/post-body";
import { formatDate, getPost, getPosts, readingTime } from "@/lib/blog";
import { siteName, siteUrl } from "@/lib/content";

// Re-generate in the background once an hour, so daily posts from the
// future database appear without a redeploy.
export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      type: "article",
      url: `${siteUrl}/blog/${post.slug}`,
      title: `${post.title} | ${siteName}`,
      description: post.description,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [siteName],
      tags: post.tags,
      images: [{ url: post.cover, alt: post.coverAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | ${siteName}`,
      description: post.description,
      images: [post.cover],
    },
  };
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = await getPost(slug);
  if (!post) notFound();

  const posts = await getPosts();
  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 2);
  const postUrl = `${siteUrl}/blog/${post.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${postUrl}#article`,
        headline: post.title,
        description: post.description,
        url: postUrl,
        image: `${siteUrl}${post.cover}`,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt,
        inLanguage: "en",
        keywords: post.tags.join(", "),
        author: { "@id": `${siteUrl}/#organization` },
        publisher: { "@id": `${siteUrl}/#organization` },
        mainEntityOfPage: { "@id": `${postUrl}#webpage` },
        isPartOf: { "@id": `${siteUrl}/blog#blog` },
      },
      {
        "@type": "WebPage",
        "@id": `${postUrl}#webpage`,
        url: postUrl,
        name: `${post.title} | ${siteName}`,
        description: post.description,
        isPartOf: { "@id": `${siteUrl}/#website` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${siteUrl}${post.cover}`,
        },
        inLanguage: "en",
      },
      ...(post.faqs.length > 0
        ? [
            {
              "@type": "FAQPage",
              "@id": `${postUrl}#faq`,
              mainEntity: post.faqs.map((faq) => ({
                "@type": "Question",
                name: faq.q,
                acceptedAnswer: { "@type": "Answer", text: faq.a },
              })),
            },
          ]
        : []),
      {
        "@type": "BreadcrumbList",
        "@id": `${postUrl}#breadcrumbs`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: `${siteUrl}/blog`,
          },
          { "@type": "ListItem", position: 3, name: post.title, item: postUrl },
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
        <article className="mx-auto max-w-3xl px-5 pb-24 pt-8 md:px-8 md:pt-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-moss transition-colors hover:text-ink"
          >
            <ArrowLeft size={16} weight="bold" />
            All articles
          </Link>

          <header className="mt-8">
            <p className="text-sm text-moss">
              <time dateTime={post.publishedAt}>
                {formatDate(post.publishedAt)}
              </time>{" "}
              · {readingTime(post)} min read
            </p>
            <h1 className="mt-3 font-display text-3xl font-medium leading-[1.1] tracking-tight md:text-5xl">
              {post.title}
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-moss">
              {post.description}
            </p>
          </header>

          <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-3xl bg-cream-deep">
            <Image
              src={post.cover}
              alt={post.coverAlt}
              fill
              priority
              sizes="(max-width: 880px) 100vw, 880px"
              className="object-cover"
            />
          </div>

          <div className="mt-12">
            <PostBody blocks={post.blocks} />
          </div>

          {post.faqs.length > 0 && (
            <section className="mt-16 border-t border-ink/10 pt-10">
              <h2 className="font-display text-2xl font-medium tracking-tight md:text-3xl">
                Common questions
              </h2>
              <div className="mt-4">
                {post.faqs.map((faq) => (
                  <details key={faq.q} className="group border-b border-ink/10 py-2">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-display text-lg font-medium tracking-tight [&::-webkit-details-marker]:hidden">
                      {faq.q}
                      <span
                        aria-hidden
                        className="shrink-0 text-2xl font-light text-moss transition-transform group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <p className="max-w-lg pb-5 text-sm leading-relaxed text-moss">
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* Article CTA */}
          <aside className="mt-16 rounded-3xl bg-forest-deep p-8 text-cream md:p-10">
            <h2 className="font-display text-2xl font-medium tracking-tight md:text-3xl">
              Thinking about your own project?
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-cream/80">
              Tell us about your business and goals. We reply within two
              working days with an honest recommendation.
            </p>
            <Link
              href="/booking"
              className="mt-6 inline-block rounded-full bg-cream px-7 py-3.5 text-sm font-medium text-ink transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Start a project
            </Link>
          </aside>
        </article>

        {more.length > 0 && (
          <section className="mx-auto max-w-3xl border-t border-ink/10 px-5 pb-24 pt-14 md:px-8">
            <h2 className="font-display text-2xl font-medium tracking-tight">
              Keep reading
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
              {more.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="group">
                  <div className="relative aspect-[16/9] overflow-hidden rounded-3xl bg-cream-deep">
                    <Image
                      src={p.cover}
                      alt={p.coverAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, 420px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-medium tracking-tight transition-colors group-hover:text-forest">
                    {p.title}
                  </h3>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
