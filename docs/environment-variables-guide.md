# Environment Variables Guide

Use `.env.example` as the template for local and deployed environments.

## Variables

| Name | Required | Local Example | Production Guidance |
| --- | --- | --- | --- |
| `CONTENTFUL_SPACE_ID` | Required for CMS content | Contentful space ID | Set from Contentful space settings. |
| `CONTENTFUL_DELIVERY_TOKEN` | Required for published CMS content | Delivery API token | Use a delivery token for public production content. |
| `CONTENTFUL_PREVIEW_TOKEN` | Required only for preview mode | Preview API token | Set for preview deployments or draft testing. |
| `CONTENTFUL_ENVIRONMENT` | Required by the app config | `master` | Usually `master` unless using named Contentful environments. |
| `CONTENTFUL_PREVIEW` | Optional mode switch | `false` | Use `false` for production, `true` only for preview builds. |
| `NEXT_PUBLIC_SITE_URL` | Recommended | `http://localhost:3000` | Set to the canonical public site URL. |

## Local Defaults

Blank Contentful values are allowed for local development. The app renders fallback content when CMS credentials are missing.

Use this local shape:

```bash
CONTENTFUL_SPACE_ID=
CONTENTFUL_DELIVERY_TOKEN=
CONTENTFUL_PREVIEW_TOKEN=
CONTENTFUL_ENVIRONMENT=master
CONTENTFUL_PREVIEW=false
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Preview Mode

Set `CONTENTFUL_PREVIEW=true` only when you want to read draft Contentful content through the Preview API. A preview token must be present.

## Security Notes

- Do not commit `.env.local`.
- Do not expose Contentful tokens in client-side code.
- `NEXT_PUBLIC_SITE_URL` is public by design.
- Rotate tokens if they are accidentally shared.
