import { faqs } from "@/lib/content";

export function Faq() {
  return (
    <section id="faq" className="bg-cream-deep/60">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-5 py-24 md:grid-cols-12 md:px-8 md:py-32">
        <div className="md:col-span-5">
          <h2 className="font-display text-3xl font-medium tracking-tight md:text-5xl">
            Everything you need to know
          </h2>
        </div>
        <div className="md:col-span-7">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group border-b border-ink/10 py-2"
            >
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
      </div>
    </section>
  );
}
