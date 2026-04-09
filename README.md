# Frontend Calendar UI

An interactive wall-style calendar built with React, TypeScript, Vite, and Tailwind CSS. Features smooth month navigation, drag-based date range selection, event markers, and persistent notes with visual indicators.

## Features

### Calendar Navigation
- **Month View**: Wall calendar style display with day labels and 6-week grid
- **Month Navigation**: Previous/Next buttons to browse months
- **Quick Jump to Today**: Dedicated button to instantly jump to current month
- **Keyboard Shortcuts**: Arrow keys for month navigation (← Previous, → Next)
- **Smooth Transitions**: Animated 3D flip effect when changing months

### Visual Design
- **Hero Image Header**: Month-specific background images with title overlay
- **Spiral Binding**: Decorative spiral binding visual on calendar top
- **Dark Mode Toggle**: Theme switcher in top-right corner (icon in header)
- **Responsive Layout**: Desktop and mobile-optimized design
- **Today Indicator**: Pulsing dot on today's date for quick identification

### Event Management
- **Add Events**: Click any date to add colored events
- **Multiple Events Per Date**: Support for multiple events on the same date
- **Color Coding**: 5 predefined colors for event differentiation
- **Event Markers**: Visual dots display on dates with events
- **Event Removal**: Delete individual events from date popover
- **Event Preview**: Hover over event dots to see details

### Date Range Selection
- **Drag to Select**: Click and drag across dates to select a date range
- **Range Highlighting**: Selected dates highlighted with primary color
- **Range Indicators**: Start and end dates show rounded ends (`rounded-l-full` and `rounded-r-full`)

### Notes System
- **Single Date Notes**: Write notes for individual dates
- **Date Range Notes**: Write notes for a range of selected dates (format: "5 Apr – 10 Apr")
- **Month Notes**: Add general notes for the entire month
- **Note Persistence**: All notes saved to `localStorage` with key `calendar-notes`
- **Note Indicators**: 
  - FileText icon appears on dates with notes
  - Subtle background highlight (`bg-accent/40`) shows dates with notes
  - Hover tooltip displays note preview
- **Note Editing**: Click date in notes panel to edit existing notes
- **Empty Note Cleanup**: Clearing a note removes it from storage

### Mini Calendar Navigation (Notes Panel)
- **Quick Month Selection**: Small calendar in notes panel allows jumping to any month
- **Year Navigation**: Navigate between years from mini calendar
- **Synchronized Viewing**: Clicking a month in mini calendar updates main calendar

### Data Persistence
- **Local Storage**: All data persists in browser without server
  - **Events**: `localStorage` key `calendar-events`
  - **Notes**: `localStorage` key `calendar-notes`
  - **Theme**: `localStorage` key `theme` (dark/light preference)
- **Automatic Saving**: Changes saved instantly without explicit save button
- **Cross-Session Persistence**: Data remains when browser is closed/reopened

### UI Components
- Date cells with hover states
- Event popover for adding/removing events
- Notes textarea with character display
- Mini calendar for quick navigation
- Color picker for events
- Dark/Light mode toggle button

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast builds and dev server
- **Tailwind CSS** for styling
- **Radix UI** primitives + shadcn/ui component library
- **Framer Motion** for smooth animations and transitions
- **Date-fns** for date calculations and formatting
- **Lucide React** for icons
- **Vitest** for unit testing
- **Playwright** for E2E testing

## Getting Started

### Prerequisites
- Node.js 18+
- npm, yarn, or bun

### Installation

```bash
# Using bun
bun install

# Or using npm
npm install
```

### Development

```bash
# Start dev server
bun run dev
# or
npm run dev
```

Server runs on `http://localhost:5173/` by default.

### Build for Production

```bash
bun run build
# Preview production build
bun run preview
```

## Project Structure

```
src/
├── components/
│   ├── calendar/
│   │   ├── WallCalendar.tsx       # Main calendar container
│   │   ├── CalendarHero.tsx       # Hero header with month image
│   │   ├── CalendarGrid.tsx       # Date grid and cells
│   │   ├── EventMarker.tsx        # Event dots and popover
│   │   ├── NotesPanel.tsx         # Notes editor and mini calendar
│   │   ├── MiniCalendarNav.tsx    # Mini calendar for navigation
│   │   └── SpiralBinding.tsx      # Decorative spiral binding
│   └── ui/                         # Reusable shadcn/ui components
├── hooks/
│   ├── useCalendarEvents.ts       # Event state management
│   ├── useCalendarNotes.ts        # Note state persistence
│   ├── useDarkMode.ts             # Dark mode toggle state
│   └── use-mobile.tsx             # Mobile breakpoint detection
├── lib/
│   ├── calendarUtils.ts           # Date calculations and constants
│   └── utils.ts                   # General utilities
└── pages/
    ├── Index.tsx                  # Home page (main calendar)
    └── NotFound.tsx               # 404 page
```

## Scripts

```bash
# Development
bun run dev           # Start dev server

# Production
bun run build         # Build for production
bun run build:dev     # Build in development mode
bun run preview       # Preview production build locally

# Code Quality
bun run lint          # Run ESLint
bun run test          # Run tests once
bun run test:watch    # Run tests in watch mode
```

## How It Works

### State Management
- **Month State**: Tracks current month and year for display
- **Range State**: Stores selected date range (`rangeStart`, `rangeEnd`, `isDragging`)
- **Events State**: Array of events with color and date key
- **Notes State**: Map of date keys to note content
- **Theme State**: Boolean for dark/light mode

### Date Key Format
All dates use ISO format for storage: `YYYY-M-D` (e.g., `2026-4-9`)

### Range Key Format
Date ranges use format: `YYYY-M-D_YYYY-M-D` (e.g., `2026-4-5_2026-4-10`)

### Event Colors
5 predefined colors available:
- Red (`#e74c3c`)
- Blue (`#3498db`)
- Green (`#2ecc71`)
- Orange (`#f39c12`)
- Purple (`#9b59b6`)

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires `localStorage` support
- ES2020+ JavaScript support

## Deployment

Deployed on **Vercel** with automatic deployments on every push to `main` branch.

**Live:** `https://ambient-flip-show-main.vercel.app/`

## Contributing

1. Create a branch for your feature
2. Make changes and test locally
3. Commit with clear messages
4. Push and create a pull request

## License

No license specified.
