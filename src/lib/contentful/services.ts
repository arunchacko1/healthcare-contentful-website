import type { Entry, EntryFieldTypes, EntrySkeletonType } from "contentful";
import { getContentfulClient } from "@/lib/contentful/client";
import {
  listOrFallback,
  seoOrFallback,
  slugOrFallback,
  textOrFallback,
} from "@/lib/contentful/fallbacks";
import { richTextToPlainTextBlocks } from "@/lib/contentful/rich-text";
import type { CmsSeo } from "@/lib/contentful/types";
import { services as fallbackServices } from "@/lib/static-content";

type SeoFields = Readonly<{
  title: EntryFieldTypes.Symbol;
  description: EntryFieldTypes.Text;
  canonicalPath?: EntryFieldTypes.Symbol;
  noIndex?: EntryFieldTypes.Boolean;
}>;

type SeoSkeleton = EntrySkeletonType<SeoFields, "seoMetadata">;

type ServiceFields = Readonly<{
  title: EntryFieldTypes.Symbol;
  slug: EntryFieldTypes.Symbol;
  summary: EntryFieldTypes.Text;
  description?: EntryFieldTypes.RichText;
  careHighlights?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
  seo?: EntryFieldTypes.EntryLink<SeoSkeleton>;
}>;

type ServiceSkeleton = EntrySkeletonType<ServiceFields, "service">;

export type ServiceContent = Readonly<{
  title: string;
  slug: string;
  summary: string;
  detailBlocks: string[];
  careHighlights: string[];
  seo: CmsSeo;
  source: "contentful" | "fallback";
}>;

export const fallbackServiceContent: ServiceContent[] = fallbackServices.map(
  (service) => ({
    title: service.title,
    slug: service.slug,
    summary: service.summary,
    detailBlocks: [service.detailText],
    careHighlights: service.careHighlights,
    seo: seoOrFallback({
      title: `${service.title} | Everwell Family Clinic`,
      description: service.summary,
      canonicalPath: `/services/${service.slug}`,
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

function mapServiceEntry(entry: Entry<ServiceSkeleton>): ServiceContent {
  const title = textOrFallback(fieldString(entry.fields.title), "Service");
  const slug = slugOrFallback(fieldString(entry.fields.slug) ?? title);
  const summary = textOrFallback(
    fieldString(entry.fields.summary),
    "Learn more about this clinic service.",
  );
  const detailBlocks = listOrFallback(
    richTextToPlainTextBlocks(entry.fields.description),
    [summary],
  );
  const careHighlights = listOrFallback(
    fieldStringList(entry.fields.careHighlights),
    [],
  );
  const fallbackSeo = seoOrFallback({
    title: `${title} | Everwell Family Clinic`,
    description: summary,
    canonicalPath: `/services/${slug}`,
  });

  return {
    title,
    slug,
    summary,
    detailBlocks,
    careHighlights,
    seo: mapSeoEntry(entry.fields.seo, fallbackSeo),
    source: "contentful",
  };
}

function fieldString(value: unknown) {
  return typeof value === "string" ? value : undefined;
}

function fieldBoolean(value: unknown) {
  return typeof value === "boolean" ? value : undefined;
}

function fieldStringList(value: unknown) {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : undefined;
}

export async function getServices(): Promise<ServiceContent[]> {
  const client = getContentfulClient();

  if (!client) {
    return fallbackServiceContent;
  }

  try {
    const response = await client.getEntries<ServiceSkeleton>({
      content_type: "service",
      include: 2,
      limit: 100,
    });

    return response.items.length > 0
      ? response.items.map((entry) => mapServiceEntry(entry))
      : fallbackServiceContent;
  } catch (error) {
    console.error("Unable to load Contentful services.", error);
    return fallbackServiceContent;
  }
}

export async function getServiceBySlug(slug: string) {
  const services = await getServices();

  return services.find((service) => service.slug === slug) ?? null;
}

export async function getServiceSlugs() {
  const services = await getServices();

  return services.map((service) => service.slug);
}
