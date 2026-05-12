import { PageHero } from "@/components/page/page-hero";
import { AppointmentRequestForm } from "@/components/forms/appointment-request-form";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { JsonLd } from "@/components/seo/json-ld";
import { buildPageMetadata } from "@/lib/metadata";
import { createBreadcrumbJsonLd, createClinicJsonLd } from "@/lib/schema";
import { siteConfig } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Contact",
  description:
    "Request a fictional appointment with Everwell Family Clinic and review clinic contact details.",
  canonicalPath: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={[
          createClinicJsonLd(),
          createBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Contact"
        title="Request an appointment"
        description="Send a demo appointment request with clear validation, helpful errors, and no stored information."
      />
      <Section>
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <Card>
            <AppointmentRequestForm />
          </Card>
          <Card>
            <h2 className="text-xl font-semibold text-slate-950">
              Clinic details
            </h2>
            <address className="mt-4 text-base not-italic leading-7 text-slate-600">
              {siteConfig.address}
              <br />
              {siteConfig.phone}
              <br />
              {siteConfig.email}
            </address>
          </Card>
        </div>
      </Section>
    </>
  );
}
