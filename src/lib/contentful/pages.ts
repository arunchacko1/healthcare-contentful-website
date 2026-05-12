import type { Entry, EntryFieldTypes, EntrySkeletonType } from "contentful";
import { getContentfulClient } from "@/lib/contentful/client";
import { seoOrFallback, textOrFallback } from "@/lib/contentful/fallbacks";
import { createRichTextDocumentFromParagraphs } from "@/lib/contentful/rich-text-document";
import type { CmsRichTextDocument, CmsSeo } from "@/lib/contentful/types";
import { siteConfig } from "@/lib/site";

type SeoFields = Readonly<{
  title: EntryFieldTypes.Symbol;
  description: EntryFieldTypes.Text;
  canonicalPath?: EntryFieldTypes.Symbol;
  noIndex?: EntryFieldTypes.Boolean;
}>;

type SeoSkeleton = EntrySkeletonType<SeoFields, "seoMetadata">;

type PageFields = Readonly<{
  title: EntryFieldTypes.Symbol;
  slug: EntryFieldTypes.Symbol;
  eyebrow?: EntryFieldTypes.Symbol;
  heroTitle: EntryFieldTypes.Symbol;
  heroText: EntryFieldTypes.Text;
  body?: EntryFieldTypes.RichText;
  seo?: EntryFieldTypes.EntryLink<SeoSkeleton>;
}>;

type PageSkeleton = EntrySkeletonType<PageFields, "page">;

export type PageContent = Readonly<{
  title: string;
  slug: string;
  eyebrow: string;
  heroTitle: string;
  heroText: string;
  body: CmsRichTextDocument;
  seo: CmsSeo;
  source: "contentful" | "fallback";
}>;

export const fallbackPatientResourcesPage: PageContent = {
  title: "Patient Resources",
  slug: "patient-resources",
  eyebrow: "Patient Resources",
  heroTitle: "Helpful details before and after a visit",
  heroText:
    "Find practical articles and resource previews that make clinic visits easier to understand.",
  body: createRichTextDocumentFromParagraphs([
    "This landing page is ready for Contentful-managed resource copy and article links.",
  ]),
  seo: seoOrFallback({
    title: "Patient Resources | Everwell Family Clinic",
    description:
      "Helpful fictional clinic resources and articles for patient education.",
    canonicalPath: "/patient-resources",
  }),
  source: "fallback",
};

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

function mapPageEntry(
  entry: Entry<PageSkeleton>,
  fallback: PageContent,
): PageContent {
  const title = textOrFallback(fieldString(entry.fields.title), fallback.title);
  const slug = textOrFallback(fieldString(entry.fields.slug), fallback.slug);
  const heroTitle = textOrFallback(
    fieldString(entry.fields.heroTitle),
    fallback.heroTitle,
  );
  const heroText = textOrFallback(
    fieldString(entry.fields.heroText),
    fallback.heroText,
  );
  const fallbackSeo = seoOrFallback({
    title: `${title} | ${siteConfig.name}`,
    description: heroText,
    canonicalPath: `/${slug}`,
  });

  return {
    title,
    slug,
    eyebrow: textOrFallback(fieldString(entry.fields.eyebrow), fallback.eyebrow),
    heroTitle,
    heroText,
    body: fieldRichText(entry.fields.body) ?? fallback.body,
    seo: mapSeoEntry(entry.fields.seo, fallbackSeo),
    source: "contentful",
  };
}

function fieldRichText(value: unknown) {
  return value && typeof value === "object"
    ? (value as CmsRichTextDocument)
    : undefined;
}

function fieldString(value: unknown) {
  return typeof value === "string" ? value : undefined;
}

function fieldBoolean(value: unknown) {
  return typeof value === "boolean" ? value : undefined;
}

export async function getPageBySlug(slug: string, fallback: PageContent) {
  const client = getContentfulClient();

  if (!client) {
    return fallback;
  }

  try {
    const response = await client.getEntries<PageSkeleton>({
      content_type: "page",
      "fields.slug": slug,
      include: 2,
      limit: 1,
    });

    const page = response.items[0];

    return page ? mapPageEntry(page, fallback) : fallback;
  } catch (error) {
    console.error(`Unable to load Contentful page for slug "${slug}".`, error);
    return fallback;
  }
}

export async function getPatientResourcesPage() {
  return getPageBySlug("patient-resources", fallbackPatientResourcesPage);
}
