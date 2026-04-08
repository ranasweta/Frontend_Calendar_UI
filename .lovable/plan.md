# Wall Calendar Enhancement Plan

## What We're Building

Five enhancements to make the calendar look and feel like a real physical wall calendar (per the reference image), plus functional improvements.

## 1. Spiral Binding Visual

Add a decorative spiral/coil binding strip at the top of the calendar card — a row of repeating oval ring shapes using CSS, sitting between the hero image and the hanging point. This gives the physical wall-calendar look from the reference image. The spiral will be a purely visual element rendered with CSS pseudo-elements or inline SVG loops.  
while changing the month the whole page should flip looking like a real paper changing and the animation should be smooth 

## 2. Dark Mode Toggle

Add a dark mode toggle button (sun/moon icon) in the top corner of the page. Update the dark theme colors in `index.css` to use warm dark tones (not the current default cold blues) to match the calendar's warm aesthetic. Toggle the `dark` class on `<html>`.

## 3. Event Markers

- Add an events system with localStorage persistence (new `useCalendarEvents` hook)
- Small colored dots on date cells indicating events exist
- Click a date → can add/view events via a small popover or inline in the notes panel
- Events have a title and color (from a small palette)

## 4. Drag-to-Select Date Range

Replace the click-click range selection with mouse drag:

- `onMouseDown` on a date cell starts selection (sets rangeStart)
- `onMouseMove` over cells updates rangeEnd in real-time (highlight follows cursor)
- `onMouseUp` finalizes the range
- Touch support via `onTouchStart`/`onTouchMove`/`onTouchEnd`

## 5. Refined Dark Theme Colors

Update `.dark` in `index.css` with warm dark palette:

- Background: dark warm gray (~`30 15% 10%`)
- Card: slightly lighter warm gray
- Primary stays the warm orange accent

## Files to Create/Modify


| File                                        | Action                                                |
| ------------------------------------------- | ----------------------------------------------------- |
| `src/index.css`                             | Update dark theme colors                              |
| `src/components/calendar/SpiralBinding.tsx` | **New** — spiral coil visual component                |
| `src/components/calendar/CalendarHero.tsx`  | Add spiral below hero image                           |
| `src/components/calendar/WallCalendar.tsx`  | Add dark mode toggle, drag-select state, events state |
| `src/components/calendar/CalendarGrid.tsx`  | Add drag handlers, event dot indicators               |
| `src/hooks/useCalendarEvents.ts`            | **New** — events CRUD + localStorage                  |
| `src/components/calendar/EventMarker.tsx`   | **New** — colored dot + add-event popover             |
| `src/components/calendar/NotesPanel.tsx`    | Show events for selected date alongside notes         |
| `src/pages/Index.tsx`                       | Minor layout tweaks                                   |


## Spiral Design Detail

A horizontal bar with ~15-20 repeating coil shapes made of CSS ovals with borders, rendered as a flex row of small circles with a connecting dark strip behind them — mimicking the wire binding of a wall calendar.