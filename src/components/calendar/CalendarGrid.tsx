import { useRef, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  DAY_LABELS,
  getCalendarDays,
  isSameDay,
  isInRange,
  dateKey,
  type CalendarDay,
} from "@/lib/calendarUtils";
import { CalendarEvent } from "@/hooks/useCalendarEvents";
import { EventDots, EventPopover } from "./EventMarker";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface CalendarGridProps {
  month: number;
  year: number;
  direction: number;
  rangeStart: Date | null;
  rangeEnd: Date | null;
  isDragging: boolean;
  onDragStart: (date: Date) => void;
  onDragMove: (date: Date) => void;
  onDragEnd: () => void;
  getEventsForDate: (key: string) => CalendarEvent[];
  hasNoteForDate: (key: string) => boolean;
  onAddEvent: (dateKey: string, title: string, color: string) => void;
  onRemoveEvent: (id: string) => void;
}

export function CalendarGrid({
  month,
  year,
  direction,
  rangeStart,
  rangeEnd,
  isDragging,
  onDragStart,
  onDragMove,
  onDragEnd,
  getEventsForDate,
  hasNoteForDate,
  onAddEvent,
  onRemoveEvent,
}: CalendarGridProps) {
  const days = getCalendarDays(year, month);

  const isStart = (d: Date) => rangeStart && isSameDay(d, rangeStart);
  const isEnd = (d: Date) => rangeEnd && isSameDay(d, rangeEnd);
  const inRange = (d: Date) => isInRange(d, rangeStart, rangeEnd);

  return (
    <div className="px-4 pb-4 pt-2 sm:px-6">
      {/* Day labels */}
      <div className="mb-2 grid grid-cols-7 text-center">
        {DAY_LABELS.map((d) => (
          <span key={d} className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {d}
          </span>
        ))}
      </div>

      {/* Date cells */}
      <AnimatePresence mode="popLayout" custom={direction}>
        <motion.div
          key={`${year}-${month}`}
          custom={direction}
          initial={{ opacity: 0, y: direction > 0 ? 20 : -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: direction > 0 ? -20 : 20 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="grid grid-cols-7 gap-y-1 select-none"
          onMouseUp={onDragEnd}
          onMouseLeave={() => { if (isDragging) onDragEnd(); }}
          onTouchEnd={onDragEnd}
        >
          {days.map((day, i) => {
            const key = dateKey(day.date);
            const events = getEventsForDate(key);
            return (
              <DateCell
                key={i}
                day={day}
                isRangeStart={!!isStart(day.date)}
                isRangeEnd={!!isEnd(day.date)}
                isInRange={!!inRange(day.date) && !isStart(day.date) && !isEnd(day.date)}
                events={events}
                hasNote={hasNoteForDate(key)}
                isDragging={isDragging}
                onDragStart={() => onDragStart(day.date)}
                onDragMove={() => onDragMove(day.date)}
                onAddEvent={(title, color) => onAddEvent(dateKey(day.date), title, color)}
                onRemoveEvent={onRemoveEvent}
              />
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function DateCell({
  day,
  isRangeStart,
  isRangeEnd,
  isInRange,
  events,
  hasNote,
  isDragging,
  onDragStart,
  onDragMove,
  onAddEvent,
  onRemoveEvent,
}: {
  day: CalendarDay;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  isInRange: boolean;
  events: CalendarEvent[];
  hasNote: boolean;
  isDragging: boolean;
  onDragStart: () => void;
  onDragMove: () => void;
  onAddEvent: (title: string, color: string) => void;
  onRemoveEvent: (id: string) => void;
}) {
  const selected = isRangeStart || isRangeEnd;

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    onDragStart();
  };

  const handleMouseEnter = () => {
    if (isDragging) onDragMove();
  };

  const handleTouchStart = () => {
    onDragStart();
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          onMouseDown={handleMouseDown}
          onMouseEnter={handleMouseEnter}
          onTouchStart={handleTouchStart}
          className={cn(
            "group relative flex h-10 w-full items-center justify-center text-sm transition-all duration-150 sm:h-11",
            !day.isCurrentMonth && "text-muted-foreground/40",
            day.isCurrentMonth && !selected && !isInRange && "text-foreground hover:bg-accent/60 rounded-lg",
            isInRange && "bg-primary/10",
            isRangeStart && "rounded-l-full",
            isRangeEnd && "rounded-r-full",
            (isRangeStart || isRangeEnd) && isInRange && "bg-primary/10"
          )}
        >
          <span
            className={cn(
              "relative z-10 flex h-8 w-8 items-center justify-center rounded-full transition-all duration-150 sm:h-9 sm:w-9",
              selected && "bg-primary text-primary-foreground shadow-md",
              day.isToday && !selected && "ring-2 ring-primary/30"
            )}
          >
            {day.date.getDate()}
            {day.isToday && !selected && (
              <span className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary animate-pulse" />
            )}
          </span>
          {hasNote && day.isCurrentMonth && (
            <span className="pointer-events-none absolute right-1 top-0.5 text-xs font-bold leading-none text-primary" aria-hidden="true">
              +
            </span>
          )}
          <EventDots events={events} />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-3" side="top" align="center">
        <EventPopover events={events} onAdd={onAddEvent} onRemove={onRemoveEvent} />
      </PopoverContent>
    </Popover>
  );
}
