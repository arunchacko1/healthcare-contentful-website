import { PageHero } from "@/components/page/page-hero";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { articles } from "@/lib/static-content";

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Articles"
        title="Readable health education previews"
        description="Article cards are static placeholders for the Contentful blog publishing workflow planned in a later milestone."
      />
      <Section>
        <div className="grid gap-5 md:grid-cols-3">
          {articles.map((article) => (
            <Card key={article.title}>
              <p className="text-sm font-medium text-teal-800">Clinic article</p>
              <h2 className="mt-3 text-xl font-semibold text-slate-950">
                {article.title}
              </h2>
              <p className="mt-3 leading-7 text-slate-600">{article.text}</p>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
