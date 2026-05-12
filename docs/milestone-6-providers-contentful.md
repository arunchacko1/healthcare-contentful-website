# Milestone 6 Provider Profiles From Contentful Notes

## What Was Built

Milestone 6 makes provider profiles CMS-driven while preserving safe fallback content.

The project now has:

- `getProviders` for the Providers listing page
- `getProviderBySlug` for individual profile pages
- `getProviderSlugs` for dynamic profile route generation
- `/providers/[slug]` dynamic routes
- Provider metadata
- Person JSON-LD for provider profile pages
- Accessible provider image handling with initials fallback

## Contentful Provider Setup

Create entries using the `provider` content type.

Required fields:

- Name
- Slug
- Role
- Bio
- SEO

Optional fields:

- Specialties
- Image

Recommended starter entries:

- Dr. Lena Morris with slug `lena-morris`
- Nora Patel, PA-C with slug `nora-patel`
- Marcus Lee, FNP with slug `marcus-lee`

## Dynamic Routes

The listing page at `/providers` loads all provider entries.

Each provider links to:

- `/providers/lena-morris`
- `/providers/nora-patel`
- `/providers/marcus-lee`

When Contentful is not configured, the same routes are generated from local fallback providers.

## Field Mapping

- Name maps to provider card title and profile page `h1`
- Slug maps to the URL path
- Role maps to the provider title text
- Specialties map to the sidebar list
- Bio maps to profile body text
- Image maps to the profile photo
- SEO maps to profile metadata

## Image Handling

Provider images use Contentful assets when available.

If a provider image is missing, the UI renders an accessible initials fallback with an `aria-label`.

## JSON-LD

Provider profile pages include `Person` JSON-LD.

The schema includes:

- Provider name
- Profile summary
- Profile URL
- Image URL when available
- Provider role
- Specialties
- Clinic organization details

## Review Notes

- Contentful fetch failures return local fallback providers.
- Unknown provider slugs render the Next.js not found page.
- Provider images are optional.
- The fallback initials state keeps the layout stable when no image exists.

## Quiz Questions

1. Why does the provider listing use normalized `ProviderContent` instead of raw Contentful entries?
2. What does `generateStaticParams` do for provider routes?
3. Why should provider images have a fallback state?
4. Which field controls the provider profile URL?
5. What does provider JSON-LD help describe?
