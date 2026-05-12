# Troubleshooting Guide

## Install Problems

If dependencies fail to install, confirm Node.js and npm are available:

```bash
node --version
npm --version
```

Then run:

```bash
npm install
```

## Missing CMS Content

Expected local behavior:

- Blank Contentful credentials render fallback content.
- Missing entries render fallback content.
- The Home page may show a notice that starter content is being used.

If CMS content should appear, check:

- `CONTENTFUL_SPACE_ID`
- `CONTENTFUL_DELIVERY_TOKEN`
- `CONTENTFUL_ENVIRONMENT`
- content type IDs
- entry slugs
- published status
- whether `CONTENTFUL_PREVIEW` is set correctly

## Preview Content Does Not Appear

Preview mode requires:

```bash
CONTENTFUL_PREVIEW=true
CONTENTFUL_PREVIEW_TOKEN=your-preview-token
```

If preview mode is false, the app uses the Content Delivery API and only published content appears.

## Build Fails

Run checks individually:

```bash
npm run lint
npm run typecheck
npm run build
```

Common causes:

- invalid TypeScript changes,
- missing imports,
- unsupported Contentful field shapes,
- invalid environment values,
- image host not allowed in `next.config.ts`.

## Contentful Images Do Not Load

Confirm assets are hosted by `images.ctfassets.net`. That host is allowlisted in `next.config.ts`.

If using another asset host, update `images.remotePatterns`.

## Metadata Or Canonical URLs Look Wrong

Check `NEXT_PUBLIC_SITE_URL`. It should be:

- `http://localhost:3000` locally,
- the canonical production URL in deployment.

Check SEO Metadata entries for the expected title, description, canonical path, and no-index flag.

## PowerShell npm Warning

In some sandboxed Windows environments, npm commands may complete successfully but print a warning like:

```text
Test-Path : Access is denied
```

If the command exit code is `0` and the expected lint, typecheck, or build output completes, this warning is from the PowerShell npm shim and is not an app failure.

## Local Page Does Not Load

Start the dev server:

```bash
npm run dev
```

Then open `http://localhost:3000`.

If the port is already in use, stop the other process or run Next on another port.

## Turbopack distDirRoot Panic

If `next dev` starts and then fails with:

```text
Invalid distDirRoot: ".next". distDirRoot should not navigate out of the projectPath.
```

Use the project script:

```bash
npm run dev
```

The script runs `next dev --webpack`, which avoids this local Turbopack panic.
