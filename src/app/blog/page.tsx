import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/page/page-hero";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { getArticles } from "@/lib/contentful";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Articles",
  description: "Read fictional clinic articles prepared for Contentful publishing.",
  canonicalPath: "/blog",
});

export default async function BlogPage() {
  const articles = await getArticles();
  const isUsingFallback = articles.some((article) => article.source === "fallback");

  return (
    <>
      <PageHero
        eyebrow="Articles"
        title="Readable health education previews"
        description="Browse CMS-driven article cards with publishing dates, excerpts, and dynamic detail pages."
      />
      <Section>
        {isUsingFallback ? (
          <p className="mb-6 rounded-md bg-teal-50 p-3 text-sm leading-6 text-teal-900">
            Showing safe starter articles until Contentful article entries are
            available.
          </p>
        ) : null}
        <div className="grid gap-5 md:grid-cols-3">
          {articles.map((article) => (
            <Card key={article.slug}>
              <p className="text-sm font-medium text-teal-800">
                {formatDisplayDate(article.publishedDate)}
              </p>
              <h2 className="mt-3 text-xl font-semibold text-slate-950">
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

function formatDisplayDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeZone: "UTC",
  }).format(new Date(value));
}
