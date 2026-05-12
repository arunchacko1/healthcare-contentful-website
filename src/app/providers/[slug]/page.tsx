import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/json-ld";
import { ProviderAvatar } from "@/components/providers/provider-avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import {
  getProviderBySlug,
  getProviderSlugs,
} from "@/lib/contentful";
import { buildMetadataFromSeo } from "@/lib/metadata";
import { createBreadcrumbJsonLd, createProviderJsonLd } from "@/lib/schema";

type ProviderPageProps = Readonly<{
  params: Promise<{
    slug: string;
  }>;
}>;

export async function generateStaticParams() {
  const slugs = await getProviderSlugs();

  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProviderPageProps): Promise<Metadata> {
  const { slug } = await params;
  const provider = await getProviderBySlug(slug);

  if (!provider) {
    return {
      title: "Provider Not Found",
    };
  }

  return {
    ...buildMetadataFromSeo(provider.seo),
  };
}

export default async function ProviderProfilePage({
  params,
}: ProviderPageProps) {
  const { slug } = await params;
  const provider = await getProviderBySlug(slug);

  if (!provider) {
    notFound();
  }

  return (
    <>
      <JsonLd
        data={[
          createProviderJsonLd(provider),
          createBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Providers", path: "/providers" },
            { name: provider.name, path: `/providers/${provider.slug}` },
          ]),
        ]}
      />
      <section className="bg-teal-50 py-16 sm:py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[auto_1fr] lg:items-center">
            <ProviderAvatar
              image={provider.image}
              name={provider.name}
              size="large"
            />
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase text-teal-700">
                Provider
              </p>
              <h1 className="mt-5 text-4xl font-bold text-slate-950 sm:text-5xl">
                {provider.name}
              </h1>
              <p className="mt-3 text-lg font-medium text-teal-800">
                {provider.role}
              </p>
              <p className="mt-5 text-lg leading-8 text-slate-700">
                {provider.summary}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/contact">Request Appointment</Button>
                <Button href="/providers" variant="secondary">
                  All Providers
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className="text-2xl font-bold text-slate-950">
              About {provider.name}
            </h2>
            <div className="mt-5 grid gap-4 text-base leading-7 text-slate-600">
              {provider.bioBlocks.map((block) => (
                <p key={block}>{block}</p>
              ))}
            </div>
          </div>
          <Card>
            <h2 className="text-xl font-semibold text-slate-950">
              Specialties
            </h2>
            {provider.specialties.length > 0 ? (
              <ul className="mt-4 grid gap-3 text-slate-600">
                {provider.specialties.map((specialty) => (
                  <li className="flex gap-3" key={specialty}>
                    <span aria-hidden="true" className="text-teal-700">
                      +
                    </span>
                    <span>{specialty}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 leading-7 text-slate-600">
                Specialties can be added in Contentful.
              </p>
            )}
          </Card>
        </div>
      </Section>
    </>
  );
}
