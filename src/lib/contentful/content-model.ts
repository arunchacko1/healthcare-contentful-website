export type ContentfulFieldType =
  | "Asset"
  | "Boolean"
  | "Date"
  | "Entry"
  | "Long text"
  | "Rich text"
  | "Short text"
  | "Short text list";

export type ContentfulFieldPlan = Readonly<{
  name: string;
  type: ContentfulFieldType;
  required: boolean;
  notes: string;
}>;

export type ContentfulContentTypePlan = Readonly<{
  id: string;
  name: string;
  description: string;
  fields: ContentfulFieldPlan[];
}>;

export const contentfulContentModel: ContentfulContentTypePlan[] = [
  {
    id: "seoMetadata",
    name: "SEO Metadata",
    description: "Shared search metadata used by pages and entries.",
    fields: [
      {
        name: "Title",
        type: "Short text",
        required: true,
        notes: "Used for browser and search result titles.",
      },
      {
        name: "Description",
        type: "Long text",
        required: true,
        notes: "A concise summary for search previews.",
      },
      {
        name: "Canonical Path",
        type: "Short text",
        required: false,
        notes: "Optional path such as /services/primary-care.",
      },
      {
        name: "No Index",
        type: "Boolean",
        required: false,
        notes: "Defaults to false when omitted.",
      },
      {
        name: "Image",
        type: "Asset",
        required: false,
        notes: "Optional image for social previews.",
      },
    ],
  },
  {
    id: "page",
    name: "Page",
    description: "General marketing pages such as Home or Patient Resources.",
    fields: [
      { name: "Title", type: "Short text", required: true, notes: "Internal page title." },
      { name: "Slug", type: "Short text", required: true, notes: "URL-safe page slug." },
      { name: "Eyebrow", type: "Short text", required: false, notes: "Small label above the main heading." },
      { name: "Hero Title", type: "Short text", required: true, notes: "Primary visible page heading." },
      { name: "Hero Text", type: "Long text", required: true, notes: "Introductory page copy." },
      { name: "Body", type: "Rich text", required: false, notes: "Optional long-form page content." },
      { name: "SEO", type: "Entry", required: true, notes: "Reference to SEO Metadata." },
    ],
  },
  {
    id: "service",
    name: "Service",
    description: "Clinic service pages and cards.",
    fields: [
      { name: "Title", type: "Short text", required: true, notes: "Visible service name." },
      { name: "Slug", type: "Short text", required: true, notes: "URL-safe service slug." },
      { name: "Summary", type: "Long text", required: true, notes: "Short listing card text." },
      { name: "Description", type: "Rich text", required: false, notes: "Full detail page content." },
      { name: "Care Highlights", type: "Short text list", required: false, notes: "Scannable service bullets." },
      { name: "SEO", type: "Entry", required: true, notes: "Reference to SEO Metadata." },
    ],
  },
  {
    id: "provider",
    name: "Provider",
    description: "Fictional care team profiles.",
    fields: [
      { name: "Name", type: "Short text", required: true, notes: "Provider display name." },
      { name: "Slug", type: "Short text", required: true, notes: "URL-safe provider slug." },
      { name: "Role", type: "Short text", required: true, notes: "Provider title or care role." },
      { name: "Specialties", type: "Short text list", required: false, notes: "Areas of care focus." },
      { name: "Bio", type: "Rich text", required: true, notes: "Profile biography content." },
      { name: "Image", type: "Asset", required: false, notes: "Optional profile image." },
      { name: "SEO", type: "Entry", required: true, notes: "Reference to SEO Metadata." },
    ],
  },
  {
    id: "article",
    name: "Article",
    description: "Blog and patient education articles.",
    fields: [
      { name: "Title", type: "Short text", required: true, notes: "Article headline." },
      { name: "Slug", type: "Short text", required: true, notes: "URL-safe article slug." },
      { name: "Excerpt", type: "Long text", required: true, notes: "Listing page summary." },
      { name: "Published Date", type: "Date", required: true, notes: "Displayed article date." },
      { name: "Author Name", type: "Short text", required: false, notes: "Optional byline text." },
      { name: "Body", type: "Rich text", required: true, notes: "Article body content." },
      { name: "SEO", type: "Entry", required: true, notes: "Reference to SEO Metadata." },
    ],
  },
  {
    id: "faqItem",
    name: "FAQ Item",
    description: "Question and answer entries for FAQ sections.",
    fields: [
      { name: "Question", type: "Short text", required: true, notes: "Visible FAQ question." },
      { name: "Answer", type: "Rich text", required: true, notes: "Answer content." },
      { name: "Category", type: "Short text", required: false, notes: "Optional grouping label." },
    ],
  },
];
