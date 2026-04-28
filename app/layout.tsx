import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { cn } from "@/lib/utils";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700", "800"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Nuclear Energy: A Digital Museum Exhibit",
  description:
    "Explore how nuclear reactors generate electricity, compare safety and emissions data across energy sources, and discover why nuclear power is critical to meeting rising demand from AI and the modern grid.",
  openGraph: {
    title: "Nuclear Energy: A Digital Museum Exhibit",
    description:
      "Explore how nuclear reactors generate electricity, compare safety and emissions data across energy sources, and discover why nuclear power is critical to meeting rising demand from AI and the modern grid.",
    images: ["/assets/images/uranium_vs_fossil_fuels_diagram.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.variable)}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-[var(--color-bg-primary)] focus:text-[var(--color-accent-blue)] focus:underline"
        >
          Skip to main content
        </a>
        <div className="site-frame">
          <SiteHeader />
          {children}
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
