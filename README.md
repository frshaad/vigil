# Vigil

**Vigil** is a modern website monitoring SaaS that checks your endpoints and notifies you when something goes wrong.

It is built with **Next.js, TypeScript, Prisma, and Better Auth**, with a focus on type safety, maintainable architecture, and a simple developer experience.

> **Status:** In development

## Features

- Monitor websites and HTTP endpoints
- Configurable monitoring intervals
- Track uptime and response status
- Email notifications
- Telegram notifications
- User authentication
- OAuth and email/password authentication
- Protected dashboards and resources
- Subscription-based plans
- Type-safe database access and validation

## Tech Stack

- **Framework:** Next.js
- **Language:** TypeScript
- **UI:** React, Tailwind CSS, shadcn/ui
- **Authentication:** Better Auth
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Validation:** Zod
- **Package Manager:** pnpm

## Architecture

Vigil is built around Next.js App Router and keeps application concerns separated by responsibility.

The application uses:

- **Server Components** for server-rendered UI and data access
- **Server Actions** for application mutations
- **Route Handlers** for HTTP endpoints and external integrations
- **Service-layer logic** for application use cases
- **Repository patterns** where database access benefits from isolation
- **Zod schemas** for validating data at application boundaries
- **Prisma** for type-safe database access

The goal is to keep business logic independent from UI concerns while taking advantage of Next.js server-side capabilities.

## Project Structure

```text
src/
├── app/          # Routes, pages and layouts
├── components/   # Shared UI components
├── features/     # Feature-specific functionality
├── lib/          # Shared infrastructure and utilities
└── ...
```

The project follows a feature-oriented structure where appropriate, while keeping framework-specific concerns inside the `app` layer.

## Getting Started

### Prerequisites

- Node.js
- pnpm
- PostgreSQL

### Installation

```bash
git clone https://github.com/frshaad/vigil.git
cd vigil
pnpm install
```

Create a `.env` file based on `.env.example` and configure the required environment variables.

Then initialize the database:

```bash
pnpm prisma migrate dev
```

Start the development server:

```bash
pnpm dev
```

Open `http://localhost:3000` in your browser.

## Environment Variables

Vigil requires configuration for its database, authentication, application URL, and notification providers.

See `.env.example` for the complete list of required variables.

## Development

Run the available checks with:

```bash
pnpm lint
pnpm typecheck
pnpm build
```

## Why I Built Vigil

Vigil is a practical project for exploring how to build a production-style SaaS application with the modern Next.js ecosystem.

The project focuses on areas that are easy to overlook in smaller applications, including:

- Authentication and authorization
- Data validation and type safety
- Database design
- Application architecture
- Caching
- Error handling
- Background monitoring
- Notifications and external integrations
- Subscription management
- SEO and web performance

Rather than being a collection of isolated demos, Vigil is intended to be developed as a complete application.

## License

This project is for educational and portfolio purposes.
