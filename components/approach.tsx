import Image from "next/image";

export function Approach() {
  return (
    <section id="approach" className="mx-auto max-w-[1400px] px-5 py-24 md:px-8 md:py-32">
      <h2 className="max-w-xl font-display text-3xl font-medium tracking-tight md:text-5xl">
        A calm way of building for the web
      </h2>

      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-12">
        {/* Studio photograph */}
        <div className="relative min-h-72 overflow-hidden rounded-3xl md:col-span-5 md:row-span-2 md:min-h-0">
          <Image
            src="/images/studio.jpg"
            alt="A bright, plant-filled design studio with wooden desks"
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover"
          />
        </div>

        {/* Principle card */}
        <div className="flex flex-col justify-between gap-10 rounded-3xl bg-forest-deep p-8 text-cream md:col-span-7">
          <p className="font-display text-2xl font-medium leading-snug tracking-tight md:text-3xl">
            &ldquo;Good websites are not loud. They are clear, fast, and honest
            about what they offer.&rdquo;
          </p>
          <p className="text-sm text-cream/70">
            The principle behind everything we ship.
          </p>
        </div>

        {/* Craft card */}
        <div className="grid grid-cols-1 overflow-hidden rounded-3xl bg-cream-deep sm:grid-cols-2 md:col-span-4">
          <div className="relative min-h-48">
            <Image
              src="/images/craft.jpg"
              alt="Hand-drawn website wireframes in a notebook next to a laptop"
              fill
              sizes="(max-width: 768px) 100vw, 20vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center gap-2 p-6">
            <h3 className="font-display text-lg font-medium tracking-tight">
              Sketch first
            </h3>
            <p className="text-sm leading-relaxed text-moss">
              Every project starts on paper, so decisions are cheap to change.
            </p>
          </div>
        </div>

        {/* Partnership card */}
        <div className="flex flex-col justify-between gap-8 rounded-3xl bg-sage p-8 md:col-span-3">
          <h3 className="font-display text-lg font-medium tracking-tight">
            One team, end to end
          </h3>
          <p className="text-sm leading-relaxed text-forest">
            Design, code, and marketing under one roof. No hand-offs, no
            middlemen.
          </p>
        </div>
      </div>
    </section>
  );
}
