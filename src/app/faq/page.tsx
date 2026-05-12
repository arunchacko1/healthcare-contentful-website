import type { Metadata } from "next";
import { RichTextRenderer } from "@/components/content/rich-text-renderer";
import { PageHero } from "@/components/page/page-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { Section } from "@/components/ui/section";
import { getFaqSections } from "@/lib/contentful";
import { buildPageMetadata } from "@/lib/metadata";
import { createBreadcrumbJsonLd, createFaqJsonLd } from "@/lib/schema";

export const metadata: Metadata = buildPageMetadata({
  title: "FAQ",
  description:
    "Find answers to common fictional clinic questions from CMS-driven FAQ sections.",
  canonicalPath: "/faq",
});

export default async function FaqPage() {
  const faqSections = await getFaqSections();
  const isUsingFallback = faqSections.some((section) =>
    section.items.some((item) => item.source === "fallback"),
  );

  return (
    <>
      <JsonLd
        data={[
          createFaqJsonLd(faqSections.flatMap((section) => section.items)),
          createBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "FAQ", path: "/faq" },
          ]),
        ]}
      />
      <PageHero
        eyebrow="FAQ"
        title="Answers to common questions"
        description="Review CMS-driven FAQ sections using native disclosure controls for accessible keyboard behavior."
      />
      <Section>
        <div className="mx-auto grid max-w-3xl gap-8">
          {isUsingFallback ? (
            <p className="rounded-md bg-teal-50 p-3 text-sm leading-6 text-teal-900">
              Showing safe starter FAQ content until Contentful FAQ entries are
              available.
            </p>
          ) : null}
          {faqSections.map((section) => (
            <div key={section.category}>
              <h2 className="text-2xl font-bold text-slate-950">
                {section.category}
              </h2>
              <div className="mt-4 grid gap-4">
                {section.items.map((faq) => (
                  <details
                    className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
                    key={faq.question}
                  >
                    <summary className="cursor-pointer text-lg font-semibold text-slate-950">
                      {faq.question}
                    </summary>
                    <div className="mt-3">
                      <RichTextRenderer document={faq.answer} />
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
