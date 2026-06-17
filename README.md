# Minjae Kim — Automotive Designer Portfolio

A premium digital exhibition site for automotive designer Minjae Kim, built with Next.js, Tailwind CSS, Framer Motion, GSAP, Lenis, and Payload CMS.

## Getting Started

```bash
npm install
cp .env.example .env   # set PAYLOAD_SECRET to a real secret
npm run dev
```

Visit:
- `http://localhost:3000` — the public site
- `http://localhost:3000/admin` — the CMS admin panel (create your first admin user on first visit)

## Seeding example data

To populate the CMS with the placeholder projects and 3D works used during development:

```bash
npm run seed
```

## CMS-managed content

Site content (projects, 3D works, images, specs, persona info, etc.) is managed through Payload CMS at `/admin`. Collections:

- **Projects** — title, slug, category, terrain/vehicle type, hero/side/front/rear images, persona, reference images, speedform images, specifications, process PDF, gallery, keywords, 3D modeling links.
- **3D Works** — title, slug, software used, beauty/clay/wireframe/topology renders.
- **Media** — uploaded images and PDFs.
- **Users** — admin accounts.

## Tech Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS
- Framer Motion + GSAP
- Lenis (smooth scroll)
- Payload CMS 3 (SQLite)
- next-themes (dark/light mode)
