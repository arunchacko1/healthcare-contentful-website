import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";

type PageHeroProps = Readonly<{
  eyebrow: string;
  title: string;
  description: string;
}>;

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="bg-teal-50 py-16 sm:py-20">
      <Container>
        <div className="max-w-3xl">
          <Badge>{eyebrow}</Badge>
          <h1 className="mt-5 text-4xl font-bold text-slate-950 sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-700">
            {description}
          </p>
        </div>
      </Container>
    </section>
  );
}
