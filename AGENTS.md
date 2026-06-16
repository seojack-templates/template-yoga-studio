# AGENTS.md — template-yoga-studio

> A standalone SEOJack marketing-site template for a yoga studio. Part of the NEO-1 workspace (see root ../../../AGENTS.md).

## What it is
A lean, self-contained Next.js 16 demo website template for a calming yoga studio: class schedule, instructor profiles, a new-student offer, workshops, and retreats. It is one of the SEOJack template showcase sites — deployed to its own domain and registered in the SEOJack templates registry (`tpl_yoga_studio`). The template can also be used as a "builder seed" for generating client sites (the footer credit is stripped in that mode).

## Stack
- Next.js 16 (App Router) + React 19, TypeScript 5.7
- Scoped CSS only — one CSS literal in `app/styles.ts` with every selector prefixed `.yoga-studio-demo` (no Tailwind/Convex/Clerk despite Tailwind devDeps still present in `package.json`)
- `lucide-react` for icons
- Self-hosted on Vercel; images via `cdn.seojack.website`

## Structure
- `app/layout.tsx` — SEO metadata, canonical, OG/Twitter, JSON-LD
- `app/page.tsx` — renders `<DemoBody />`
- `app/DemoBody.tsx` — `'use client'`; font link + scoped CSS inject + sections
- `app/styles.ts` — single scoped CSS literal (`.yoga-studio-demo`)
- `app/content.ts`, `app/data.ts` — typed, realistic page content
- `app/primitives.tsx` — motion primitives (Reveal, Headline, Magnetic, Marquee)
- `app/SeojackCredit.tsx` — footer credit / inbound link (stripped as builder seed)
- `app/sitemap.ts`, `app/robots.ts` — indexable for organic discovery
- `next.config.ts` — image remote patterns; deliberately no frame-blocking headers (embedded in iframe)

## Commands
Package manager: npm (has `package-lock.json`).
- Install: `npm install`
- Dev: `npm run dev` (http://localhost:3000)
- Build: `npm run build`
- Start (prod): `npm run start`
- Lint: `npm run lint`
- Test: none defined

## Conventions & notes
- No env vars required to run locally.
- Do NOT set `X-Frame-Options: DENY` or `frame-ancestors 'none'` — this template is embedded in an iframe on seojack.net's `/demo/[id]` viewer (see `next.config.ts`).
- All CSS selectors must stay prefixed with `.yoga-studio-demo` to keep styles scoped.
- Live site: https://yoga-studio.templates.seojack.website
- Registry id: `tpl_yoga_studio`; showcased at https://seojack.net/templates/tpl_yoga_studio
- Deploy: own GitHub repo + own Vercel project, production domain `https://yoga-studio.templates.seojack.website`. See `docs/templates-github-org.md` in the workspace.

## Provenance
Clone of https://github.com/seojack-templates/template-yoga-studio.git. Default branch main.
