import { PageHero } from "@/components/page/page-hero";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { resources } from "@/lib/static-content";

export default function PatientResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Patient Resources"
        title="Helpful details before and after a visit"
        description="This resource shell gives patients a clear place to find practical information before richer CMS content is added."
      />
      <Section>
        <div className="grid gap-5 md:grid-cols-3">
          {resources.map((resource) => (
            <Card key={resource.title}>
              <h2 className="text-xl font-semibold text-slate-950">
                {resource.title}
              </h2>
              <p className="mt-3 leading-7 text-slate-600">{resource.text}</p>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
