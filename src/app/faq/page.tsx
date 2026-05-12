import { PageHero } from "@/components/page/page-hero";
import { Section } from "@/components/ui/section";
import { faqs } from "@/lib/static-content";

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Answers to common questions"
        description="This static FAQ uses native disclosure elements so keyboard and screen reader behavior works before CMS wiring."
      />
      <Section>
        <div className="mx-auto grid max-w-3xl gap-4">
          {faqs.map((faq) => (
            <details
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
              key={faq.title}
            >
              <summary className="cursor-pointer text-lg font-semibold text-slate-950">
                {faq.title}
              </summary>
              <p className="mt-3 leading-7 text-slate-600">{faq.text}</p>
            </details>
          ))}
        </div>
      </Section>
    </>
  );
}
