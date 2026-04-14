# PM Learning Platform - Core CMS Foundation

The foundational backend, CMS, and high-performance blog platform for the next-generation PM Learning Ecosystem.

## 🚀 Tech Stack

- **Framework**: Next.js 15.5+ (App Router)
- **CMS**: Payload CMS 3.x (Headless, heavily integrated with local API)
- **Database**: SQLite (Development) / PostgreSQL via Drizzle ORM (Production)
- **Design System**: Tailwind CSS v4, Framer Motion, strict CSS Variables (Bright Mode)
- **Monorepo**: Turborepo + pnpm workspaces

---

## 🛠 Prerequisites

Before setting up the project locally, ensure you have the following installed:
- **Node.js**: v18.20.0 or higher
- **Package Manager**: pnpm (recommended) or npm
- **Docker**: For running a local PostgreSQL instance (optional, defaults to SQLite)
- **Git**

---

## ⚙️ Local Development Setup

### 1. Clone & Install
Because of strict structural peer dependency constraints between the Next.js 15 App router and Payload UI architecture, you must install dependencies utilizing `--legacy-peer-deps` via npm to ensure clean resolution.

```bash
git clone https://github.com/sinhanaman2701/ProductPlatform.git
cd ProductPlatform

# Install root workspace dependencies
npm install --legacy-peer-deps
```

### 2. Configure Environment Variables
You can toggle between SQLite and PostgreSQL simply by changing the `DATABASE_URL` format.

**SQLite (Local):**
```env
DATABASE_URL=file:./database.db
```

**PostgreSQL (Docker):**
Ensure Docker is running, then spin up the DB and point to the container:
```bash
docker compose up -d
```
Then update your `.env`:
```env
DATABASE_URL=postgresql://payload:password@localhost:5432/pmblog
```

Ensure your `apps/web/.env` has the following minimum variables:
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3006
PAYLOAD_SECRET=your-secure-payload-secret
DATABASE_URL=file:./database.db  # Or the postgres URL above
```

### 3. Initialize & Seed the Database
Before running the frontend, ensure your SQLite database contains the core categories required by the Hero Grid layout UI.

```bash
# In the apps/web/ directory:
npx tsx src/scripts/seed-categories.ts
npx tsx src/scripts/seed.ts
```

### 4. Start the Development Server
To avoid conflicts with standard localhost configurations, we rigidly bind the development environment to **PORT 3006**.

```bash
# Back in the root directory (or inside apps/web)
cd apps/web
PORT=3006 npm run dev
```

---

## 🎯 Architecture Access Points

Once the server has spun up successfully and the local compilation finishes, you can access the core modules:

- **Public Client Frontend**: [http://localhost:3006](http://localhost:3006)
- **Payload CMS Admin Dashboard**: [http://localhost:3006/admin](http://localhost:3006/admin)
  - _Login with the credentials defined in your `.env` file (e.g. `admin@pmcraft.test`)_
- **Public API Route**: [http://localhost:3006/api/posts](http://localhost:3006/api/posts)

## 🏗 Key Engineering Principles

1. **Persistent Layout Structures**: Do not attempt to unmount or bypass the `<Navbar />` inside individual routes. It lives explicitly in the `layout.tsx` to maintain complex Framer Motion `AppleSpotlight` layout projection calculations across route changes.
2. **Strict Bright Mode**: We have explicitly discarded standard dark mode tailwind bindings (`dark:bg-black`) to ensure deep focus on typography crispness. All hues are mapped to system CSS Variables (e.g., `var(--color-surface)`).
3. **Payload Local API**: To guarantee insane hydration speeds on SSG pages, Next.js Server Components query Payload through direct local execution context (`getPayloadClient()`), rather than initiating `fetch()` waterfalls.

---
_Property of Naman Sinha (CTO) | Designed for Product Managers_
