import type { CmsSeo } from "@/lib/contentful/types";
import { siteConfig } from "@/lib/site";

export function textOrFallback(value: string | null | undefined, fallback: string) {
  const trimmedValue = value?.trim();

  return trimmedValue ? trimmedValue : fallback;
}

export function listOrFallback<T>(
  value: T[] | null | undefined,
  fallback: T[],
) {
  return value && value.length > 0 ? value : fallback;
}

export function slugOrFallback(value: string | null | undefined) {
  return textOrFallback(value, "untitled")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function seoOrFallback(value: Partial<CmsSeo> | null | undefined): CmsSeo {
  return {
    title: textOrFallback(value?.title, siteConfig.name),
    description: textOrFallback(value?.description, siteConfig.description),
    canonicalPath: value?.canonicalPath,
    noIndex: value?.noIndex ?? false,
    image: value?.image,
  };
}
