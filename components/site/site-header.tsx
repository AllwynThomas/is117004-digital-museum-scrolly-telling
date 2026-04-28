"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_SECTIONS = [
  { id: "hero", label: "Hero" },
  { id: "how-it-works", label: "How It Works" },
  { id: "benefits", label: "Benefits" },
  { id: "safety", label: "Safety" },
  { id: "fuel-cycle", label: "Fuel Cycle" },
  { id: "future-demand", label: "Future Demand" },
  { id: "timeline", label: "Timeline" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isPresentationRoute = pathname === "/";

  useEffect(() => {
    if (isPresentationRoute) {
      return;
    }

    const sectionElements = NAV_SECTIONS.map(({ id }) =>
      document.getElementById(id),
    ).filter(Boolean) as HTMLElement[];

    if (sectionElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-80px 0px -60% 0px",
        threshold: 0,
      },
    );

    sectionElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [isPresentationRoute]);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  // Close menu on Escape key
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMobileMenu();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen, closeMobileMenu]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40",
        "bg-[var(--color-bg-primary)] border-b border-[var(--color-surface-rule)]",
      )}
    >
      <div
        className="mx-auto flex items-center justify-between"
        style={{
          maxWidth: "var(--grid-max-width)",
          padding: "var(--space-3) var(--space-6)",
        }}
      >
        <Link
          href="/"
          className="font-bold text-[var(--color-text-primary)] no-underline"
          style={{ fontSize: "var(--font-size-sub)", letterSpacing: "-0.02em" }}
        >
          Nuclear Energy Museum
        </Link>

        {/* Desktop navigation */}
        {!isPresentationRoute && (
          <nav aria-label="Exhibit sections" className="hidden md:flex gap-1">
            {NAV_SECTIONS.map(({ id, label }) => (
              <Link
                key={id}
                href={`#${id}`}
                className={cn(
                  "no-underline rounded px-3 py-1.5 transition-colors",
                  "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]",
                  activeSection === id &&
                    "text-[var(--color-accent-blue)] font-semibold",
                )}
                style={{ fontSize: "var(--font-size-caption)" }}
              >
                {label}
              </Link>
            ))}
          </nav>
        )}

        {/* Mobile hamburger button */}
        {!isPresentationRoute && (
          <button
            type="button"
            className={cn(
              "md:hidden flex items-center justify-center",
              "w-10 h-10 rounded",
              "text-[var(--color-text-primary)]",
              "bg-transparent border-none cursor-pointer",
            )}
            onClick={toggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav-menu"
            aria-label={
              isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
          >
            {isMobileMenuOpen ? (
              <X size={24} aria-hidden="true" />
            ) : (
              <Menu size={24} aria-hidden="true" />
            )}
          </button>
        )}
      </div>

      {/* Mobile navigation overlay */}
      {!isPresentationRoute && (
        <nav
          id="mobile-nav-menu"
          aria-label="Exhibit sections"
          className={cn(
            "md:hidden",
            "bg-[var(--color-bg-primary)] border-t border-[var(--color-surface-rule)]",
            !isMobileMenuOpen && "hidden",
          )}
        >
          <ul className="list-none m-0 p-0">
            {NAV_SECTIONS.map(({ id, label }) => (
              <li key={id}>
                <Link
                  href={`#${id}`}
                  onClick={closeMobileMenu}
                  className={cn(
                    "block no-underline",
                    "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]",
                    "border-b border-[var(--color-surface-rule)]",
                    activeSection === id &&
                      "text-[var(--color-accent-blue)] font-semibold",
                  )}
                  style={{
                    padding: "var(--space-4) var(--space-6)",
                    fontSize: "var(--font-size-body)",
                  }}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
