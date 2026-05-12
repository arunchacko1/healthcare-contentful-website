import type { Entry, EntryFieldTypes, EntrySkeletonType } from "contentful";
import { cache } from "react";
import { getContentfulClient } from "@/lib/contentful/client";
import { seoOrFallback, textOrFallback } from "@/lib/contentful/fallbacks";
import type { CmsPage, CmsSeo } from "@/lib/contentful/types";

type PageFields = Readonly<{
  title: EntryFieldTypes.Symbol;
  slug: EntryFieldTypes.Symbol;
  eyebrow?: EntryFieldTypes.Symbol;
  heroTitle: EntryFieldTypes.Symbol;
  heroText: EntryFieldTypes.Text;
  seo?: EntryFieldTypes.EntryLink<SeoSkeleton>;
}>;

type PageSkeleton = EntrySkeletonType<PageFields, "page">;

type SeoFields = Readonly<{
  title: EntryFieldTypes.Symbol;
  description: EntryFieldTypes.Text;
  canonicalPath?: EntryFieldTypes.Symbol;
  noIndex?: EntryFieldTypes.Boolean;
}>;

type SeoSkeleton = EntrySkeletonType<SeoFields, "seoMetadata">;

export type HomePageContent = Readonly<{
  eyebrow: string;
  heroTitle: string;
  heroText: string;
  seo: CmsSeo;
  source: "contentful" | "fallback";
}>;

export const fallbackHomePageContent: HomePageContent = {
  eyebrow: "Fictional family clinic",
  heroTitle: "Thoughtful care, clearly explained.",
  heroText:
    "Everwell Family Clinic is a polished static foundation for a CMS-driven healthcare website, with calm page structure, accessible controls, and reusable React components.",
  seo: seoOrFallback({
    title: "Everwell Family Clinic",
    description:
      "A fictional family clinic offering thoughtful primary care, preventive visits, and patient resources.",
    canonicalPath: "/",
  }),
  source: "fallback",
};

function mapPageEntryToHomeContent(entry: Entry<PageSkeleton>): HomePageContent {
  const cmsPage: Pick<CmsPage, "eyebrow" | "heroTitle" | "heroText" | "seo"> = {
    eyebrow:
      typeof entry.fields.eyebrow === "string" ? entry.fields.eyebrow : undefined,
    heroTitle:
      typeof entry.fields.heroTitle === "string" ? entry.fields.heroTitle : "",
    heroText:
      typeof entry.fields.heroText === "string" ? entry.fields.heroText : "",
    seo: mapSeoEntry(entry.fields.seo, fallbackHomePageContent.seo),
  };

  return {
    eyebrow: textOrFallback(cmsPage.eyebrow, fallbackHomePageContent.eyebrow),
    heroTitle: textOrFallback(
      cmsPage.heroTitle,
      fallbackHomePageContent.heroTitle,
    ),
    heroText: textOrFallback(cmsPage.heroText, fallbackHomePageContent.heroText),
    seo: cmsPage.seo,
    source: "contentful",
  };
}

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

function fieldString(value: unknown) {
  return typeof value === "string" ? value : undefined;
}

function fieldBoolean(value: unknown) {
  return typeof value === "boolean" ? value : undefined;
}

export const getHomePageContent = cache(
  async function getHomePageContent(): Promise<HomePageContent> {
  const client = getContentfulClient();

  if (!client) {
    return fallbackHomePageContent;
  }

  try {
    const response = await client.getEntries<PageSkeleton>({
      content_type: "page",
      "fields.slug": "home",
      include: 2,
      limit: 1,
    });

    const homePageEntry = response.items[0];

    return homePageEntry
      ? mapPageEntryToHomeContent(homePageEntry)
      : fallbackHomePageContent;
  } catch (error) {
    console.error("Unable to load Contentful home page content.", error);
    return fallbackHomePageContent;
  }
},
);
