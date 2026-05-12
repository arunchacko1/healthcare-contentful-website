# Milestone 7 Blog And Patient Resources Notes

## What Was Built

Milestone 7 adds CMS-driven publishing features.

The project now has:

- Blog listing from Contentful article entries
- Dynamic article pages at `/blog/[slug]`
- Patient Resources page content from a Contentful page entry
- Resource cards sourced from article entries
- Rich text rendering for Contentful article and page body content
- Article metadata
- BlogPosting JSON-LD on article pages

## Contentful Article Setup

Create entries using the `article` content type.

Required fields:

- Title
- Slug
- Excerpt
- Published Date
- Body
- SEO

Optional fields:

- Author Name

Recommended starter entries:

- Making Preventive Care Easier To Plan
- Questions To Bring To A Primary Care Visit
- Understanding Follow-Up Care

## Patient Resources Setup

Create a `page` entry with:

- Slug: `patient-resources`
- Eyebrow: Patient Resources
- Hero Title
- Hero Text
- Body
- SEO

The Patient Resources page also displays article entries as resource cards.

## Rich Text Rendering

The local renderer supports common Contentful rich text nodes:

- Paragraphs
- Heading level 2
- Heading level 3
- Unordered lists
- Ordered lists
- List items
- Hyperlinks

Unsupported nodes still render their children so content is not silently lost.

## Dynamic Routes

Article detail pages are generated from article slugs.

Fallback article routes include:

- `/blog/making-preventive-care-easier-to-plan`
- `/blog/questions-to-bring-to-a-primary-care-visit`
- `/blog/understanding-follow-up-care`

## JSON-LD

Article pages include `BlogPosting` JSON-LD with:

- Headline
- Description
- Published date
- Author
- Publisher
- Canonical page URL

## Review Notes

- Contentful fetch failures return local fallback articles and page content.
- Unknown article slugs render the Next.js not found page.
- The Patient Resources page uses the existing `page` content type rather than adding a separate resource content type.
- Rich text rendering is intentionally small and readable.

## Quiz Questions

1. Why do article pages use dynamic routes?
2. Which field controls an article URL?
3. Why does the Patient Resources page reuse article entries?
4. What does the rich text renderer do with unsupported nodes?
5. What does BlogPosting JSON-LD help describe?
