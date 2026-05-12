# Milestone 4 Contentful Home Page Notes

## What Was Built

Milestone 4 adds the first Contentful client pathway.

The project now has:

- Contentful SDK dependency
- A server-side Contentful client helper
- Environment variable reading for delivery and preview modes
- A Home page fetch helper
- Safe fallback content when Contentful is not configured or data is missing
- A Home page that renders CMS content when available

## Environment Variables

Use `.env.local` for real values:

- `CONTENTFUL_SPACE_ID`
- `CONTENTFUL_DELIVERY_TOKEN`
- `CONTENTFUL_PREVIEW_TOKEN`
- `CONTENTFUL_ENVIRONMENT`
- `CONTENTFUL_PREVIEW`

`CONTENTFUL_PREVIEW=false` uses the delivery API.

`CONTENTFUL_PREVIEW=true` uses the preview API when a preview token is present.

## Home Page Contentful Mapping

The Home page expects a `page` entry with:

- Slug: `home`
- Eyebrow: maps to the small badge above the hero heading
- Hero Title: maps to the Home page `h1`
- Hero Text: maps to the hero paragraph
- SEO: prepared for future metadata work

If the `home` entry does not exist, the page renders safe starter content.

## Important Types

`HomePageContent` is the simplified shape the React page needs.

It includes:

- `eyebrow`
- `heroTitle`
- `heroText`
- `source`

`source` is either `contentful` or `fallback`, which lets the UI show a helpful local message without throwing an error.

## Review Notes

- The SDK is installed, but only the Home page uses Contentful in this milestone.
- Services, providers, articles, and FAQ items are still static.
- Missing credentials are treated as a normal local-development state.
- Contentful errors are caught and logged on the server.
- The page does not expose Contentful tokens to the browser.

## Quiz Questions

1. Why does `getContentfulClient` return `null` when config is missing?
2. Why does the Home page use a simplified `HomePageContent` type instead of rendering raw Contentful entries?
3. What does `CONTENTFUL_PREVIEW=true` change?
4. Why should missing CMS content render fallback content instead of crashing?
5. Which Contentful `page` slug drives the Home page?
