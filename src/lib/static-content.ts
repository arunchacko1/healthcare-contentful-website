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

export type ArticleSummary = Readonly<{
  title: string;
  slug: string;
  excerpt: string;
  publishedDate: string;
  authorName: string;
  bodyBlocks: string[];
}>;

export type FaqSummary = Readonly<{
  question: string;
  answer: string;
  category: string;
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

export const articles: ArticleSummary[] = [
  {
    title: "Making Preventive Care Easier To Plan",
    slug: "making-preventive-care-easier-to-plan",
    excerpt:
      "A short guide to turning annual visits into useful health conversations.",
    publishedDate: "2026-05-11",
    authorName: "Everwell Care Team",
    bodyBlocks: [
      "Preventive care is easier to plan when patients know what they want to discuss before a visit begins.",
      "A simple list of questions, recent changes, and care goals can help the conversation stay focused and useful.",
    ],
  },
  {
    title: "Questions To Bring To A Primary Care Visit",
    slug: "questions-to-bring-to-a-primary-care-visit",
    excerpt: "Helpful prompts for making the most of a clinic appointment.",
    publishedDate: "2026-05-12",
    authorName: "Everwell Care Team",
    bodyBlocks: [
      "Primary care visits work best when patients feel prepared to describe symptoms, goals, and concerns in their own words.",
      "Useful questions can cover medications, follow-up timing, lifestyle changes, and what signs should prompt another visit.",
    ],
  },
  {
    title: "Understanding Follow-Up Care",
    slug: "understanding-follow-up-care",
    excerpt:
      "What follow-up visits can clarify and how they support continuity.",
    publishedDate: "2026-05-13",
    authorName: "Everwell Care Team",
    bodyBlocks: [
      "Follow-up care gives patients and clinicians time to review progress, clarify next steps, and adjust care plans when needed.",
      "These visits can be especially helpful when several questions or care needs connect across time.",
    ],
  },
];

export const faqs: FaqSummary[] = [
  {
    question: "Can I request an appointment online?",
    answer:
      "Yes. The appointment request form validates required details and shows a confirmation message without storing information.",
    category: "Appointments",
  },
  {
    question: "Is FAQ content connected to Contentful?",
    answer:
      "Yes. FAQ items can load from Contentful, and safe starter questions appear when CMS entries are unavailable.",
    category: "Content",
  },
  {
    question: "Which content is CMS-driven now?",
    answer:
      "The site supports CMS-driven home, services, providers, articles, resources, and FAQ content.",
    category: "Content",
  },
];
