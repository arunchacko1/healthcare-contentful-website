import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { getHomePageContent } from "@/lib/contentful";
import { articles, providers, services } from "@/lib/static-content";

export default async function Home() {
  const homePageContent = await getHomePageContent();

  return (
    <>
      <section className="bg-teal-50 py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <Badge>{homePageContent.eyebrow}</Badge>
            <h1 className="mt-5 text-4xl font-bold text-slate-950 sm:text-6xl">
              {homePageContent.heroTitle}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
              {homePageContent.heroText}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact">Request Appointment</Button>
              <Button href="/services" variant="secondary">
                Explore Services
              </Button>
            </div>
          </div>
          <div className="rounded-lg border border-teal-100 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-teal-800">
              Care at a glance
            </p>
            <dl className="mt-6 grid gap-5">
              <div>
                <dt className="text-3xl font-bold text-slate-950">7</dt>
                <dd className="mt-1 text-sm text-slate-600">static pages</dd>
              </div>
              <div>
                <dt className="text-3xl font-bold text-slate-950">3</dt>
                <dd className="mt-1 text-sm text-slate-600">
                  reusable content sections
                </dd>
              </div>
              <div>
                <dt className="text-3xl font-bold text-slate-950">100%</dt>
                <dd className="mt-1 text-sm text-slate-600">
                  ready for future CMS wiring
                </dd>
              </div>
            </dl>
            {homePageContent.source === "fallback" ? (
              <p className="mt-6 rounded-md bg-teal-50 p-3 text-sm leading-6 text-teal-900">
                Showing safe starter content until Contentful credentials and a
                Home page entry are available.
              </p>
            ) : null}
          </div>
        </Container>
      </section>

      <Section>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Badge>Services</Badge>
            <h2 className="mt-4 text-3xl font-bold text-slate-950">
              Common care paths
            </h2>
          </div>
          <Button href="/services" variant="secondary">
            View Services
          </Button>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {services.map((service) => (
            <Card key={service.title}>
              <h3 className="text-xl font-semibold text-slate-950">
                {service.title}
              </h3>
              <p className="mt-3 leading-7 text-slate-600">
                {service.summary}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-white">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <Badge>Providers</Badge>
            <h2 className="mt-4 text-3xl font-bold text-slate-950">
              A calm team introduction
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Provider cards are static now and will become Contentful-driven in
              a later milestone.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {providers.slice(0, 2).map((provider) => (
              <Card key={provider.name}>
                <h3 className="text-xl font-semibold text-slate-950">
                  {provider.name}
                </h3>
                <p className="mt-3 leading-7 text-slate-600">
                  {provider.summary}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div>
          <Badge>Articles</Badge>
          <h2 className="mt-4 text-3xl font-bold text-slate-950">
            Helpful patient education
          </h2>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {articles.map((article) => (
            <Card key={article.title}>
              <h3 className="text-xl font-semibold text-slate-950">
                {article.title}
              </h3>
              <p className="mt-3 leading-7 text-slate-600">
                {article.excerpt}
              </p>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
