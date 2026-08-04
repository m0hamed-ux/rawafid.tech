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
    title: "Web design & development",
    body: "Custom websites and web apps designed around your goals, built on modern foundations, and fast on every device.",
    points: ["Marketing sites", "Web applications", "Redesigns"],
  },
  {
    title: "Mobile apps",
    body: "iOS and Android apps that feel native, stay maintainable, and ship without drama.",
    points: ["iOS & Android", "Cross-platform builds", "App store launches"],
  },
  {
    title: "E-commerce",
    body: "Online stores where browsing is pleasant and checkout is effortless, from product page to payment.",
    points: ["Custom storefronts", "Shopify builds", "Payment integration"],
  },
  {
    title: "SEO & digital marketing",
    body: "Getting found matters as much as looking good. We handle search, content, and campaigns after launch.",
    points: ["Technical SEO", "Content strategy", "Paid campaigns"],
  },
];

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
