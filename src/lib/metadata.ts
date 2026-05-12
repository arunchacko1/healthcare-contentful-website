import type { Metadata } from "next";
import type { CmsSeo } from "@/lib/contentful/types";
import { getSiteUrl, siteConfig } from "@/lib/site";

type PageMetadataInput = Readonly<{
  title: string;
  description: string;
  canonicalPath?: string;
  image?: CmsSeo["image"];
  noIndex?: boolean;
}>;

export function buildRootMetadata(): Metadata {
  return {
    metadataBase: new URL(getSiteUrl()),
    title: {
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title: siteConfig.name,
      description: siteConfig.description,
      url: "/",
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.name,
      description: siteConfig.description,
    },
  };
}

export function buildPageMetadata(input: PageMetadataInput): Metadata {
  const title = withSiteName(input.title);
  const imageUrl = input.image?.url;

  return {
    title: {
      absolute: title,
    },
    description: input.description,
    alternates: input.canonicalPath
      ? {
          canonical: input.canonicalPath,
        }
      : undefined,
    robots: input.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title,
      description: input.description,
      url: input.canonicalPath,
      images: imageUrl ? [{ url: imageUrl }] : undefined,
    },
    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",
      title,
      description: input.description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

export function buildMetadataFromSeo(seo: CmsSeo): Metadata {
  return buildPageMetadata({
    title: seo.title,
    description: seo.description,
    canonicalPath: seo.canonicalPath,
    image: seo.image,
    noIndex: seo.noIndex,
  });
}

function withSiteName(title: string) {
  return title.includes(siteConfig.name) ? title : `${title} | ${siteConfig.name}`;
}
