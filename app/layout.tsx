import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist } from "next/font/google";
import { siteDescription, siteName, siteUrl } from "@/lib/content";
import { structuredData } from "@/lib/structured-data";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Rawafid | Web agency for design, development & growth",
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "web agency",
    "web design",
    "web development",
    "mobile apps",
    "e-commerce",
    "SEO",
    "digital marketing",
    "web agency Asia",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    locale: "en_US",
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
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children, modal }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${bricolage.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
        {modal}
      </body>
    </html>
  );
}
