const faqs = [
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
