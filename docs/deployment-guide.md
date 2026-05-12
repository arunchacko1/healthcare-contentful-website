# Deployment Guide

This project is a standard Next.js app and can be deployed to any host that supports Next.js App Router production builds.

## Production Build

Run locally before deployment:

```bash
npm run lint
npm run typecheck
npm run build
```

Start the production server locally when needed:

```bash
npm run start
```

## Hosting Setup

Use these general settings on a Next.js-compatible host:

- Install command: `npm install`
- Build command: `npm run build`
- Start command: `npm run start`
- Output: managed by Next.js

For Vercel-style hosting, use the framework preset for Next.js and add environment variables in the project settings.

## Required Production Environment

Set these values in the deployment environment:

```bash
CONTENTFUL_SPACE_ID=
CONTENTFUL_DELIVERY_TOKEN=
CONTENTFUL_PREVIEW_TOKEN=
CONTENTFUL_ENVIRONMENT=master
CONTENTFUL_PREVIEW=false
NEXT_PUBLIC_SITE_URL=https://your-production-domain.example
```

`CONTENTFUL_PREVIEW=false` should be used for public production deployments unless the deployment is explicitly a draft preview environment.

## Contentful Image Support

`next.config.ts` allows images from `images.ctfassets.net`, which is the Contentful asset host. If the CMS image host changes, update the `images.remotePatterns` setting.

## ISR And Content Updates

The root layout sets `revalidate = 3600`, so CMS-backed static pages can refresh on an hourly cadence after deployment.

## Post-Deploy Checklist

- Home page loads at the production URL.
- Navigation links work across main routes.
- Contentful content appears when credentials and published entries are present.
- Fallback content appears only where CMS entries are intentionally missing.
- Provider images load from Contentful.
- Page metadata uses the production `NEXT_PUBLIC_SITE_URL`.
- JSON-LD validates in a schema testing tool.
- Appointment request form validates and shows local success/error states.
