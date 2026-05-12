import Link from "next/link";
import { Container } from "@/components/ui/container";
import { navItems, siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white">
      <Container className="grid gap-10 py-10 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <p className="text-lg font-bold">{siteConfig.name}</p>
          <p className="mt-3 max-w-sm text-sm leading-6 text-slate-300">
            Thoughtful fictional clinic content for a modern healthcare website
            built one milestone at a time.
          </p>
        </div>
        <div>
          <p className="font-semibold">Visit</p>
          <address className="mt-3 text-sm not-italic leading-6 text-slate-300">
            {siteConfig.address}
            <br />
            {siteConfig.phone}
            <br />
            {siteConfig.email}
          </address>
        </div>
        <div>
          <p className="font-semibold">Explore</p>
          <ul className="mt-3 grid gap-2 text-sm text-slate-300">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link className="transition hover:text-white" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
