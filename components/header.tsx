import Link from "next/link";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#process", label: "Process" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex h-18 max-w-[1400px] items-center justify-between px-5 md:px-8">
        <Link
          href="/"
          className="font-display text-xl font-semibold tracking-tight text-cream"
        >
          rawafid<span className="text-sage">.tech</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-sm text-cream/80 transition-colors hover:text-cream after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-cream after:transition-transform after:duration-300 after:ease-out hover:after:origin-left hover:after:scale-x-100"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="mailto:hello@rawafid.tech"
          className="rounded-full bg-cream px-5 py-2.5 text-sm font-medium text-ink transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
        >
          Start a project
        </a>
      </div>
    </header>
  );
}
