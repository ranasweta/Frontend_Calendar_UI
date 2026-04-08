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
    setNotes((prev) => ({ ...prev, [key]: value }));
  }, []);

  return { getNote, setNote };
}
