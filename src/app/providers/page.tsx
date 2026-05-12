import { PageHero } from "@/components/page/page-hero";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { providers } from "@/lib/static-content";

export default function ProvidersPage() {
  return (
    <>
      <PageHero
        eyebrow="Providers"
        title="Meet the fictional care team"
        description="Provider shells are ready for profile photos, specialties, bios, and future Contentful profile entries."
      />
      <Section>
        <div className="grid gap-5 md:grid-cols-3">
          {providers.map((provider) => (
            <Card key={provider.title}>
              <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-teal-100 text-xl font-bold text-teal-800">
                {provider.title
                  .split(" ")
                  .slice(0, 2)
                  .map((part) => part[0])
                  .join("")}
              </div>
              <h2 className="text-xl font-semibold text-slate-950">
                {provider.title}
              </h2>
              <p className="mt-3 leading-7 text-slate-600">{provider.text}</p>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
