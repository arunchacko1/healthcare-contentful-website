import type { Entry, EntryFieldTypes, EntrySkeletonType } from "contentful";
import { getContentfulClient } from "@/lib/contentful/client";
import {
  seoOrFallback,
  slugOrFallback,
  textOrFallback,
} from "@/lib/contentful/fallbacks";
import { richTextToPlainTextBlocks } from "@/lib/contentful/rich-text";
import { createRichTextDocumentFromParagraphs } from "@/lib/contentful/rich-text-document";
import type { CmsRichTextDocument, CmsSeo } from "@/lib/contentful/types";
import { articles as fallbackArticles } from "@/lib/static-content";

type SeoFields = Readonly<{
  title: EntryFieldTypes.Symbol;
  description: EntryFieldTypes.Text;
  canonicalPath?: EntryFieldTypes.Symbol;
  noIndex?: EntryFieldTypes.Boolean;
}>;

type SeoSkeleton = EntrySkeletonType<SeoFields, "seoMetadata">;

type ArticleFields = Readonly<{
  title: EntryFieldTypes.Symbol;
  slug: EntryFieldTypes.Symbol;
  excerpt: EntryFieldTypes.Text;
  publishedDate: EntryFieldTypes.Date;
  authorName?: EntryFieldTypes.Symbol;
  body: EntryFieldTypes.RichText;
  seo?: EntryFieldTypes.EntryLink<SeoSkeleton>;
}>;

type ArticleSkeleton = EntrySkeletonType<ArticleFields, "article">;

export type ArticleContent = Readonly<{
  title: string;
  slug: string;
  excerpt: string;
  publishedDate: string;
  authorName?: string;
  body: CmsRichTextDocument;
  seo: CmsSeo;
  source: "contentful" | "fallback";
}>;

export const fallbackArticleContent: ArticleContent[] = fallbackArticles.map(
  (article) => ({
    title: article.title,
    slug: article.slug,
    excerpt: article.excerpt,
    publishedDate: article.publishedDate,
    authorName: article.authorName,
    body: createRichTextDocumentFromParagraphs(article.bodyBlocks),
    seo: seoOrFallback({
      title: `${article.title} | Everwell Family Clinic`,
      description: article.excerpt,
      canonicalPath: `/blog/${article.slug}`,
    }),
    source: "fallback",
  }),
);

function isSeoEntry(value: unknown): value is Entry<SeoSkeleton> {
  return Boolean(value && typeof value === "object" && "fields" in value);
}

function mapSeoEntry(value: unknown, fallbackSeo: CmsSeo) {
  if (!isSeoEntry(value)) {
    return fallbackSeo;
  }

  return seoOrFallback({
    title: fieldString(value.fields.title) ?? fallbackSeo.title,
    description: fieldString(value.fields.description) ?? fallbackSeo.description,
    canonicalPath:
      fieldString(value.fields.canonicalPath) ?? fallbackSeo.canonicalPath,
    noIndex: fieldBoolean(value.fields.noIndex) ?? fallbackSeo.noIndex,
  });
}

function mapArticleEntry(entry: Entry<ArticleSkeleton>): ArticleContent {
  const title = textOrFallback(fieldString(entry.fields.title), "Article");
  const slug = slugOrFallback(fieldString(entry.fields.slug) ?? title);
  const body = fieldRichText(entry.fields.body);
  const bodyPreview = richTextToPlainTextBlocks(body)[0];
  const excerpt = textOrFallback(
    fieldString(entry.fields.excerpt),
    bodyPreview ?? "Read the latest clinic article.",
  );
  const publishedDate = textOrFallback(
    fieldString(entry.fields.publishedDate),
    new Date().toISOString(),
  );
  const fallbackSeo = seoOrFallback({
    title: `${title} | Everwell Family Clinic`,
    description: excerpt,
    canonicalPath: `/blog/${slug}`,
  });

  return {
    title,
    slug,
    excerpt,
    publishedDate,
    authorName: fieldString(entry.fields.authorName),
    body,
    seo: mapSeoEntry(entry.fields.seo, fallbackSeo),
    source: "contentful",
  };
}

function fieldRichText(value: unknown): CmsRichTextDocument {
  return value && typeof value === "object"
    ? (value as CmsRichTextDocument)
    : createRichTextDocumentFromParagraphs([
        "Article content can be added in Contentful.",
      ]);
}

function fieldString(value: unknown) {
  return typeof value === "string" ? value : undefined;
}

function fieldBoolean(value: unknown) {
  return typeof value === "boolean" ? value : undefined;
}

export async function getArticles(): Promise<ArticleContent[]> {
  const client = getContentfulClient();

  if (!client) {
    return fallbackArticleContent;
  }

  try {
    const response = await client.getEntries<ArticleSkeleton>({
      content_type: "article",
      include: 2,
      limit: 100,
      order: ["-fields.publishedDate"],
    });

    return response.items.length > 0
      ? response.items.map((entry) => mapArticleEntry(entry))
      : fallbackArticleContent;
  } catch (error) {
    console.error("Unable to load Contentful articles.", error);
    return fallbackArticleContent;
  }
}

export async function getArticleBySlug(slug: string) {
  const articles = await getArticles();

  return articles.find((article) => article.slug === slug) ?? null;
}

export async function getArticleSlugs() {
  const articles = await getArticles();

  return articles.map((article) => article.slug);
}
