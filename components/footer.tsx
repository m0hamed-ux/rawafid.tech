import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-forest-deep text-cream">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-8 md:py-28">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="max-w-md font-display text-3xl font-medium tracking-tight md:text-5xl">
              Have a project in mind?
            </h2>
            <Link
              href="/booking"
              className="mt-6 inline-block rounded-full bg-cream px-7 py-3.5 text-sm font-medium text-ink transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Start a project
            </Link>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-cream/70">
            We work remotely with clients across Asia and worldwide. Write to
            us at{" "}
            <a
              href="mailto:hello@rawafid.tech"
              className="text-cream underline underline-offset-4"
            >
              hello@rawafid.tech
            </a>
          </p>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-cream/15 pt-8 text-sm text-cream/60 md:flex-row md:items-center md:justify-between">
          <p className="font-display text-base font-semibold text-cream">
            rawafid<span className="text-sage">.tech</span>
          </p>
          <nav className="flex flex-wrap gap-6">
            {[
              { href: "/services", label: "Services" },
              { href: "/projects", label: "Projects" },
              { href: "/blog", label: "Blog" },
              { href: "/#process", label: "Process" },
              { href: "/#faq", label: "FAQ" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative transition-colors hover:text-cream after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-cream after:transition-transform after:duration-300 after:ease-out hover:after:origin-left hover:after:scale-x-100"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <p>&copy; {new Date().getFullYear()} Rawafid. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
