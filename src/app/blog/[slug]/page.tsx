import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RichTextRenderer } from "@/components/content/rich-text-renderer";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import {
  getArticleBySlug,
  getArticleSlugs,
} from "@/lib/contentful";
import { buildMetadataFromSeo } from "@/lib/metadata";
import { createArticleJsonLd, createBreadcrumbJsonLd } from "@/lib/schema";

type ArticlePageProps = Readonly<{
  params: Promise<{
    slug: string;
  }>;
}>;

export async function generateStaticParams() {
  const slugs = await getArticleSlugs();

  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    ...buildMetadataFromSeo(article.seo),
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <>
      <JsonLd
        data={[
          createArticleJsonLd(article),
          createBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Articles", path: "/blog" },
            { name: article.title, path: `/blog/${article.slug}` },
          ]),
        ]}
      />
      <section className="bg-teal-50 py-16 sm:py-20">
        <Container>
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase text-teal-700">
              Article
            </p>
            <h1 className="mt-5 text-4xl font-bold text-slate-950 sm:text-5xl">
              {article.title}
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-700">
              {article.excerpt}
            </p>
            <p className="mt-5 text-sm font-medium text-slate-600">
              {formatDisplayDate(article.publishedDate)}
              {article.authorName ? ` by ${article.authorName}` : ""}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact">Request Appointment</Button>
              <Button href="/blog" variant="secondary">
                All Articles
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <article className="mx-auto max-w-3xl">
          <RichTextRenderer document={article.body} />
        </article>
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
