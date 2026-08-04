"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const services = [
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

export function Services() {
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const barRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeRef = useRef(0);
  // Lets item clicks jump the scroll position while the section is pinned.
  const seekRef = useRef<((index: number) => void) | null>(null);

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled || !sectionRef.current) return;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        // Pinned scrub only on desktop, and only when motion is allowed.
        mm.add(
          "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
          () => {
            const st = ScrollTrigger.create({
              trigger: sectionRef.current,
              start: "top top",
              end: () => `+=${services.length * window.innerHeight * 0.6}`,
              pin: true,
              scrub: true,
              invalidateOnRefresh: true,
              onToggle: (self) => setPinned(self.isActive),
              onUpdate: (self) => {
                const p = self.progress * services.length;
                const idx = Math.min(Math.floor(p), services.length - 1);
                if (idx !== activeRef.current) {
                  activeRef.current = idx;
                  setActive(idx);
                }
                // Drive the bars directly; no React re-render per frame.
                barRefs.current.forEach((bar, i) => {
                  if (!bar) return;
                  const fill = Math.min(Math.max(p - i, 0), 1);
                  bar.style.transform = `scaleX(${fill})`;
                });
              },
            });

            seekRef.current = (index: number) => {
              const y =
                st.start +
                ((index + 0.5) / services.length) * (st.end - st.start);
              window.scrollTo({ top: y, behavior: "smooth" });
            };

            return () => {
              seekRef.current = null;
              setPinned(false);
            };
          }
        );
      }, sectionRef);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  const handleSelect = (i: number) => {
    if (seekRef.current && pinned) {
      seekRef.current(i);
    } else {
      activeRef.current = i;
      setActive(i);
    }
  };

  const current = services[active];

  return (
    <section id="services" ref={sectionRef} className="bg-cream-deep/60">
      <div className="mx-auto flex min-h-0 max-w-[1400px] flex-col justify-center px-5 py-24 md:min-h-[100dvh] md:px-8 md:py-0">
        <h2 className="max-w-xl font-display text-3xl font-medium tracking-tight md:text-5xl">
          What we can build together
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
          {/* Scroll-driven list */}
          <div>
            {services.map((service, i) => {
              const isActive = active === i;
              return (
                <div key={service.title} className="relative">
                  {/* Per-item progress bar: track + scroll-driven fill */}
                  <div className="absolute inset-x-0 top-0 h-px bg-ink/10">
                    <div
                      ref={(el) => {
                        barRefs.current[i] = el;
                      }}
                      className="h-full origin-left bg-forest"
                      style={{ transform: `scaleX(${isActive ? 1 : 0})` }}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSelect(i)}
                    aria-expanded={isActive}
                    className="flex w-full items-center gap-5 py-6 text-left"
                  >
                    <span
                      className={`font-display text-sm transition-colors ${
                        isActive ? "text-forest" : "text-moss/60"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`font-display text-xl font-medium tracking-tight transition-colors md:text-2xl ${
                        isActive ? "text-ink" : "text-moss hover:text-ink"
                      }`}
                    >
                      {service.title}
                    </span>
                  </button>

                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ${
                      isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-md pb-6 pl-9 text-sm leading-relaxed text-moss">
                        {service.body}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active service detail card */}
          <div className="relative overflow-hidden rounded-3xl bg-forest-deep">
            <Image
              src="/images/studio.jpg"
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover opacity-25"
            />
            <div
              key={active}
              className="detail-swap relative flex h-full min-h-96 flex-col justify-between gap-12 p-8 md:p-10"
            >
              <h3 className="font-display text-2xl font-medium tracking-tight text-cream md:text-3xl">
                {current.title}
              </h3>
              <ul className="flex flex-col gap-3">
                {current.points.map((point) => (
                  <li
                    key={point}
                    className="w-fit rounded-full border border-cream/25 px-4 py-2 text-sm text-cream/90"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
