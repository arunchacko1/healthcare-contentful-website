# Milestone 2 Design System Notes

## What Was Built

Milestone 2 adds the static visual and structural foundation for the fictional clinic website.

The project now has:

- Header, footer, and a shared site shell
- Reusable UI components for badges, buttons, cards, containers, sections, and form fields
- Static page shells for Home, Services, Providers, Patient Resources, Blog, Contact, and FAQ
- Shared static content arrays that will later be replaced by Contentful data
- Native accessible FAQ disclosure behavior
- Accessible form labels and visible focus states

## Design Choices

The visual system uses a calm teal accent, white surfaces, readable slate text, and restrained borders.

Cards use an 8px radius, consistent padding, and light borders so repeated content is easy to scan.

The layout uses responsive grids that collapse naturally on smaller screens.

## Important Types

`NavItem` describes a navigation label and URL.

`SummaryCard` describes repeated teaser content with a `title` and `text`. This keeps static placeholder content predictable until Contentful models are added.

Component prop types use `Readonly` so examples encourage immutable props.

## Review Notes

- Content remains static in this milestone.
- The layout shell wraps all routes through `RootLayout`.
- The FAQ uses native `details` and `summary` elements for built-in keyboard behavior.
- The contact form does not submit data yet.
- Static arrays in `src/lib/static-content.ts` make later CMS replacement easier to understand.

## Quiz Questions

1. Why do we build static page shells before connecting Contentful?
2. What problem does the shared `SiteShell` solve?
3. Why is `SummaryCard` useful for repeated content?
4. What accessibility benefit do `details` and `summary` provide?
5. Why do form inputs need visible labels?
