import { PageHero } from "@/components/page/page-hero";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { services } from "@/lib/static-content";

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Care options with clear next steps"
        description="This static services page previews how future Contentful service entries will be organized for easy browsing."
      />
      <Section>
        <div className="grid gap-5 md:grid-cols-3">
          {services.map((service) => (
            <Card key={service.title}>
              <h2 className="text-xl font-semibold text-slate-950">
                {service.title}
              </h2>
              <p className="mt-3 leading-7 text-slate-600">{service.text}</p>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
