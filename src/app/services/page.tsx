import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/page/page-hero";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { getServices } from "@/lib/contentful";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore fictional clinic services prepared for Contentful-driven service pages.",
};

export default async function ServicesPage() {
  const services = await getServices();
  const isUsingFallback = services.some((service) => service.source === "fallback");

  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Care options with clear next steps"
        description="Explore CMS-ready service summaries with clear paths to individual service details."
      />
      <Section>
        {isUsingFallback ? (
          <p className="mb-6 rounded-md bg-teal-50 p-3 text-sm leading-6 text-teal-900">
            Showing safe starter services until Contentful service entries are
            available.
          </p>
        ) : null}
        <div className="grid gap-5 md:grid-cols-3">
          {services.map((service) => (
            <Card key={service.title}>
              <h2 className="text-xl font-semibold text-slate-950">
                {service.title}
              </h2>
              <p className="mt-3 leading-7 text-slate-600">
                {service.summary}
              </p>
              <Link
                className="mt-5 inline-flex font-semibold text-teal-800 transition hover:text-teal-950"
                href={`/services/${service.slug}`}
              >
                View details
              </Link>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
