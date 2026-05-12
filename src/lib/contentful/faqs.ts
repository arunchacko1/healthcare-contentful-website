import type { Entry, EntryFieldTypes, EntrySkeletonType } from "contentful";
import { getContentfulClient } from "@/lib/contentful/client";
import { textOrFallback } from "@/lib/contentful/fallbacks";
import { createRichTextDocumentFromParagraphs } from "@/lib/contentful/rich-text-document";
import type { CmsRichTextDocument } from "@/lib/contentful/types";
import { faqs as fallbackFaqs } from "@/lib/static-content";

type FaqFields = Readonly<{
  question: EntryFieldTypes.Symbol;
  answer: EntryFieldTypes.RichText;
  category?: EntryFieldTypes.Symbol;
}>;

type FaqSkeleton = EntrySkeletonType<FaqFields, "faqItem">;

export type FaqContent = Readonly<{
  question: string;
  answer: CmsRichTextDocument;
  category: string;
  source: "contentful" | "fallback";
}>;

export type FaqSection = Readonly<{
  category: string;
  items: FaqContent[];
}>;

export const fallbackFaqContent: FaqContent[] = fallbackFaqs.map((faq) => ({
  question: faq.question,
  answer: createRichTextDocumentFromParagraphs([faq.answer]),
  category: faq.category,
  source: "fallback",
}));

function mapFaqEntry(entry: Entry<FaqSkeleton>): FaqContent {
  return {
    question: textOrFallback(
      fieldString(entry.fields.question),
      "Frequently asked question",
    ),
    answer: fieldRichText(entry.fields.answer),
    category: textOrFallback(fieldString(entry.fields.category), "General"),
    source: "contentful",
  };
}

function fieldRichText(value: unknown): CmsRichTextDocument {
  return value && typeof value === "object"
    ? (value as CmsRichTextDocument)
    : createRichTextDocumentFromParagraphs([
        "This answer can be added in Contentful.",
      ]);
}

function fieldString(value: unknown) {
  return typeof value === "string" ? value : undefined;
}

export function groupFaqsByCategory(items: FaqContent[]): FaqSection[] {
  const sections = new Map<string, FaqContent[]>();

  for (const item of items) {
    const sectionItems = sections.get(item.category) ?? [];
    sections.set(item.category, [...sectionItems, item]);
  }

  return Array.from(sections.entries()).map(([category, sectionItems]) => ({
    category,
    items: sectionItems,
  }));
}

export async function getFaqs(): Promise<FaqContent[]> {
  const client = getContentfulClient();

  if (!client) {
    return fallbackFaqContent;
  }

  try {
    const response = await client.getEntries<FaqSkeleton>({
      content_type: "faqItem",
      limit: 100,
    });

    return response.items.length > 0
      ? response.items.map((entry) => mapFaqEntry(entry))
      : fallbackFaqContent;
  } catch (error) {
    console.error("Unable to load Contentful FAQ items.", error);
    return fallbackFaqContent;
  }
}

export async function getFaqSections() {
  const items = await getFaqs();

  return groupFaqsByCategory(items);
}
