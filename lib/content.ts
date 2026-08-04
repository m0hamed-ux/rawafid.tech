/**
 * Single source of truth for business content.
 * The visible page and the JSON-LD structured data both read from here,
 * so search engines and AI agents never see text that differs from the page.
 */

export const siteUrl = "https://rawafid.tech";
export const siteName = "Rawafid";
export const email = "hello@rawafid.tech";

export const siteDescription =
  "Rawafid is a web agency building websites, mobile apps, and e-commerce stores, backed by SEO and digital marketing that helps them get found.";

export const services = [
  {
    slug: "web-design-development",
    title: "Web design & development",
    body: "Custom websites and web apps designed around your goals, built on modern foundations, and fast on every device.",
    detail:
      "Every website we ship is designed and built for the business it serves: no themes, no page builders. We plan the structure around your content, design in the open with shared previews, and build on modern foundations that load fast and rank well. Marketing sites, product sites, and web applications all follow the same rule: clear for visitors, easy for your team to run.",
    points: ["Marketing sites", "Web applications", "Redesigns"],
  },
  {
    slug: "mobile-apps",
    title: "Mobile apps",
    body: "iOS and Android apps that feel native, stay maintainable, and ship without drama.",
    detail:
      "We take mobile products from first flows to the app stores. One shared codebase keeps iOS and Android consistent and affordable to maintain, while platform conventions keep each app feeling native. Design systems, offline states, and store submission are part of the work, not afterthoughts.",
    points: ["iOS & Android", "Cross-platform builds", "App store launches"],
  },
  {
    slug: "e-commerce",
    title: "E-commerce",
    body: "Online stores where browsing is pleasant and checkout is effortless, from product page to payment.",
    detail:
      "A store has one job: make buying easy. We build storefronts where the catalog is fast, product pages sell with photography and honest copy, and checkout stays short. Payments, shipping, taxes, and analytics are wired in from the start so you can run the store without us.",
    points: ["Custom storefronts", "Shopify builds", "Payment integration"],
  },
  {
    slug: "seo-digital-marketing",
    title: "SEO & digital marketing",
    body: "Getting found matters as much as looking good. We handle search, content, and campaigns after launch.",
    detail:
      "Being built well is half the job; being found is the other half. We handle technical SEO and structured data during the build, then content strategy and campaigns after launch. Reporting focuses on inquiries and sales, not vanity metrics.",
    points: ["Technical SEO", "Content strategy", "Paid campaigns"],
  },
];

export type Service = (typeof services)[number];

export const projects = [
  {
    slug: "terra",
    name: "Terra",
    kind: "E-commerce for an organic skincare brand",
    sector: "E-commerce · Skincare",
    image: "/images/project-terra.jpg",
    alt: "Terra skincare online store homepage with cream and sage tones",
    summary:
      "An online store for an organic skincare brand: a calm editorial look, a fast catalog, and a checkout that stays out of the way.",
    brief:
      "Terra needed a store that felt as considered as its ingredients: quiet, warm, and easy to browse on a phone. The existing template store buried products under generic layouts and slowed down at every step.",
    work: "We designed the brand's online home around its photography, built a custom storefront with a fast product catalog, and set up payments, shipping, and analytics. Product pages lead with imagery and short, honest copy so buying feels effortless.",
    deliverables: [
      "Store design",
      "Custom storefront",
      "Payments & shipping setup",
      "Analytics",
    ],
    stack: ["Next.js", "Headless commerce", "Stripe"],
  },
  {
    slug: "atlas-kitchen",
    name: "Atlas Kitchen",
    kind: "Website & reservations for a Mediterranean restaurant",
    sector: "Hospitality · Restaurant",
    image: "/images/project-atlas.jpg",
    alt: "Atlas Kitchen restaurant website with dark olive design and food photography",
    summary:
      "A website and reservation flow for a Mediterranean restaurant: menu, private dining, and table booking in one place.",
    brief:
      "Atlas Kitchen relied on phone calls and third-party apps for bookings, losing margin and control over its own guest experience. The food photography deserved better than a listing page.",
    work: "We built a site that puts the kitchen's photography first, with an online reservation flow the staff manage themselves. The menu is structured content, so updates take minutes, and local search was part of the build from day one.",
    deliverables: [
      "Website design",
      "Online reservations",
      "Menu management",
      "Local SEO",
    ],
    stack: ["Next.js", "Headless CMS", "Booking integration"],
  },
  {
    slug: "sanad",
    name: "Sanad",
    kind: "Mobile banking app, iOS & Android",
    sector: "Fintech · Mobile app",
    image: "/images/project-sanad.jpg",
    alt: "Sanad banking app shown on two phone mockups",
    summary:
      "A mobile banking app for iOS and Android: accounts, spending analytics, and transfers in a clean, trustworthy interface.",
    brief:
      "Sanad set out to make everyday banking feel legible: balances, spending, and transfers without the clutter that makes financial apps stressful to open.",
    work: "We designed the product from first flows to final screens, built the app for iOS and Android from one codebase, and shipped a design system so the team can extend it consistently. Charts and categories make spending readable at a glance.",
    deliverables: [
      "Product design",
      "iOS & Android app",
      "Design system",
      "App store launch",
    ],
    stack: ["React Native", "TypeScript", "Design tokens"],
  },
  {
    slug: "dar-nour",
    name: "Dar Nour",
    kind: "Booking site for a boutique riad",
    sector: "Hospitality · Travel",
    image: "/images/project-darnour.jpg",
    alt: "Dar Nour riad booking website with a sunlit courtyard photograph",
    summary:
      "A booking site for a boutique riad, pairing warm courtyard photography with a direct booking flow that avoids platform commissions.",
    brief:
      "Dar Nour depended on booking platforms for most reservations, paying commission on every stay. Guests searching for the riad by name landed on third-party listings instead of the house itself.",
    work: "We built a direct booking site around the riad's courtyard photography, with availability, dates, and payment handled on the spot. Search foundations and structured data make the riad's own site the first result for its name.",
    deliverables: [
      "Website design",
      "Direct booking engine",
      "SEO foundations",
      "Structured data",
    ],
    stack: ["Next.js", "Headless CMS", "Payment integration"],
  },
];

export type Project = (typeof projects)[number];

export const faqs = [
  {
    q: "How long does a typical website take?",
    a: "Most marketing sites take four to eight weeks from kickoff to launch. Web apps and e-commerce stores depend on scope; we agree on a timeline before work starts.",
  },
  {
    q: "How do you price projects?",
    a: "Fixed price per project, agreed upfront after we understand the scope. No hourly billing surprises.",
  },
  {
    q: "Do you work with clients remotely?",
    a: "Yes. Projects run over email and video calls, with shared previews at every stage so you always see progress.",
  },
  {
    q: "Can you take over an existing website?",
    a: "Yes. We audit what exists, keep what works, and improve or rebuild the rest.",
  },
  {
    q: "What happens after launch?",
    a: "You can hand it fully over to your team, or keep us on for maintenance, SEO, and marketing. Both are fine.",
  },
];
