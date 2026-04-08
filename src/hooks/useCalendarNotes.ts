import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "calendar-notes";

type NotesMap = Record<string, string>;

export function useCalendarNotes() {
  const [notes, setNotes] = useState<NotesMap>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  const getNote = useCallback(
    (key: string) => notes[key] || "",
    [notes]
  );

  const setNote = useCallback((key: string, value: string) => {
    const normalized = value.trim();
    setNotes((prev) => {
      if (!normalized) {
        const { [key]: _removed, ...rest } = prev;
        return rest;
      }
      return { ...prev, [key]: value };
    });
  }, []);

  const hasNote = useCallback(
    (key: string) => Boolean(notes[key]?.trim()),
    [notes]
  );

  return { getNote, setNote, hasNote };
}
