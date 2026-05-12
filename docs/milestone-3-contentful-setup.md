# Milestone 3 Contentful Setup Notes

## What Was Built

Milestone 3 prepares the Contentful model before live data fetching.

The project now has:

- TypeScript interfaces for pages, services, providers, articles, FAQ items, assets, rich text, and SEO metadata
- A typed Contentful content model plan
- Environment variable names and a sample `.env.example`
- Safe fallback helpers for missing text, lists, slugs, and SEO values

No Contentful SDK or live API request is added in this milestone.

## Content Types

### SEO Metadata

Fields:

- Title: short text, required
- Description: long text, required
- Canonical Path: short text, optional
- No Index: boolean, optional
- Image: asset, optional

Example:

- Title: Primary Care
- Description: Learn about primary care visits at Everwell Family Clinic.
- Canonical Path: `/services/primary-care`
- No Index: false

### Page

Fields:

- Title: short text, required
- Slug: short text, required
- Eyebrow: short text, optional
- Hero Title: short text, required
- Hero Text: long text, required
- Body: rich text, optional
- SEO: SEO Metadata reference, required

Example:

- Title: Patient Resources
- Slug: `patient-resources`
- Hero Title: Helpful details before and after a visit

### Service

Fields:

- Title: short text, required
- Slug: short text, required
- Summary: long text, required
- Description: rich text, optional
- Care Highlights: short text list, optional
- SEO: SEO Metadata reference, required

Example:

- Title: Preventive Visits
- Slug: `preventive-visits`
- Summary: Annual checkups, screenings, and wellness conversations.

### Provider

Fields:

- Name: short text, required
- Slug: short text, required
- Role: short text, required
- Specialties: short text list, optional
- Bio: rich text, required
- Image: asset, optional
- SEO: SEO Metadata reference, required

Example:

- Name: Dr. Lena Morris
- Slug: `lena-morris`
- Role: Family Medicine Physician

### Article

Fields:

- Title: short text, required
- Slug: short text, required
- Excerpt: long text, required
- Published Date: date, required
- Author Name: short text, optional
- Body: rich text, required
- SEO: SEO Metadata reference, required

Example:

- Title: Questions To Bring To A Primary Care Visit
- Slug: `questions-primary-care-visit`
- Published Date: `2026-05-11`

### FAQ Item

Fields:

- Question: short text, required
- Answer: rich text, required
- Category: short text, optional

Example:

- Question: Can I request an appointment online?
- Category: Appointments

## Environment Variables

Use `.env.local` for real values:

- `CONTENTFUL_SPACE_ID`
- `CONTENTFUL_DELIVERY_TOKEN`
- `CONTENTFUL_PREVIEW_TOKEN`
- `CONTENTFUL_ENVIRONMENT`

`CONTENTFUL_ENVIRONMENT` should usually be `master` unless a separate Contentful environment is created.

## Safe Missing Data Handling

The fallback helpers support predictable rendering when CMS fields are missing:

- `textOrFallback` returns a readable fallback for empty text.
- `listOrFallback` returns a fallback array for empty lists.
- `slugOrFallback` creates a safe slug from available text.
- `seoOrFallback` keeps pages from missing required SEO values.

## Review Notes

- This milestone does not fetch Contentful data.
- Rich text is represented with a minimal local type until the rich text renderer is added.
- Required fields are documented now so Contentful setup is less ambiguous later.
- SEO is modeled as a reusable entry so pages, services, providers, and articles can share the same shape.

## Quiz Questions

1. Why do we define TypeScript CMS interfaces before fetching live data?
2. Which content types reference SEO Metadata?
3. Why should real Contentful tokens stay out of source control?
4. What does `seoOrFallback` protect against?
5. Why is rich text typed separately from plain text?
