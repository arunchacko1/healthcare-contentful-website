# Milestone 9: SEO, Schema, Accessibility, and Performance Pass

## What Changed

Milestone 9 turns the completed core pages into a more production-shaped site:

- SEO metadata now flows through shared helpers in `src/lib/metadata.ts`.
- Contentful-backed SEO entries drive dynamic pages and the home/resources pages when CMS data is available.
- JSON-LD creation is centralized in `src/lib/schema.ts`.
- The site emits clinic, service, provider, article, FAQ, and breadcrumb structured data.
- Layout landmarks now include a skip link and stable `main` target.
- Navigation marks the current page with `aria-current="page"`.
- Interactive controls have clearer focus states for keyboard users.
- Provider images include explicit sizing hints for Next image optimization.
- The root layout uses a one-hour ISR cadence for CMS-backed pages.

## SEO Choices

The metadata helper intentionally returns absolute page titles for route-level metadata. Contentful SEO titles often already include the clinic name, and absolute titles avoid accidental duplication from the root title template.

The shared helper also sets:

- canonical URLs when a route has a known path;
- `robots` directives for Contentful `noIndex`;
- Open Graph metadata for social previews;
- Twitter card metadata with image support when an SEO image exists.

Fallback content still produces valid SEO metadata so local development and empty Contentful spaces remain usable.

## Schema Choices

Structured data is generated in `src/lib/schema.ts` rather than inside page components. This keeps schema vocabulary consistent and makes future validation easier.

Current helpers cover:

- `MedicalClinic` for the organization/clinic;
- `MedicalService` for service detail pages;
- `Person` for providers;
- `BlogPosting` for articles;
- `FAQPage` for the FAQ route;
- `BreadcrumbList` for routable pages.

JSON-LD output is rendered through `JsonLd`, which escapes `<` characters before injecting the script payload.

## Accessibility Choices

The pass focused on site-wide issues with the highest reuse:

- A skip link lets keyboard users bypass repeated header navigation.
- The primary content region has a stable `id`.
- Header navigation exposes the current route through `aria-current`.
- Links and buttons retain visible focus states.
- Form fields already use labels, `aria-invalid`, and error descriptions.
- FAQ uses native `details` and `summary`, preserving built-in keyboard behavior.

## Performance Choices

The site uses static generation where possible:

- Dynamic service, provider, and article routes expose `generateStaticParams`.
- The root layout exports `revalidate = 3600`, giving CMS-backed pages an hourly ISR refresh.
- Contentful fallbacks keep builds resilient when credentials or entries are missing.
- Provider photos use `next/image`, remote Contentful image allowlisting, explicit dimensions, and `sizes`.
- The site keeps system fonts, avoiding extra font downloads and layout shifts.

## Review Notes

- Validate JSON-LD with Rich Results Test or Schema Markup Validator after deploying to a public URL.
- Confirm Contentful SEO titles are either full titles or short titles consistently; the helper handles both, but editors should follow one convention.
- Audit color contrast again if the visual palette changes.
- If many CMS images are added, extend image sizing rules per component rather than relying on intrinsic dimensions alone.
- For a live clinic, replace fictional address parsing with structured address fields in Contentful.

## Quiz Questions

1. Why does the route metadata helper return absolute titles instead of relying only on the root template?
2. Which schema helper should be used on an article detail page?
3. What accessibility problem does the skip link solve?
4. Why is `aria-current="page"` useful in the header navigation?
5. How does `revalidate = 3600` affect CMS-backed pages?
6. Why should JSON-LD be generated from shared helpers instead of copied into each page?
7. What should happen when Contentful SEO data is missing?
8. Why are explicit image dimensions and `sizes` useful for provider photos?
