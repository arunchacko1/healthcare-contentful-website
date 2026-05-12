# Local Development Guide

## Prerequisites

- Node.js compatible with Next.js 16.
- npm.
- Optional Contentful space and API tokens.

## Install

```bash
npm install
```

## Environment Setup

Copy the example file:

```bash
cp .env.example .env.local
```

Contentful values can stay blank when working on layout, styling, or fallback behavior. Add real values when testing CMS content.

## Run Locally

```bash
npm run dev
```

Open `http://localhost:3000`.

The dev script uses Next's webpack dev server. In this Windows workspace, Turbopack can start and then fail with an `Invalid distDirRoot` panic, while webpack mode runs normally.

## Quality Checks

Run these before handoff or deployment:

```bash
npm run lint
npm run typecheck
npm run build
```

## Fallback CMS Behavior

When `CONTENTFUL_SPACE_ID`, `CONTENTFUL_DELIVERY_TOKEN`, or `CONTENTFUL_ENVIRONMENT` is missing, `getContentfulClient` returns `null`. Pages then render local fallback content.

The Home page shows a fallback notice when it is using starter content. This is expected when `.env.local` has no Contentful credentials.

## Useful Routes

- `/`
- `/services`
- `/services/primary-care`
- `/providers`
- `/providers/lena-morris`
- `/patient-resources`
- `/blog`
- `/blog/making-preventive-care-easier-to-plan`
- `/faq`
- `/contact`
