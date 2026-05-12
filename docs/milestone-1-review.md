# Milestone 1 Review Notes

## What Was Built

Milestone 1 creates the basic application shell for the fictional clinic website.

The project now has:

- A Next.js App Router structure under `src/app`
- TypeScript configuration
- Tailwind CSS through PostCSS
- Global styles with accessible focus states
- A simple starter home page
- Initial project documentation

## Important Types

`RootLayoutProps` describes the props accepted by the root layout.

The `children` field uses `ReactNode` because a layout can wrap many valid React values, including pages, components, text, and fragments.

## Review Notes

- The starter page is intentionally simple.
- No CMS data is fetched in this milestone.
- The color palette is restrained and readable.
- The folder structure leaves room for shared components and CMS utilities in later milestones.
- The Next.js config keeps the build rooted in this project folder.

## Quiz Questions

1. Why is Contentful not connected in Milestone 1?
2. What does `ReactNode` allow the layout to receive?
3. Why do we define global focus styles?
4. What is the purpose of `tsconfig.json`?
5. Why is the first page static instead of CMS-driven?
