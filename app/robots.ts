import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/content";

/**
 * Everything is crawlable. AI assistants and the search engines that matter
 * in Asian markets are listed explicitly so the intent is unambiguous, even
 * though the wildcard rule already covers them.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        // AI assistants & answer engines
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-User",
          "Claude-SearchBot",
          "PerplexityBot",
          "Perplexity-User",
          "Google-Extended",
          "Applebot-Extended",
          "meta-externalagent",
          "Amazonbot",
          "CCBot",
          "Bytespider",
        ],
        allow: "/",
      },
      {
        // Search engines with strong presence in Asian markets
        userAgent: [
          "Baiduspider",
          "Yeti",
          "Daumoa",
          "Sogou web spider",
          "360Spider",
          "coccocbot-web",
          "YandexBot",
        ],
        allow: "/",
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
