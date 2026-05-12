# Milestone 5 Services From Contentful Notes

## What Was Built

Milestone 5 makes Services CMS-driven while preserving safe fallback content.

The project now has:

- `getServices` for the Services listing page
- `getServiceBySlug` for individual service detail pages
- `getServiceSlugs` for dynamic route generation
- `/services/[slug]` dynamic routes
- Service-specific metadata
- MedicalService JSON-LD on service detail pages
- Rich text plain-text fallback rendering for service descriptions

## Contentful Service Setup

Create entries using the `service` content type.

Required fields:

- Title
- Slug
- Summary
- SEO

Optional fields:

- Description
- Care Highlights

Recommended starter entries:

- Primary Care with slug `primary-care`
- Preventive Visits with slug `preventive-visits`
- Care Coordination with slug `care-coordination`

## Dynamic Routes

The listing page at `/services` loads all service entries.

Each service links to:

- `/services/primary-care`
- `/services/preventive-visits`
- `/services/care-coordination`

When Contentful is not configured, the same routes are generated from local fallback services.

## Field Mapping

- Title maps to service card title and detail page `h1`
- Slug maps to the URL path
- Summary maps to listing text and hero intro text
- Description maps to detail page body text
- Care Highlights map to the sidebar list
- SEO maps to detail page metadata

## JSON-LD

Service detail pages include `MedicalService` JSON-LD.

The schema includes:

- Service name
- Service description
- Service URL
- Clinic provider details

## Review Notes

- Contentful fetch failures return local fallback services.
- Unknown service slugs render the Next.js not found page.
- Rich text rendering is intentionally simple in this milestone.
- Full rich text component rendering can be improved in a later article or CMS rendering milestone.

## Quiz Questions

1. Why does the service listing use normalized `ServiceContent` instead of raw Contentful entries?
2. What does `generateStaticParams` do for service detail routes?
3. Why do service pages need fallback content?
4. Which field controls the service URL?
5. What does MedicalService JSON-LD help describe?
