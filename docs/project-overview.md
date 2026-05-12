# Project Overview

## Purpose

This project is a fictional healthcare clinic marketing website built with Next.js, React, TypeScript, Tailwind CSS, and Contentful.

The site will grow in small milestones so each part is easy to understand before the next part is added.

## Milestone 1 Scope

Milestone 1 creates the project foundation:

- Next.js App Router setup
- TypeScript configuration
- Tailwind CSS setup
- Shared global styles
- A simple starter home page
- Documentation structure

Contentful is intentionally not connected yet. That comes after the static foundation is clear.

## Milestone 2 Scope

Milestone 2 adds the shared design system and static page layout:

- Header, footer, and navigation
- Reusable UI components
- Static page shells for the main website sections
- Accessible form and FAQ foundations
- Local design-system review notes

## Milestone 3 Scope

Milestone 3 prepares Contentful setup before live data fetching:

- CMS interfaces for expected content
- Content model plan for Contentful entries
- Environment variable example
- Safe fallback helpers for incomplete CMS content
- Local Contentful setup review notes

## Milestone 4 Scope

Milestone 4 connects the first CMS-driven page:

- Contentful SDK setup
- Reusable server-side client helper
- Home page Contentful fetch helper
- Safe fallback content for local development
- Local notes for Home page field mapping

## Milestone 5 Scope

Milestone 5 adds CMS-driven service pages:

- Services listing from Contentful
- Dynamic service detail routes
- Service metadata and calls to action
- MedicalService JSON-LD
- Safe fallback services for local development

## Milestone 6 Scope

Milestone 6 adds CMS-driven provider profiles:

- Providers listing from Contentful
- Dynamic provider profile routes
- Provider profile metadata and calls to action
- Accessible image handling with initials fallback
- Person JSON-LD for provider profiles

## Milestone 7 Scope

Milestone 7 adds CMS-driven publishing:

- Blog listing from Contentful articles
- Dynamic article pages
- Patient Resources page from CMS page content
- Rich text rendering
- BlogPosting JSON-LD for articles

## Milestone 8 Scope

Milestone 8 adds FAQ and appointment request behavior:

- CMS-driven FAQ sections
- Accessible accordion behavior
- Appointment request form validation
- Success and error states
- No submitted data storage

## Development Principles

- Keep components small and readable.
- Prefer clear TypeScript types over clever code.
- Keep styling consistent and accessible.
- Document CMS and deployment steps as the project grows.
- Add review notes and quiz questions after each milestone.
