import { getSupabase } from "./supabase";

/**
 * Blog data layer.
 *
 * Posts come from the Supabase `posts` table. Until the env keys are set
 * in .env.local, getPosts()/getPost() fall back to the static posts below,
 * so the site works in both states with no code change.
 *
 * Content is structured blocks instead of raw HTML, so adding an image,
 * an FAQ, or a mention of Rawafid inside any paragraph stays a one-liner.
 * Inside text you can write [label](/any-url) to link, e.g.
 * "... talk to [Rawafid](/booking) ..." renders as a link.
 */

export type PostBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string };

export type Post = {
  slug: string;
  title: string;
  description: string;
  cover: string;
  coverAlt: string;
  publishedAt: string;
  updatedAt: string;
  tags: string[];
  blocks: PostBlock[];
  faqs: { q: string; a: string }[];
};

const posts: Post[] = [
  {
    slug: "why-website-speed-matters",
    title: "Why website speed matters more than your design",
    description:
      "Slow websites lose visitors before the design is even seen. What website speed really affects, how fast is fast enough, and what actually makes pages slow.",
    cover: "/images/blog/website-speed.jpg",
    coverAlt:
      "Laptop showing a website performance dashboard with green scores on a warm wooden desk",
    publishedAt: "2026-08-03",
    updatedAt: "2026-08-03",
    tags: ["Web development", "Performance", "SEO"],
    blocks: [
      {
        type: "paragraph",
        text: "A beautiful website that loads slowly is a beautiful website almost nobody sees. Most visitors decide whether to stay within a few seconds, and search engines treat loading speed as a ranking signal. Before debating colors and layouts, speed is the first thing worth getting right.",
      },
      { type: "heading", text: "What does website speed actually affect?" },
      {
        type: "list",
        items: [
          "Bounce rate: visitors leave slow pages before reading anything.",
          "Search rankings: Google uses Core Web Vitals as a ranking signal.",
          "Conversions: every extra second of loading measurably reduces sales and inquiries.",
          "Ad costs: faster landing pages score better and lower your cost per click.",
        ],
      },
      { type: "heading", text: "How fast is fast enough?" },
      {
        type: "paragraph",
        text: "A useful target: your main content should be visible in under 2.5 seconds on an average phone connection. That is the threshold Google uses for its Largest Contentful Paint metric. You can test any page for free with PageSpeed Insights; scores in the green mean you are in good shape.",
      },
      {
        type: "image",
        src: "/images/blog/website-speed.jpg",
        alt: "A performance dashboard showing green Core Web Vitals scores",
        caption: "Green Core Web Vitals scores are an achievable target for most sites.",
      },
      { type: "heading", text: "What makes websites slow?" },
      {
        type: "paragraph",
        text: "In our experience the usual suspects are oversized images, too many third-party scripts, cheap hosting, and heavy page builders. The fix is rarely one magic setting: it is building on modern foundations that treat speed as a requirement, not an afterthought. That is how [Rawafid](/services#web-design-development) builds every site: images optimized automatically, pages pre-rendered, and scripts kept to a minimum.",
      },
      {
        type: "quote",
        text: "Speed is not a technical detail. It is the first impression your business makes.",
      },
      { type: "heading", text: "Where to start if your site is slow" },
      {
        type: "paragraph",
        text: "Run your homepage through PageSpeed Insights and look at the biggest items in the report. If the fixes look structural, a rebuild on modern foundations is often cheaper than patching an old setup. If you want a second opinion, [tell us about your site](/booking) and we will audit it before recommending anything.",
      },
    ],
    faqs: [
      {
        q: "How do I check my website speed?",
        a: "Use Google's free PageSpeed Insights tool. Enter your URL and it scores your site on mobile and desktop, and lists what slows it down.",
      },
      {
        q: "What is a good loading time for a website?",
        a: "Main content visible in under 2.5 seconds on a phone. That matches Google's Largest Contentful Paint threshold for a good experience.",
      },
      {
        q: "Does website speed really affect SEO?",
        a: "Yes. Core Web Vitals are a confirmed Google ranking signal, and slow pages also rank worse indirectly because visitors leave them faster.",
      },
      {
        q: "Can an existing slow website be fixed without a rebuild?",
        a: "Sometimes. Oversized images and extra scripts can be fixed in place. If the platform itself is heavy, a rebuild on faster foundations usually costs less than fighting it.",
      },
    ],
  },
  {
    slug: "online-store-basics-small-business",
    title: "The online store basics every small business gets wrong",
    description:
      "Product photos, checkout length, shipping clarity, and trust signals: the four store basics that decide whether visitors buy, and how to get each one right.",
    cover: "/images/blog/ecommerce-basics.jpg",
    coverAlt:
      "A small business owner photographing handmade ceramics with a smartphone on a tripod",
    publishedAt: "2026-08-04",
    updatedAt: "2026-08-04",
    tags: ["E-commerce", "Small business"],
    blocks: [
      {
        type: "paragraph",
        text: "Most online stores do not fail because of the product. They fail because buying is harder than it should be. After building stores across different industries, we keep seeing the same four basics decide the outcome.",
      },
      { type: "heading", text: "Product photos do the selling" },
      {
        type: "paragraph",
        text: "Online, the photo is the product. Shoot on a clean background, show scale with a hand or familiar object, and include at least one photo of the product in use. A phone camera and window light are enough; consistency matters more than equipment.",
      },
      {
        type: "image",
        src: "/images/blog/ecommerce-basics.jpg",
        alt: "Handmade ceramics being photographed with a smartphone in natural light",
        caption: "Window light and a consistent setup beat expensive gear.",
      },
      { type: "heading", text: "Checkout should take a minute" },
      {
        type: "paragraph",
        text: "Every extra field and forced account creation loses buyers. A good checkout asks only for what shipping and payment need, works as a guest, and shows the total cost early. If your checkout takes more than a minute, that is where your sales are leaking.",
      },
      { type: "heading", text: "Shipping surprises kill carts" },
      {
        type: "paragraph",
        text: "Unexpected shipping costs are the most common reason carts are abandoned. Show delivery cost and time on the product page, not at the last step. If you offer free shipping above an amount, say it everywhere.",
      },
      { type: "heading", text: "Trust is built in small details" },
      {
        type: "list",
        items: [
          "A real about page with faces and a story.",
          "Clear return and refund terms in plain language.",
          "Reviews with photos where possible.",
          "A contact channel that answers: WhatsApp, LINE, or email.",
        ],
      },
      {
        type: "paragraph",
        text: "None of this requires a big budget; it requires care. If you would rather have it done for you, [Rawafid builds e-commerce stores](/services#e-commerce) where these basics are part of the foundation, from product page to payment.",
      },
    ],
    faqs: [
      {
        q: "What platform should a small business use for an online store?",
        a: "The one your team can actually run. Hosted platforms like Shopify suit most small teams; a custom storefront makes sense when you need speed, custom flows, or lower fees at scale.",
      },
      {
        q: "Why do customers abandon their carts?",
        a: "The top reasons are surprise shipping costs, forced account creation, and long checkouts. Fixing those three recovers more sales than any discount campaign.",
      },
      {
        q: "How many product photos do I need?",
        a: "At least three per product: a clean front shot, a detail shot, and one in real use. Add a short video if the product moves or has texture.",
      },
    ],
  },
  {
    slug: "mobile-app-or-website-first",
    title: "Mobile app or website: which should your business build first?",
    description:
      "Apps and websites solve different problems. A clear way to decide which one your business needs first, and when building both actually makes sense.",
    cover: "/images/blog/app-or-website.jpg",
    coverAlt:
      "A hand sketching a mobile app wireframe in a notebook next to a phone showing a clean interface",
    publishedAt: "2026-08-05",
    updatedAt: "2026-08-05",
    tags: ["Mobile apps", "Strategy"],
    blocks: [
      {
        type: "paragraph",
        text: "Almost every business asks this at some point: do we need an app? The honest answer is that most need a great website first, and some genuinely need an app. Here is the way we help clients decide.",
      },
      { type: "heading", text: "When a website is the right first move" },
      {
        type: "paragraph",
        text: "A website is where new customers find you. It works on every device without installing anything, it can rank on Google, and one build serves everyone. If your goal is to be found, explain what you do, and take inquiries or orders, a fast website does all of it.",
      },
      { type: "heading", text: "When an app earns its place" },
      {
        type: "list",
        items: [
          "Your customers return daily or weekly: ordering, booking, tracking.",
          "You need what only phones offer: push notifications, camera, offline use.",
          "Loyalty is the business model: points, subscriptions, member pricing.",
        ],
      },
      {
        type: "image",
        src: "/images/blog/app-or-website.jpg",
        alt: "Sketching an app wireframe on paper next to a phone",
        caption: "Apps earn their place when customers come back often.",
      },
      { type: "heading", text: "The common mistake: app first, audience later" },
      {
        type: "paragraph",
        text: "An app store listing is not a marketing channel. Nobody searches the app store for a business they have never heard of. The pattern that works is the opposite: the website builds the audience, then the app serves the customers who keep coming back.",
      },
      {
        type: "paragraph",
        text: "The good news: you do not have to choose blindly. [Rawafid builds both](/services#mobile-apps), and we will tell you honestly if an app is not worth your budget yet. [Describe your situation](/booking) and we will recommend a starting point.",
      },
    ],
    faqs: [
      {
        q: "Is a mobile app more expensive than a website?",
        a: "Usually yes. An app is built for two platforms, reviewed by app stores, and needs updates to keep working with new OS versions. A website has one build and reaches every device.",
      },
      {
        q: "Can a website feel like an app on phones?",
        a: "Largely, yes. A well-built responsive site is fast, installable to the home screen, and can even work offline. For many businesses that covers what they wanted an app for.",
      },
      {
        q: "Should I build the app and website at the same time?",
        a: "Only if returning customers are already waiting for it. Otherwise launch the website first, learn from real usage, and let that shape the app.",
      },
    ],
  },
];

function hasSupabase(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

/** Row shape of the public.posts table (supabase/schema.sql). */
type PostRow = {
  slug: string;
  title: string;
  description: string;
  cover: string;
  cover_alt: string;
  tags: string[];
  blocks: PostBlock[];
  faqs: { q: string; a: string }[];
  published_at: string;
  updated_at: string;
};

const POST_COLUMNS =
  "slug, title, description, cover, cover_alt, tags, blocks, faqs, published_at, updated_at";

function rowToPost(row: PostRow): Post {
  return {
    slug: row.slug,
    title: row.title,
    description: row.description,
    cover: row.cover,
    coverAlt: row.cover_alt,
    tags: row.tags,
    blocks: row.blocks,
    faqs: row.faqs,
    publishedAt: row.published_at,
    updatedAt: row.updated_at.slice(0, 10),
  };
}

function fallbackPosts(): Post[] {
  return [...posts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function getPosts(): Promise<Post[]> {
  if (!hasSupabase()) return fallbackPosts();

  const { data, error } = await getSupabase()
    .from("posts")
    .select(POST_COLUMNS)
    .order("published_at", { ascending: false });

  if (error) {
    // A database hiccup should not take the whole blog down.
    console.error("getPosts failed, serving fallback posts:", error.message);
    return fallbackPosts();
  }
  return (data as PostRow[]).map(rowToPost);
}

export async function getPost(slug: string): Promise<Post | undefined> {
  if (!hasSupabase()) return posts.find((post) => post.slug === slug);

  const { data, error } = await getSupabase()
    .from("posts")
    .select(POST_COLUMNS)
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("getPost failed, serving fallback post:", error.message);
    return posts.find((post) => post.slug === slug);
  }
  return data ? rowToPost(data as PostRow) : undefined;
}

export function readingTime(post: Post): number {
  const words = post.blocks
    .map((block) => {
      if (block.type === "list") return block.items.join(" ");
      if (block.type === "image") return block.caption ?? "";
      return block.text;
    })
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
