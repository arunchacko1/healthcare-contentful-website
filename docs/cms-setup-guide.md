# CMS Setup Guide

This project uses Contentful as the optional CMS for clinic pages and content collections. Local development still works without Contentful because the app renders safe fallback content when credentials or entries are missing.

## 1. Create The Contentful Space

1. Create or open a Contentful space for Everwell Family Clinic.
2. Use the default `master` environment unless the team has a separate environment workflow.
3. Keep the space ID available for `CONTENTFUL_SPACE_ID`.

## 2. Create API Tokens

Create these tokens in Contentful settings:

- Content Delivery API token for published content.
- Content Preview API token for draft preview content.

Use the delivery token for `CONTENTFUL_DELIVERY_TOKEN` and the preview token for `CONTENTFUL_PREVIEW_TOKEN`.

## 3. Create Content Types

Create content types in this order so references are available:

1. SEO Metadata
2. Page
3. Service
4. Provider
5. Article
6. FAQ Item

Use the field names, required settings, and notes from `docs/content-model-guide.md`.

## 4. Add Starter Entries

Recommended starter entries:

- Page entry with slug `home`
- Page entry with slug `patient-resources`
- Three service entries
- Three provider entries
- Three article entries
- Three FAQ item entries
- One SEO Metadata entry for each page or collection item that requires SEO

The site falls back to local content if entries are missing, but real CMS review should include at least one entry for each content type.

## 5. Configure Local Environment

Create `.env.local` from `.env.example` and add values:

```bash
CONTENTFUL_SPACE_ID=your-space-id
CONTENTFUL_DELIVERY_TOKEN=your-delivery-token
CONTENTFUL_PREVIEW_TOKEN=your-preview-token
CONTENTFUL_ENVIRONMENT=master
CONTENTFUL_PREVIEW=false
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Set `CONTENTFUL_PREVIEW=true` only when testing draft content with a preview token.

## 6. Verify CMS Content

Run the app:

```bash
npm run dev
```

Check these routes:

- `/`
- `/patient-resources`
- `/services`
- `/providers`
- `/blog`
- `/faq`

If Contentful entries do not appear, confirm tokens, environment name, content type IDs, slugs, and publish status.
