import type {
  ArticleContent,
  FaqContent,
  ProviderContent,
  ServiceContent,
} from "@/lib/contentful";
import { richTextToPlainTextBlocks } from "@/lib/contentful/rich-text";
import { getSiteUrl, siteConfig } from "@/lib/site";

export type JsonLdData = Record<string, unknown>;

export function createClinicJsonLd(): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: siteConfig.name,
    description: siteConfig.description,
    url: getSiteUrl(),
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: createPostalAddress(),
    medicalSpecialty: ["PrimaryCare", "FamilyPractice"],
  };
}

export function createServiceJsonLd(service: ServiceContent): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalService",
    name: service.title,
    description: service.summary,
    url: absoluteUrl(`/services/${service.slug}`),
    provider: createOrganization(),
  };
}

export function createProviderJsonLd(provider: ProviderContent): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: provider.name,
    description: provider.summary,
    url: absoluteUrl(`/providers/${provider.slug}`),
    image: provider.image?.url,
    hasOccupation: {
      "@type": "Occupation",
      name: provider.role,
    },
    knowsAbout: provider.specialties,
    worksFor: createOrganization(),
  };
}

export function createArticleJsonLd(article: ArticleContent): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedDate,
    author: {
      "@type": article.authorName ? "Person" : "Organization",
      name: article.authorName ?? siteConfig.name,
    },
    publisher: createOrganization(),
    mainEntityOfPage: absoluteUrl(`/blog/${article.slug}`),
  };
}

export function createFaqJsonLd(items: FaqContent[]): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: richTextAnswerToPlainText(item.answer),
      },
    })),
  };
}

export function createBreadcrumbJsonLd(
  items: ReadonlyArray<{ name: string; path: string }>,
): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

function createOrganization() {
  return {
    "@type": "MedicalOrganization",
    name: siteConfig.name,
    url: getSiteUrl(),
    telephone: siteConfig.phone,
    address: createPostalAddress(),
  };
}

function createPostalAddress() {
  return {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address,
  };
}

function absoluteUrl(path: string) {
  return new URL(path, getSiteUrl()).toString();
}

function richTextAnswerToPlainText(document: FaqContent["answer"]) {
  return richTextToPlainTextBlocks(document).join(" ");
}
