export type SummaryCard = Readonly<{
  title: string;
  text: string;
}>;

export const services: SummaryCard[] = [
  {
    title: "Primary Care",
    text: "Everyday visits, ongoing care plans, and clear next steps for common health needs.",
  },
  {
    title: "Preventive Visits",
    text: "Annual checkups, screenings, and wellness conversations for each stage of life.",
  },
  {
    title: "Care Coordination",
    text: "Support for referrals, follow-up visits, and communication across care needs.",
  },
];

export const providers: SummaryCard[] = [
  {
    title: "Dr. Lena Morris",
    text: "Family medicine physician focused on practical prevention and long-term relationships.",
  },
  {
    title: "Nora Patel, PA-C",
    text: "Primary care clinician supporting acute visits, checkups, and education.",
  },
  {
    title: "Marcus Lee, FNP",
    text: "Nurse practitioner with a calm approach to chronic care conversations.",
  },
];

export const resources: SummaryCard[] = [
  {
    title: "Before Your Visit",
    text: "A simple checklist for forms, questions, and what to bring.",
  },
  {
    title: "Insurance Basics",
    text: "Plain-language guidance for understanding common visit details.",
  },
  {
    title: "Care Planning",
    text: "How to prepare for follow-up conversations and next steps.",
  },
];

export const articles: SummaryCard[] = [
  {
    title: "Making Preventive Care Easier To Plan",
    text: "A short guide to turning annual visits into useful health conversations.",
  },
  {
    title: "Questions To Bring To A Primary Care Visit",
    text: "Helpful prompts for making the most of a clinic appointment.",
  },
  {
    title: "Understanding Follow-Up Care",
    text: "What follow-up visits can clarify and how they support continuity.",
  },
];

export const faqs: SummaryCard[] = [
  {
    title: "Can I request an appointment online?",
    text: "Yes. The static form shell is ready and will gain stronger behavior in a later milestone.",
  },
  {
    title: "Is this connected to Contentful yet?",
    text: "Not yet. This milestone keeps content static so the design system is easy to review first.",
  },
  {
    title: "Will pages become CMS-driven later?",
    text: "Yes. Services, providers, articles, FAQ items, and SEO content will connect to Contentful in later milestones.",
  },
];
