# Fraclog

Fraclog is a personal journal and work showcase built with Next.js and TypeScript. Content is pulled from several Notion databases and rendered using custom React components.

## Features

- **Next.js 15** with React Server Components
- **TypeScript** and **Tailwind CSS** for styling
- **Notion API** used as the CMS for logbook posts, photo shoots and workbench projects
- **GitHub API** integration to enrich workbench projects
- **Upstash Redis** to store per‑page view counts
- **Radix UI** primitives for accessible UI components
- Basic search and tag filtering across all collections
- Simple API route for retrieving page view statistics
- Vitest tests for the Notion client

## Setup

1. Install dependencies
   ```bash
   pnpm install
   ```
2. Provide the following environment variables:
   - `NOTION_TOKEN`
   - `SHOOTS_DB_ID`
   - `LOGBOOK_DB_ID`
   - `WORKBENCH_DB_ID`
   - `ABOUT_PAGE_ID`
   - `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`
   - `GITHUB_TOKEN` (optional, improves GitHub API rate limits)

## Development

Run the local dev server with:
```bash
pnpm dev
```
Open `http://localhost:3000` in your browser.

## Testing

```bash
npm test
```
Tests rely on the Notion and Upstash environment variables listed above.

