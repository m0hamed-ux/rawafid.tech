import Link from "next/link";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/#process", label: "Process" },
  { href: "/#faq", label: "FAQ" },
];

/**
 * "overlay" sits on top of the hero photograph (cream text, absolute).
 * "solid" is for regular pages on the cream background (ink text, in flow).
 */
export function Header({
  variant = "overlay",
}: {
  variant?: "overlay" | "solid";
}) {
  const overlay = variant === "overlay";

  return (
    <header
      className={overlay ? "absolute inset-x-0 top-0 z-20" : "relative z-20"}
    >
      <div className="mx-auto flex h-18 max-w-[1400px] items-center justify-between px-5 md:px-8">
        <Link
          href="/"
          className={`font-display text-xl font-semibold tracking-tight ${
            overlay ? "text-cream" : "text-ink"
          }`}
        >
          rawafid<span className={overlay ? "text-sage" : "text-forest"}>.tech</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative text-sm transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:transition-transform after:duration-300 after:ease-out hover:after:origin-left hover:after:scale-x-100 ${
                overlay
                  ? "text-cream/80 hover:text-cream after:bg-cream"
                  : "text-ink/70 hover:text-ink after:bg-ink"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <a
          href="mailto:hello@rawafid.tech"
          className={`rounded-full px-5 py-2.5 text-sm font-medium transition-transform hover:-translate-y-0.5 active:scale-[0.98] ${
            overlay ? "bg-cream text-ink" : "bg-forest text-cream"
          }`}
        >
          Start a project
        </a>
      </div>
    </header>
  );
}
