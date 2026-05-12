import Link from "next/link";
import type { Metadata } from "next";
import { RichTextRenderer } from "@/components/content/rich-text-renderer";
import { PageHero } from "@/components/page/page-hero";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { getArticles, getPatientResourcesPage } from "@/lib/contentful";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPatientResourcesPage();

  return {
    title: page.seo.title,
    description: page.seo.description,
    robots: page.seo.noIndex ? { index: false, follow: false } : undefined,
    alternates: {
      canonical: page.seo.canonicalPath,
    },
  };
}

export default async function PatientResourcesPage() {
  const page = await getPatientResourcesPage();
  const articles = await getArticles();
  const isUsingFallback =
    page.source === "fallback" ||
    articles.some((article) => article.source === "fallback");

  return (
    <>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.heroTitle}
        description={page.heroText}
      />
      <Section>
        {isUsingFallback ? (
          <p className="mb-6 rounded-md bg-teal-50 p-3 text-sm leading-6 text-teal-900">
            Showing safe starter resources until Contentful page and article
            entries are available.
          </p>
        ) : null}
        <div className="mb-10 max-w-3xl">
          <RichTextRenderer document={page.body} />
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {articles.slice(0, 3).map((article) => (
            <Card key={article.slug}>
              <p className="text-sm font-medium text-teal-800">
                Resource article
              </p>
              <h2 className="text-xl font-semibold text-slate-950">
                {article.title}
              </h2>
              <p className="mt-3 leading-7 text-slate-600">
                {article.excerpt}
              </p>
              <Link
                className="mt-5 inline-flex font-semibold text-teal-800 transition hover:text-teal-950"
                href={`/blog/${article.slug}`}
              >
                Read article
              </Link>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
