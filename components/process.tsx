import {
  ChatsCircle,
  PencilRuler,
  Code,
  RocketLaunch,
} from "@phosphor-icons/react/dist/ssr";

const steps = [
  {
    icon: ChatsCircle,
    title: "Listen",
    body: "We start with your goals, audience, and constraints before touching a screen.",
  },
  {
    icon: PencilRuler,
    title: "Design",
    body: "Wireframes first, then polished designs you review and approve.",
  },
  {
    icon: Code,
    title: "Build",
    body: "Clean, tested code with regular previews so nothing is a surprise.",
  },
  {
    icon: RocketLaunch,
    title: "Launch & grow",
    body: "We ship, then stay on for SEO, marketing, and improvements.",
  },
];

export function Process() {
  return (
    <section id="process" className="mx-auto max-w-[1400px] px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="font-display text-3xl font-medium tracking-tight md:text-5xl">
          How a project unfolds
        </h2>
        <p className="mt-4 text-base leading-relaxed text-moss">
          Four steps, clear check-ins, no surprises along the way.
        </p>
      </div>

      <ol className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => (
          <li
            key={step.title}
            className="flex flex-col gap-5 rounded-3xl bg-cream-deep/70 p-7"
          >
            <span className="flex size-11 items-center justify-center rounded-full bg-forest text-cream">
              <step.icon size={22} weight="regular" />
            </span>
            <div>
              <h3 className="font-display text-lg font-medium tracking-tight">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-moss">
                {step.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
