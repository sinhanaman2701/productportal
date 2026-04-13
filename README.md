# PM Platform — Product Management Learning Platform

> A modern, production-grade blog platform for Product Managers. Built with Next.js 15, Payload CMS 3.x, and designed to scale into a full PM learning platform.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![Payload CMS](https://img.shields.io/badge/Payload-3.x-blue?logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgMkwxNCA2SDIwTDE4IDEwTDIwIDE0SDE0TDEyIDE4TDEwIDE0SDRMOCAxMEw0IDZIMTBMMTIgMloiIGZpbGw9ImN1cnJlbnRDb2xvciIvPjwvc3ZnPg==)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-4-cyan?logo=tailwindcss)

## 🚀 Features

### Phase 1 — Blog Platform (Current)

- **CMS Admin Panel** — Rich text editor, media management, draft/publish workflow
- **Blog Frontend** — Homepage with bento grid, article pages, category archives
- **SEO Optimized** — SSR/SSG, JSON-LD, sitemaps, Open Graph tags
- **Performance** — Lighthouse 95+, WebP images, lazy loading, minimal JS bundle
- **Security** — JWT auth, rate limiting, CSRF protection, CSP headers
- **Analytics** — Privacy-first, view tracking, engagement metrics

### Coming Soon (Phase 2+)

- Reader accounts and community authoring
- Comments and reactions system
- Gamified learning with streaks and XP
- Daily challenges (RCA, Guesstimates, Product Design)
- AI-powered coaching and feedback

## 🏗️ Architecture

```
PmPlatform/
├── apps/
│   └── web/                    # Next.js 15 + Payload CMS
│       ├── src/
│       │   ├── app/            # App Router pages
│       │   │   ├── (app)/      # Public blog routes
│       │   │   ├── (payload)/  # CMS admin panel
│       │   │   └── api/        # API endpoints
│       │   ├── collections/    # Payload CMS schemas
│       │   ├── components/     # React components
│       │   ├── lib/            # Utilities and helpers
│       │   └── scripts/        # Seed scripts and utilities
│       └── public/             # Static assets
├── .github/workflows/          # CI/CD pipelines
├── turbo.json                  # Turborepo config
└── pnpm-workspace.yaml         # Monorepo config
```

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 + Framer Motion |
| CMS | Payload CMS 3.x (self-hosted) |
| Database | SQLite (dev) → PostgreSQL (prod) |
| Auth | Custom JWT + iron-session |
| Search | Pagefind (static) |
| Email | Resend + React Email |
| Monorepo | Turborepo + pnpm |

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- pnpm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/sinhanaman2701/ProductPlatform.git
cd ProductPlatform

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) for the blog and [http://localhost:3000/admin](http://localhost:3000/admin) for the CMS admin panel.

### Available Commands

```bash
pnpm dev          # Start development server
pnpm build        # Production build
pnpm lint         # Run ESLint
pnpm typecheck    # TypeScript type checking
pnpm format       # Format code with Prettier
```

## 📁 Project Structure

### Collections (CMS Schemas)

| Collection | Description |
|------------|-------------|
| `Posts` | Blog posts with rich text content, SEO metadata, categories, tags |
| `Categories` | Post categories with order, description, color |
| `Tags` | Post tags for cross-category organization |
| `Media` | Image uploads with automatic variants |
| `Users` | Admin/authored users with RBAC (admin/author/reader) |

### Key Components

| Component | Description |
|-----------|-------------|
| `CategoryBentoGrid` | Homepage category tiles with micro-interactions |
| `ArticleCard` | Blog post cards (featured, default, compact variants) |
| `TabbedBlogSection` | Tabbed content feeds (People's Choice, Top, Newest) |
| `Navbar` | Animated glassmorphism header with Spotlight search |
| `ViewTracker` | Privacy-first article view analytics |

## 🎨 Design System

- **Fonts**: Geist (headings), Inter (body)
- **Colors**: Deep indigo (#4F46E5) + Electric orange (#F97316)
- **Mode**: Bright mode only (light mode for maximum legibility)
- **Radius**: 12px-24px rounded corners
- **Motion**: Subtle micro-interactions with Framer Motion

## 📊 Roadmap

### Phase 1 — Blog Platform (In Progress)
- [x] Monorepo setup
- [x] CMS collections and schemas
- [x] Admin authentication
- [x] Homepage with bento grid
- [x] Article pages with SEO
- [x] Category archives
- [x] Search (Pagefind)
- [ ] Content engagement (likes/claps)
- [ ] Social share buttons

### Phase 2 — Community (3-6 months)
- [ ] Reader registration/login
- [ ] Author submission flow
- [ ] Editorial review queue
- [ ] Comments system
- [ ] User profiles

### Phase 3 — Gamification (6-12 months)
- [ ] Daily challenges
- [ ] Streak system
- [ ] XP and leaderboards
- [ ] Skill trees
- [ ] AI coaching

## 🔒 Security

- JWT-based auth with short expiry + refresh tokens
- Rate limiting on all API endpoints
- CSRF protection on mutations
- CSP headers via middleware
- XSS prevention (DOMPurify)
- SQL injection prevention (parameterized queries)
- File upload validation (MIME, size, extension)

## 📄 License

MIT — See LICENSE for details.

## 👤 Author

**Naman Sinha** — CTO & Founder

- GitHub: [@sinhanaman2701](https://github.com/sinhanaman2701)
- Project: [Product Platform](https://github.com/sinhanaman2701/ProductPlatform)

---

*Built with ❤️ for Product Managers worldwide.*
