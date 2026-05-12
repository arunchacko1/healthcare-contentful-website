import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";

type SectionProps = Readonly<{
  children: ReactNode;
  className?: string;
}>;

export function Section({ children, className = "" }: SectionProps) {
  return (
    <section className={`py-16 sm:py-20 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}
