import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { navItems, siteConfig } from "@/lib/site";

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <Container className="flex flex-col gap-5 py-5 lg:flex-row lg:items-center lg:justify-between">
        <Link
          className="text-xl font-bold text-slate-950"
          href="/"
          aria-label={`${siteConfig.name} home`}
        >
          {siteConfig.name}
        </Link>
        <nav aria-label="Main navigation">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm font-medium text-slate-700">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link className="transition hover:text-teal-800" href={item.href}>
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
