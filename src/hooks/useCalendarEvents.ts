import { useState, useCallback } from "react";

export interface CalendarEvent {
  id: string;
  title: string;
  color: string;
  dateKey: string;
}

const STORAGE_KEY = "calendar-events";
const EVENT_COLORS = ["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6"];

function loadEvents(): CalendarEvent[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function useCalendarEvents() {
  const [events, setEvents] = useState<CalendarEvent[]>(loadEvents);

  const save = (updated: CalendarEvent[]) => {
    setEvents(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const addEvent = useCallback(
    (dateKey: string, title: string, color: string) => {
      const newEvent: CalendarEvent = {
        id: crypto.randomUUID(),
        title,
        color,
        dateKey,
      };
      save([...events, newEvent]);
    },
    [events]
  );

  const removeEvent = useCallback(
    (id: string) => {
      save(events.filter((e) => e.id !== id));
    },
    [events]
  );

  const getEventsForDate = useCallback(
    (key: string) => events.filter((e) => e.dateKey === key),
    [events]
  );

  return { events, addEvent, removeEvent, getEventsForDate, EVENT_COLORS };
}
