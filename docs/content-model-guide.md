# Content Model Guide

The source of truth for the planned Contentful model is `src/lib/contentful/content-model.ts`. This guide explains the same model in handoff-friendly language.

## Relationships

- Page, Service, Provider, and Article entries reference SEO Metadata.
- FAQ Item entries stand alone and are grouped by optional category.
- Provider entries may reference a Contentful asset for the profile image.

## Slug Rules

- Slugs should be lowercase, URL-safe, and unique within each content type.
- Do not include leading or trailing slashes.
- Use `home` for the Home page entry.
- Use `patient-resources` for the Patient Resources page entry.
- Service slugs appear under `/services/[slug]`.
- Provider slugs appear under `/providers/[slug]`.
- Article slugs appear under `/blog/[slug]`.

## Content Types

### SEO Metadata

Shared metadata used by pages and content entries.

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| Title | Short text | Yes | Browser and search result title. |
| Description | Long text | Yes | Search preview summary. |
| Canonical Path | Short text | No | Path such as `/services/primary-care`. |
| No Index | Boolean | No | Defaults to false when omitted. |
| Image | Asset | No | Optional social preview image. |

### Page

General marketing pages such as Home and Patient Resources.

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| Title | Short text | Yes | Internal page title. |
| Slug | Short text | Yes | URL-safe page slug. |
| Eyebrow | Short text | No | Small label above the main heading. |
| Hero Title | Short text | Yes | Primary visible page heading. |
| Hero Text | Long text | Yes | Introductory copy. |
| Body | Rich text | No | Optional long-form content. |
| SEO | Entry | Yes | Reference to SEO Metadata. |

### Service

Clinic service pages and cards.

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| Title | Short text | Yes | Visible service name. |
| Slug | Short text | Yes | URL-safe service slug. |
| Summary | Long text | Yes | Listing card text. |
| Description | Rich text | No | Detail page content. |
| Care Highlights | Short text list | No | Scannable service bullets. |
| SEO | Entry | Yes | Reference to SEO Metadata. |

### Provider

Fictional care team profiles.

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| Name | Short text | Yes | Provider display name. |
| Slug | Short text | Yes | URL-safe provider slug. |
| Role | Short text | Yes | Provider title or care role. |
| Specialties | Short text list | No | Areas of care focus. |
| Bio | Rich text | Yes | Profile biography content. |
| Image | Asset | No | Optional profile image. |
| SEO | Entry | Yes | Reference to SEO Metadata. |

### Article

Blog and patient education articles.

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| Title | Short text | Yes | Article headline. |
| Slug | Short text | Yes | URL-safe article slug. |
| Excerpt | Long text | Yes | Listing page summary. |
| Published Date | Date | Yes | Displayed article date. |
| Author Name | Short text | No | Optional byline text. |
| Body | Rich text | Yes | Article body content. |
| SEO | Entry | Yes | Reference to SEO Metadata. |

### FAQ Item

Question and answer entries for FAQ sections.

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| Question | Short text | Yes | Visible FAQ question. |
| Answer | Rich text | Yes | Answer content. |
| Category | Short text | No | Optional grouping label. |

## Fallback Behavior

The app treats missing Contentful configuration as a normal local-development state. If credentials, entries, or optional fields are missing, routes use typed fallback content and safe defaults instead of crashing.

Fallbacks cover:

- missing text,
- empty lists,
- missing slugs,
- missing SEO values,
- missing rich text,
- missing provider images.
