import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const siteUrl = "https://rawafid.tech";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Rawafid | Web agency for design, development & growth",
    template: "%s | Rawafid",
  },
  description:
    "Rawafid is a web agency building websites, mobile apps, and e-commerce stores, backed by SEO and digital marketing that helps them get found.",
  keywords: [
    "web agency",
    "web design",
    "web development",
    "mobile apps",
    "e-commerce",
    "SEO",
    "digital marketing",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Rawafid",
    title: "Rawafid | Web agency for design, development & growth",
    description:
      "Websites, mobile apps, and e-commerce stores, built carefully and backed by SEO and digital marketing.",
    images: [
      {
        url: "/images/hero.jpg",
        width: 1200,
        height: 675,
        alt: "A designer working at a sunlit studio desk",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rawafid | Web agency for design, development & growth",
    description:
      "Websites, mobile apps, and e-commerce stores, built carefully and backed by SEO and digital marketing.",
    images: ["/images/hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Rawafid",
  url: siteUrl,
  email: "hello@rawafid.tech",
  description:
    "Web agency building websites, mobile apps, and e-commerce stores, backed by SEO and digital marketing.",
  knowsAbout: [
    "Web design",
    "Web development",
    "Mobile app development",
    "E-commerce",
    "SEO",
    "Digital marketing",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${bricolage.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
