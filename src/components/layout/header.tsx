"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { navItems, siteConfig } from "@/lib/site";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b border-slate-200 bg-white">
      <Container className="flex flex-col gap-5 py-5 lg:flex-row lg:items-center lg:justify-between">
        <Link
          className="rounded-sm text-xl font-bold text-slate-950"
          href="/"
          aria-label={`${siteConfig.name} home`}
        >
          {siteConfig.name}
        </Link>
        <nav aria-label="Main navigation">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm font-medium text-slate-700">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  aria-current={isCurrentPath(pathname, item.href) ? "page" : undefined}
                  className="rounded-sm transition hover:text-teal-800 aria-[current=page]:font-bold aria-[current=page]:text-teal-800"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Button href="/contact">Request Appointment</Button>
      </Container>
    </header>
  );
}

function isCurrentPath(pathname: string, href: string) {
  return href === "/" ? pathname === href : pathname.startsWith(href);
}
