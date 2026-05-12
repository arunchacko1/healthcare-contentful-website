# Everwell Family Clinic

Everwell Family Clinic is a fictional healthcare clinic marketing website built with Next.js, React, TypeScript, Tailwind CSS, and Contentful.

The site demonstrates a production-shaped content workflow with CMS-backed pages, local fallback content, SEO metadata, structured data, accessible navigation, and a simple appointment request form.

**https://new-proj4.vercel.app/**

## Features

- App Router pages for Home, Services, Providers, Patient Resources, Blog, FAQ, and Contact.
- Contentful support for pages, services, providers, articles, FAQ items, SEO metadata, rich text, and provider images.
- Safe fallback content when Contentful credentials or entries are missing.
- JSON-LD for clinic, service, provider, article, FAQ, and breadcrumb data.
- Accessible layout landmarks, skip link, current-page navigation state, forms, and FAQ accordions.

## Setup

Install dependencies:

```bash
npm install
```

Create local environment values:

```bash
cp .env.example .env.local
```

Contentful values can be left blank for local fallback content. Add real values when testing CMS content.

Start the local development server:

```bash
npm run dev
```

Open `http://localhost:3000`.

The dev script uses Next's webpack dev server because Turbopack can panic in this Windows workspace with an `Invalid distDirRoot` error.

## Scripts

```bash
npm run dev
npm run lint
npm run typecheck
npm run build
npm run start
```

## Environment Variables

Use `.env.example` as the source template. See `docs/environment-variables-guide.md` for required values, local defaults, and deployment guidance.

## Documentation

- `docs/cms-setup-guide.md`
- `docs/content-model-guide.md`
- `docs/local-development-guide.md`
- `docs/deployment-guide.md`
- `docs/environment-variables-guide.md`
- `docs/troubleshooting-guide.md`
- `docs/milestone-10-final-documentation-deployment.md`

Earlier milestone notes remain in `docs/` for implementation history and review questions.
