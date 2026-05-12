import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import {
  getServiceBySlug,
  getServiceSlugs,
} from "@/lib/contentful";
import { buildMetadataFromSeo } from "@/lib/metadata";
import { createBreadcrumbJsonLd, createServiceJsonLd } from "@/lib/schema";

type ServicePageProps = Readonly<{
  params: Promise<{
    slug: string;
  }>;
}>;

export async function generateStaticParams() {
  const slugs = await getServiceSlugs();

  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    ...buildMetadataFromSeo(service.seo),
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <JsonLd
        data={[
          createServiceJsonLd(service),
          createBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.title, path: `/services/${service.slug}` },
          ]),
        ]}
      />
      <section className="bg-teal-50 py-16 sm:py-20">
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase text-teal-700">
              Service
            </p>
            <h1 className="mt-5 text-4xl font-bold text-slate-950 sm:text-5xl">
              {service.title}
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-700">
              {service.summary}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact">Request Appointment</Button>
              <Button href="/services" variant="secondary">
                All Services
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="prose prose-slate max-w-none">
            <h2 className="text-2xl font-bold text-slate-950">
              About this service
            </h2>
            <div className="mt-5 grid gap-4 text-base leading-7 text-slate-600">
              {service.detailBlocks.map((block) => (
                <p key={block}>{block}</p>
              ))}
            </div>
          </div>
          <Card>
            <h2 className="text-xl font-semibold text-slate-950">
              Care highlights
            </h2>
            {service.careHighlights.length > 0 ? (
              <ul className="mt-4 grid gap-3 text-slate-600">
                {service.careHighlights.map((highlight) => (
                  <li className="flex gap-3" key={highlight}>
                    <span aria-hidden="true" className="text-teal-700">
                      +
                    </span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 leading-7 text-slate-600">
                Additional care highlights can be added in Contentful.
              </p>
            )}
          </Card>
        </div>
      </Section>
    </>
  );
}
