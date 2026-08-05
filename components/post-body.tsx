import Image from "next/image";
import Link from "next/link";
import type { PostBlock } from "@/lib/blog";

/**
 * Renders inline [label](url) links inside block text.
 * Internal URLs use <Link>, external ones a plain anchor.
 */
function InlineText({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((part, i) => {
        const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (!match) return <span key={i}>{part}</span>;
        const [, label, href] = match;
        const className = "font-medium text-forest underline underline-offset-4";
        return href.startsWith("/") ? (
          <Link key={i} href={href} className={className}>
            {label}
          </Link>
        ) : (
          <a key={i} href={href} className={className}>
            {label}
          </a>
        );
      })}
    </>
  );
}

export function PostBody({ blocks }: { blocks: PostBlock[] }) {
  return (
    <div className="flex flex-col gap-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "heading":
            return (
              <h2
                key={i}
                className="mt-4 font-display text-2xl font-medium tracking-tight md:text-3xl"
              >
                {block.text}
              </h2>
            );
          case "paragraph":
            return (
              <p key={i} className="text-base leading-relaxed text-moss">
                <InlineText text={block.text} />
              </p>
            );
          case "list":
            return (
              <ul key={i} className="flex flex-col gap-3 pl-5">
                {block.items.map((item) => (
                  <li
                    key={item}
                    className="list-disc text-base leading-relaxed text-moss marker:text-forest"
                  >
                    <InlineText text={item} />
                  </li>
                ))}
              </ul>
            );
          case "quote":
            return (
              <blockquote
                key={i}
                className="my-2 rounded-3xl bg-sage px-8 py-7 font-display text-xl font-medium leading-snug tracking-tight text-forest md:text-2xl"
              >
                {block.text}
              </blockquote>
            );
          case "image":
            return (
              <figure key={i} className="my-2">
                <div className="relative aspect-[16/9] overflow-hidden rounded-3xl bg-cream-deep">
                  <Image
                    src={block.src}
                    alt={block.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 720px"
                    className="object-cover"
                  />
                </div>
                {block.caption && (
                  <figcaption className="mt-3 text-sm text-moss">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );
        }
      })}
    </div>
  );
}
