export type SummaryCard = Readonly<{
  title: string;
  text: string;
}>;

export type ServiceSummary = Readonly<{
  title: string;
  slug: string;
  summary: string;
  detailText: string;
  careHighlights: string[];
}>;

export type ProviderSummary = Readonly<{
  name: string;
  slug: string;
  role: string;
  summary: string;
  specialties: string[];
  bioText: string;
}>;

export const services: ServiceSummary[] = [
  {
    title: "Primary Care",
    slug: "primary-care",
    summary:
      "Everyday visits, ongoing care plans, and clear next steps for common health needs.",
    detailText:
      "Primary care visits help patients talk through current concerns, review health history, and plan practical next steps with a trusted clinic team.",
    careHighlights: [
      "Routine visits",
      "Health history review",
      "Ongoing care planning",
    ],
  },
  {
    title: "Preventive Visits",
    slug: "preventive-visits",
    summary:
      "Annual checkups, screenings, and wellness conversations for each stage of life.",
    detailText:
      "Preventive visits create time for screening conversations, wellness goals, and early questions before small concerns become harder to manage.",
    careHighlights: [
      "Annual checkups",
      "Screening conversations",
      "Wellness planning",
    ],
  },
  {
    title: "Care Coordination",
    slug: "care-coordination",
    summary:
      "Support for referrals, follow-up visits, and communication across care needs.",
    detailText:
      "Care coordination helps patients understand referrals, follow-up timing, and the information needed for connected care conversations.",
    careHighlights: [
      "Referral support",
      "Follow-up planning",
      "Care communication",
    ],
  },
];

export const providers: ProviderSummary[] = [
  {
    name: "Dr. Lena Morris",
    slug: "lena-morris",
    role: "Family Medicine Physician",
    summary:
      "Family medicine physician focused on practical prevention and long-term relationships.",
    specialties: ["Primary care", "Preventive visits", "Care planning"],
    bioText:
      "Dr. Lena Morris takes a steady, practical approach to family medicine. Her fictional profile highlights clear explanations, prevention conversations, and care plans that feel manageable for patients.",
  },
  {
    name: "Nora Patel, PA-C",
    slug: "nora-patel",
    role: "Primary Care Clinician",
    summary:
      "Primary care clinician supporting acute visits, checkups, and education.",
    specialties: ["Same-week visits", "Patient education", "Wellness support"],
    bioText:
      "Nora Patel supports fictional clinic visits with a calm, detail-oriented style. Her profile is designed for future CMS content that explains areas of care focus in plain language.",
  },
  {
    name: "Marcus Lee, FNP",
    slug: "marcus-lee",
    role: "Family Nurse Practitioner",
    summary:
      "Nurse practitioner with a calm approach to chronic care conversations.",
    specialties: ["Follow-up care", "Chronic care support", "Care coordination"],
    bioText:
      "Marcus Lee helps patients understand follow-up steps and ongoing care needs. This fictional profile keeps the tone warm, specific, and easy to adapt when Contentful entries are added.",
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
