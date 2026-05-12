import { PageHero } from "@/components/page/page-hero";
import { Card } from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/lib/site";

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Request an appointment"
        description="This static form shell focuses on accessible labels, readable fields, and clear layout before form behavior is added later."
      />
      <Section>
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <Card>
            <form className="grid gap-5">
              <Field
                label="Full name"
                name="name"
                placeholder="Your name"
              />
              <Field
                label="Email"
                name="email"
                placeholder="you@example.com"
                type="email"
              />
              <Field
                label="Phone"
                name="phone"
                placeholder="(555) 000-0000"
                type="tel"
              />
              <label className="grid gap-2 text-sm font-medium text-slate-800">
                <span>How can we help?</span>
                <textarea
                  className="min-h-32 rounded-md border border-slate-300 bg-white px-3 py-2 text-base text-slate-950 shadow-sm transition placeholder:text-slate-500 focus:border-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-700/20"
                  name="message"
                  placeholder="Share a short note"
                />
              </label>
              <button
                className="min-h-11 rounded-md bg-teal-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-800"
                type="button"
              >
                Send Request
              </button>
            </form>
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
