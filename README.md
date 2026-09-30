# Vigil

**Uptime monitoring for websites and APIs.**

Vigil is a full-stack monitoring SaaS built with Next.js, TypeScript, PostgreSQL, and Prisma. It checks HTTP endpoints, stores check history, tracks incidents, and sends notifications when a monitor goes down or recovers.

> A portfolio project focused on practical full-stack engineering with the Next.js App Router.

[![CI](https://github.com/frshaad/vigil/actions/workflows/ci.yml/badge.svg)](https://github.com/frshaad/vigil/actions/workflows/ci.yml)
![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-4169E1?logo=postgresql)

[Live Demo](https://vigil-eta-nine.vercel.app/)

**Demo account**

```text
Email:    demo@vigil.dev
Password: DemoPassword123!
```

---

## Tech stack

| Area            | Tools                            |
| --------------- | -------------------------------- |
| Framework       | Next.js 16, React 19             |
| Language        | TypeScript                       |
| Database        | PostgreSQL, Neon                 |
| ORM             | Prisma 7                         |
| Authentication  | Better Auth                      |
| Validation      | Zod                              |
| Mutations       | Server Actions, next-safe-action |
| API             | Next.js Route Handlers           |
| UI              | Tailwind CSS, shadcn/ui, Base UI |
| Email           | Resend, React Email              |
| Icons           | Tabler Icons                     |
| Package manager | pnpm                             |
| Code quality    | Oxlint, Oxfmt, Husky             |
| CI              | GitHub Actions                   |
| Deployment      | Vercel                           |

---

## Screenshots

|                                                       |                                                                         |
| :---------------------------------------------------: | :---------------------------------------------------------------------: |
|    ![Vigil dashboard](./docs/images/dashboard.png)    |              ![Monitors list](./docs/images/monitors.png)               |
| ![Monitor details](./docs/images/monitor-details.png) |            ![Notifications](./docs/images/notifications.png)            |
|         ![Dark mode](./docs/images/dark.png)          | ![Notification settings](./docs/images/notifications-settings-dark.png) |
|          ![Mobile](./docs/images/mobile.png)          |           ![Mobile dark mode](./docs/images/mobile-dark.png)            |

---

## What it does

- Create and manage website and API monitors
- Check HTTP endpoints with configurable monitor intervals
- Run manual checks with cooldown protection
- Store status, response time, errors, and check history
- Track open and resolved incidents
- Send in-app and email notifications
- Pause and resume monitors
- View monitor metrics and response-time history
- Authenticate with email/password, Google, or GitHub
- Run the first check automatically after creating a monitor

---

## Engineering highlights

### Next.js App Router

Vigil uses the Next.js App Router as its full-stack application architecture.

- **Server Components** for server-side data fetching
- **Server Actions** for authenticated mutations
- **Route Handlers** for HTTP endpoints such as the monitoring endpoint
- `loading.tsx` and Suspense for loading states
- Cache tags and route revalidation for fresh dashboard data
- React Compiler enabled

### Authentication and authorization

Better Auth handles authentication and sessions.

- Email/password authentication
- Google OAuth
- GitHub OAuth
- Server-side session handling
- User ownership checks for monitors and notification settings

All monitor data and mutations are scoped to the authenticated user.

### TypeScript and validation

TypeScript is used across the application with strict type checking.

Zod validates Server Action input and external configuration data before it reaches the database or external services.

Next.js typed routes are also enabled to catch invalid application routes at build time.

### Database and Prisma

Vigil uses PostgreSQL with Prisma as the ORM.

The database includes relational models for:

- Users and sessions
- Monitors
- Monitor check history
- Incidents
- Notification channels
- In-app notifications
- Subscriptions
- Monitor preferences

Monitor state, check history, and incident transitions are written in a serializable Prisma transaction.

### Monitoring and incident handling

A monitor check follows one server-side flow:

```text
Run check
   ↓
Store check result
   ↓
Update monitor status
   ↓
Detect status transition
   ↓
Create / resolve incident
   ↓
Dispatch notifications
```

Manual checks use an atomic cooldown claim to prevent concurrent duplicate checks.

A protected monitoring Route Handler is available for scheduled execution. The public demo does not run a scheduled worker because the current Vercel Hobby plan only supports daily Cron runs.

### Notifications

Notification delivery is separated from incident detection.

Current notification methods:

- In-app notifications
- Email via Resend and React Email

In-app notifications are available by default. Email channels can be connected to individual monitors.

Email delivery is implemented with Resend, but it is not enabled in the public demo because a verified sending domain is required for production email delivery.

### Feature-based project structure

The codebase is organized around features instead of global type-based folders.

```text
src/
├── app/
├── components/
├── features/
│   ├── monitors/
│   ├── monitoring/
│   ├── notifications/
│   ├── email/
│   └── sidebar/
└── lib/

prisma/
└── schema.prisma
```

This keeps feature-specific UI, actions, data access, and business logic close together.

### Code quality and CI

The project uses:

- Oxlint for linting
- Oxfmt for formatting
- TypeScript type checking
- Husky for Git hooks
- GitHub Actions for CI

The main CI flow is:

```text
Install dependencies
        ↓
Lint
        ↓
Typecheck
        ↓
Production build
```

---

## How the application is structured

The main request flow is intentionally simple:

```text
Next.js App Router
        ↓
Server Components
Server Actions
Route Handlers
        ↓
Feature logic / Data Access
        ↓
Prisma
        ↓
PostgreSQL
```

Monitoring adds a separate server-side flow:

```text
HTTP check
    ↓
Prisma transaction
    ↓
Monitor status
    ↓
Incident
    ↓
Notification
```

---

## Performance

The marketing homepage was tested with Google PageSpeed Insights and scored:

- **97** Performance on mobile
- **100** Performance on desktop

[View PageSpeed Insights report](https://pagespeed.web.dev/analysis/https-vigil-eta-nine-vercel-app/d8sx0w9rhr)

---

## Local development

### Requirements

- Node.js 24+
- pnpm 11+
- PostgreSQL

### Setup

```bash
git clone https://github.com/frshaad/vigil.git
cd vigil

pnpm install
cp .env.example .env

pnpm db:migrate
pnpm db:seed
pnpm dev
```

The app runs at `http://localhost:3000`.

---

## Demo data

The seed includes representative data for:

- Active and paused monitors
- Different HTTP methods
- Healthy and failing monitors
- Open and resolved incidents
- Monitor check history
- In-app notifications
- Email notification channels
- Monitor preferences

```text
Email:    demo@vigil.dev
Password: DemoPassword123!
```

Use these credentials only with the deployed demo environment.

---

## Scope

Vigil focuses on HTTP uptime monitoring and the core workflow around it.

More advanced infrastructure such as multi-region probing, distributed workers, escalation policies, and large-scale job queues is outside the current scope.
