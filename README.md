# Frontend Calendar UI

An interactive wall-style calendar built with React, TypeScript, Vite, and Tailwind CSS.

This project focuses on a clean, modern calendar experience with smooth month navigation, drag-based date range selection, event markers, and month notes.

## Features

- Wall calendar style month view
- Previous/next month navigation and quick jump to today
- Keyboard navigation support (`ArrowLeft`, `ArrowRight`)
- Drag to select a date range
- Add and remove date events
- Month notes panel with mini navigation
- Dark mode toggle
- Local persistence for:
	- events (`localStorage` key: `calendar-events`)
	- notes (`localStorage` key: `calendar-notes`)
	- theme (`localStorage` key: `theme`)

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Radix UI primitives + shadcn/ui style components
- `date-fns` for date handling
- `framer-motion` for transitions
- Vitest + Testing Library
- Playwright (config included)

## Getting Started

### Prerequisites

- Node.js 18+ (recommended)
- npm (or bun)

### Install

Using npm:

```bash
npm install
```

Using bun:

```bash
bun install
```

### Run Development Server

```bash
npm run dev
```

Then open the local URL shown in the terminal (usually `http://localhost:5173`).

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests once with Vitest
- `npm run test:watch` - Run Vitest in watch mode

## Project Structure

```text
src/
	components/
		calendar/      # Calendar-specific UI and interactions
		ui/            # Reusable UI building blocks
	hooks/           # State and persistence hooks
	lib/             # Utilities (dates, helpers)
	pages/           # Route pages
	test/            # Test setup and examples
```

## Main Calendar Behavior

- The entry page renders `WallCalendar`.
- Month transitions update both month and year state.
- Date range selection is handled through drag state (`rangeStart`, `rangeEnd`).
- Event CRUD and filtering are managed by `useCalendarEvents`.
- Notes are saved by month key through `useCalendarNotes`.
- Theme state is controlled by `useDarkMode` and synced to the `dark` class on `document.documentElement`.

## Testing

Run unit/component tests:

```bash
npm run test
```

Run tests in watch mode:

```bash
npm run test:watch
```

## Linting

```bash
npm run lint
```

## Deployment

Build the app:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Deploy the `dist/` output to your hosting provider of choice (Vercel, Netlify, GitHub Pages, etc.).

## Contributing

1. Create a branch for your change.
2. Make and test your updates.
3. Open a pull request with a clear summary.

## License

No license has been specified yet.
