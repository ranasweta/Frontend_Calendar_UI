import { useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, Sun, Moon } from "lucide-react";
import { CalendarHero } from "./CalendarHero";
import { CalendarGrid } from "./CalendarGrid";
import { NotesPanel } from "./NotesPanel";
import { isSameDay } from "@/lib/calendarUtils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useDarkMode } from "@/hooks/useDarkMode";
import { useCalendarEvents } from "@/hooks/useCalendarEvents";
import { useCalendarNotes } from "@/hooks/useCalendarNotes";

export function WallCalendar() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [direction, setDirection] = useState(0);
  const [rangeStart, setRangeStart] = useState<Date | null>(null);
  const [rangeEnd, setRangeEnd] = useState<Date | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const isMobile = useIsMobile();
  const { isDark, toggle: toggleDark } = useDarkMode();
  const { getEventsForDate, addEvent, removeEvent } = useCalendarEvents();
  const { getNote, setNote, deleteNote } = useCalendarNotes();

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrentMonth((m) => {
      if (m === 11) {
        setCurrentYear((y) => y + 1);
        return 0;
      }
      return m + 1;
    });
  }, []);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setCurrentMonth((m) => {
      if (m === 0) {
        setCurrentYear((y) => y - 1);
        return 11;
      }
      return m - 1;
    });
  }, []);

  const handleDragStart = useCallback((date: Date) => {
    setRangeStart(date);
    setRangeEnd(date);
    setIsDragging(true);
  }, []);

  const handleDragMove = useCallback((date: Date) => {
    if (!isDragging) return;
    setRangeEnd(date);
  }, [isDragging]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, goPrev]);

  return (
    <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-6 p-4 sm:p-8 lg:flex-row">
      {/* Dark mode toggle */}
      <button
        onClick={toggleDark}
        className="absolute right-4 top-4 z-20 rounded-full bg-card p-2 shadow-md ring-1 ring-border/50 transition-colors hover:bg-accent sm:right-8 sm:top-8"
        aria-label="Toggle dark mode"
      >
        {isDark ? <Sun className="h-4 w-4 text-foreground" /> : <Moon className="h-4 w-4 text-foreground" />}
      </button>

      {/* Calendar Card */}
      <div className="flex-1 rounded-2xl bg-card shadow-xl shadow-black/5 ring-1 ring-border/50 overflow-x-hidden">
        <CalendarHero month={currentMonth} year={currentYear} direction={direction} />

        {/* Navigation */}
        <div className="flex items-center justify-between px-4 py-3 sm:px-6">
          <button
            onClick={goPrev}
            className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            aria-label="Previous month"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => {
              setDirection(0);
              setCurrentMonth(today.getMonth());
              setCurrentYear(today.getFullYear());
            }}
            className="text-xs font-medium uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
          >
            Today
          </button>
          <button
            onClick={goNext}
            className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            aria-label="Next month"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Date Grid */}
        <CalendarGrid
          month={currentMonth}
          year={currentYear}
          direction={direction}
          rangeStart={rangeStart}
          rangeEnd={rangeEnd}
          isDragging={isDragging}
          onDragStart={handleDragStart}
          onDragMove={handleDragMove}
          onDragEnd={handleDragEnd}
          getEventsForDate={getEventsForDate}
          onAddEvent={addEvent}
          onRemoveEvent={removeEvent}
          getNote={getNote}
        />
      </div>

      {/* Notes Panel */}
      <div
        className={
          isMobile
            ? "rounded-2xl bg-card shadow-lg shadow-black/5 ring-1 ring-border/50"
            : "w-72 shrink-0 rounded-2xl bg-card shadow-lg shadow-black/5 ring-1 ring-border/50"
        }
      >
        <NotesPanel
          month={currentMonth}
          year={currentYear}
          rangeStart={rangeStart}
          rangeEnd={rangeEnd}
          onMonthSelect={(m, y) => {
            setDirection(m > currentMonth || y > currentYear ? 1 : -1);
            setCurrentMonth(m);
            setCurrentYear(y);
          }}
          getNote={getNote}
          setNote={setNote}
          deleteNote={deleteNote}
        />
      </div>
    </div>
  );
}
