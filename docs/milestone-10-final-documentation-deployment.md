# Milestone 10: Final Documentation And Deployment Guide

## What Changed

Milestone 10 prepares the project for handoff and deployment.

The project now has:

- CMS setup guide
- Content model guide
- Local development guide
- Deployment guide
- Environment variable guide
- Troubleshooting guide
- Updated README with project overview, setup commands, and documentation links
- Final review notes and quiz questions

No application behavior changes were required for this milestone.

Follow-up local run fix: the `dev` script now runs `next dev --webpack` because Turbopack can panic in this Windows workspace with an `Invalid distDirRoot` error.

## Final Handoff Notes

- Contentful remains optional for local development.
- Missing CMS credentials and missing entries render safe fallback content.
- The Home page visibly indicates fallback content when Contentful is not configured.
- Production deployments should set `NEXT_PUBLIC_SITE_URL` to the canonical public URL.
- Public production should use `CONTENTFUL_PREVIEW=false`.
- Preview deployments can use `CONTENTFUL_PREVIEW=true` with a preview token.
- Provider images are expected to load from `images.ctfassets.net`.

## Deployment Readiness Checklist

- README explains the project purpose, stack, setup commands, and docs.
- CMS setup and content model are documented.
- Environment variables are documented for local and production use.
- Local development workflow is documented.
- Deployment workflow is documented.
- Troubleshooting guidance covers common CMS, build, image, and metadata issues.
- Linting, TypeScript, and production build pass before deployment.
- Home page renders locally with fallback content when Contentful env vars are empty.

## Verification Notes

Verified for this milestone:

```bash
npm run lint
npm run typecheck
npm run build
```

All three commands completed successfully.

The local Home page was also checked through the dev server at `http://127.0.0.1:3000` and returned status `200`. The rendered page included:

- Everwell Family Clinic content
- Header navigation
- Request Appointment CTA
- Fallback Contentful notice when env vars are empty

The in-app browser attempt to open `http://localhost:3000` was blocked by the browser surface with `net::ERR_BLOCKED_BY_CLIENT`, so the page behavior was verified with a local HTTP response instead.

Manual browser verification can be repeated with:

```bash
npm run dev
```

Open `http://localhost:3000` and confirm:

- Everwell Family Clinic home page renders.
- Header navigation appears.
- Request Appointment CTA appears.
- Fallback Contentful notice appears when env vars are empty.
- No server or browser errors appear.

Known local note: some sandboxed Windows PowerShell runs may print a `Test-Path : Access is denied` warning from the npm shim even when commands exit successfully.

## Quiz Questions

1. Which Contentful content type should be created before Page, Service, Provider, and Article entries?
2. Why can local development work with blank Contentful credentials?
3. Which environment variable controls whether the app uses the Contentful Preview API?
4. What should `NEXT_PUBLIC_SITE_URL` be set to in production?
5. Why should `CONTENTFUL_PREVIEW=false` be used for public production deployments?
6. Which guide should an editor read to understand required fields and slug rules?
7. What checks should pass before deployment?
8. What does the Home page fallback notice indicate?
9. Where should a developer look if Contentful images do not load?
10. Why is the PowerShell `Test-Path : Access is denied` warning not always an app failure?
