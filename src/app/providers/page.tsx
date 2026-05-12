import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/page/page-hero";
import { ProviderAvatar } from "@/components/providers/provider-avatar";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { getProviders } from "@/lib/contentful";

export const metadata: Metadata = {
  title: "Providers",
  description:
    "Meet the fictional care team at Everwell Family Clinic.",
};

export default async function ProvidersPage() {
  const providers = await getProviders();
  const isUsingFallback = providers.some((provider) => provider.source === "fallback");

  return (
    <>
      <PageHero
        eyebrow="Providers"
        title="Meet the fictional care team"
        description="Browse CMS-ready provider profiles with clear roles, specialties, and care team introductions."
      />
      <Section>
        {isUsingFallback ? (
          <p className="mb-6 rounded-md bg-teal-50 p-3 text-sm leading-6 text-teal-900">
            Showing safe starter provider profiles until Contentful provider
            entries are available.
          </p>
        ) : null}
        <div className="grid gap-5 md:grid-cols-3">
          {providers.map((provider) => (
            <Card key={provider.slug}>
              <div className="mb-5">
                <ProviderAvatar image={provider.image} name={provider.name} />
              </div>
              <h2 className="text-xl font-semibold text-slate-950">
                {provider.name}
              </h2>
              <p className="mt-1 font-medium text-teal-800">{provider.role}</p>
              <p className="mt-3 leading-7 text-slate-600">
                {provider.summary}
              </p>
              <Link
                className="mt-5 inline-flex font-semibold text-teal-800 transition hover:text-teal-950"
                href={`/providers/${provider.slug}`}
              >
                View profile
              </Link>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
