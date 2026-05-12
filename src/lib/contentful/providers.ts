import type { Asset, Entry, EntryFieldTypes, EntrySkeletonType } from "contentful";
import { cache } from "react";
import { getContentfulClient } from "@/lib/contentful/client";
import {
  listOrFallback,
  seoOrFallback,
  slugOrFallback,
  textOrFallback,
} from "@/lib/contentful/fallbacks";
import { richTextToPlainTextBlocks } from "@/lib/contentful/rich-text";
import type { CmsAsset, CmsSeo } from "@/lib/contentful/types";
import { providers as fallbackProviders } from "@/lib/static-content";

type SeoFields = Readonly<{
  title: EntryFieldTypes.Symbol;
  description: EntryFieldTypes.Text;
  canonicalPath?: EntryFieldTypes.Symbol;
  noIndex?: EntryFieldTypes.Boolean;
}>;

type SeoSkeleton = EntrySkeletonType<SeoFields, "seoMetadata">;

type ProviderFields = Readonly<{
  name: EntryFieldTypes.Symbol;
  slug: EntryFieldTypes.Symbol;
  role: EntryFieldTypes.Symbol;
  specialties?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
  bio: EntryFieldTypes.RichText;
  image?: EntryFieldTypes.AssetLink;
  seo?: EntryFieldTypes.EntryLink<SeoSkeleton>;
}>;

type ProviderSkeleton = EntrySkeletonType<ProviderFields, "provider">;

export type ProviderContent = Readonly<{
  name: string;
  slug: string;
  role: string;
  summary: string;
  bioBlocks: string[];
  specialties: string[];
  image?: CmsAsset;
  seo: CmsSeo;
  source: "contentful" | "fallback";
}>;

export const fallbackProviderContent: ProviderContent[] = fallbackProviders.map(
  (provider) => ({
    name: provider.name,
    slug: provider.slug,
    role: provider.role,
    summary: provider.summary,
    bioBlocks: [provider.bioText],
    specialties: provider.specialties,
    seo: seoOrFallback({
      title: `${provider.name} | Everwell Family Clinic`,
      description: provider.summary,
      canonicalPath: `/providers/${provider.slug}`,
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

function mapProviderEntry(entry: Entry<ProviderSkeleton>): ProviderContent {
  const name = textOrFallback(fieldString(entry.fields.name), "Provider");
  const slug = slugOrFallback(fieldString(entry.fields.slug) ?? name);
  const role = textOrFallback(fieldString(entry.fields.role), "Care Team");
  const bioBlocks = listOrFallback(richTextToPlainTextBlocks(entry.fields.bio), [
    `${name} is part of the ${role.toLowerCase()} team at Everwell Family Clinic.`,
  ]);
  const summary = bioBlocks[0];
  const specialties = listOrFallback(fieldStringList(entry.fields.specialties), []);
  const fallbackSeo = seoOrFallback({
    title: `${name} | Everwell Family Clinic`,
    description: summary,
    canonicalPath: `/providers/${slug}`,
  });

  return {
    name,
    slug,
    role,
    summary,
    bioBlocks,
    specialties,
    image: mapAsset(entry.fields.image),
    seo: mapSeoEntry(entry.fields.seo, fallbackSeo),
    source: "contentful",
  };
}

function mapAsset(value: unknown): CmsAsset | undefined {
  if (!isAsset(value)) {
    return undefined;
  }

  const url = normalizeAssetUrl(fieldString(value.fields.file?.url));
  const imageDetails = getImageDetails(value.fields.file?.details);

  if (!url) {
    return undefined;
  }

  return {
    title: textOrFallback(fieldString(value.fields.title), "Provider photo"),
    description: fieldString(value.fields.description),
    url,
    width: imageDetails?.width,
    height: imageDetails?.height,
  };
}

function isAsset(value: unknown): value is Asset {
  return Boolean(value && typeof value === "object" && "fields" in value);
}

function normalizeAssetUrl(value: string | undefined) {
  if (!value) {
    return undefined;
  }

  return value.startsWith("//") ? `https:${value}` : value;
}

function getImageDetails(value: unknown) {
  if (!value || typeof value !== "object") {
    return undefined;
  }

  const details = value as Record<string, unknown>;
  const image = details.image;

  if (!image || typeof image !== "object") {
    return undefined;
  }

  const imageRecord = image as Record<string, unknown>;
  const width = fieldNumber(imageRecord.width);
  const height = fieldNumber(imageRecord.height);

  return width && height ? { width, height } : undefined;
}

function fieldString(value: unknown) {
  return typeof value === "string" ? value : undefined;
}

function fieldBoolean(value: unknown) {
  return typeof value === "boolean" ? value : undefined;
}

function fieldNumber(value: unknown) {
  return typeof value === "number" ? value : undefined;
}

function fieldStringList(value: unknown) {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : undefined;
}

export const getProviders = cache(async function getProviders(): Promise<
  ProviderContent[]
> {
  const client = getContentfulClient();

  if (!client) {
    return fallbackProviderContent;
  }

  try {
    const response = await client.getEntries<ProviderSkeleton>({
      content_type: "provider",
      include: 2,
      limit: 100,
    });

    return response.items.length > 0
      ? response.items.map((entry) => mapProviderEntry(entry))
      : fallbackProviderContent;
  } catch (error) {
    console.error("Unable to load Contentful providers.", error);
    return fallbackProviderContent;
  }
});

export async function getProviderBySlug(slug: string) {
  const providers = await getProviders();

  return providers.find((provider) => provider.slug === slug) ?? null;
}

export async function getProviderSlugs() {
  const providers = await getProviders();

  return providers.map((provider) => provider.slug);
}
