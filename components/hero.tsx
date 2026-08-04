import Image from "next/image";

export function Hero() {
  return (
    <section className="relative flex min-h-[100dvh] flex-col justify-end overflow-hidden">
      <Image
        src="/images/hero.gif"
        alt="A designer working at a sunlit studio desk surrounded by olive trees"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Scrims: top keeps the header legible, bottom keeps the headline readable */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-forest-deep/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-forest-deep/25 to-transparent" />

      <div className="relative mx-auto w-full max-w-[1400px] px-5 pb-16 md:px-8 md:pb-20">
        <div className="max-w-2xl">
          <h1
            className="rise font-display text-4xl font-medium leading-[1.05] tracking-tight text-cream md:text-6xl"
            style={{ "--rise-delay": "0.1s" } as React.CSSProperties}
          >
            Digital products, designed with care and built to last.
          </h1>
          <p
            className="rise mt-5 max-w-md text-base leading-relaxed text-cream/85"
            style={{ "--rise-delay": "0.25s" } as React.CSSProperties}
          >
            Rawafid is a web agency crafting websites, apps, and stores that
            grow with your business.
          </p>
          <div
            className="rise mt-8"
            style={{ "--rise-delay": "0.4s" } as React.CSSProperties}
          >
            <a
              href="mailto:hello@rawafid.tech"
              className="inline-block rounded-full bg-cream px-7 py-3.5 text-sm font-medium text-ink transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Start a project
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
