import type { Entry, EntryFieldTypes, EntrySkeletonType } from "contentful";
import { getContentfulClient } from "@/lib/contentful/client";
import { seoOrFallback, textOrFallback } from "@/lib/contentful/fallbacks";
import type { CmsPage } from "@/lib/contentful/types";

type PageFields = Readonly<{
  title: EntryFieldTypes.Symbol;
  slug: EntryFieldTypes.Symbol;
  eyebrow?: EntryFieldTypes.Symbol;
  heroTitle: EntryFieldTypes.Symbol;
  heroText: EntryFieldTypes.Text;
  seo?: EntryFieldTypes.EntryLink<EntrySkeletonType>;
}>;

type PageSkeleton = EntrySkeletonType<PageFields, "page">;

export type HomePageContent = Readonly<{
  eyebrow: string;
  heroTitle: string;
  heroText: string;
  source: "contentful" | "fallback";
}>;

export const fallbackHomePageContent: HomePageContent = {
  eyebrow: "Fictional family clinic",
  heroTitle: "Thoughtful care, clearly explained.",
  heroText:
    "Everwell Family Clinic is a polished static foundation for a CMS-driven healthcare website, with calm page structure, accessible controls, and reusable React components.",
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
    seo: seoOrFallback(null),
  };

  return {
    eyebrow: textOrFallback(cmsPage.eyebrow, fallbackHomePageContent.eyebrow),
    heroTitle: textOrFallback(
      cmsPage.heroTitle,
      fallbackHomePageContent.heroTitle,
    ),
    heroText: textOrFallback(cmsPage.heroText, fallbackHomePageContent.heroText),
    source: "contentful",
  };
}

export async function getHomePageContent(): Promise<HomePageContent> {
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
}
