import { useState, useEffect, useRef } from "react";
import { dateKey, rangeKey, isSameDay, MONTH_NAMES } from "@/lib/calendarUtils";
import { FileText, Trash2, Check } from "lucide-react";
import { MiniCalendarNav } from "./MiniCalendarNav";

interface NotesPanelProps {
  month: number;
  year: number;
  rangeStart: Date | null;
  rangeEnd: Date | null;
  onMonthSelect: (month: number, year: number) => void;
  getNote: (key: string) => string;
  setNote: (key: string, value: string) => void;
  deleteNote: (key: string) => void;
}

export function NotesPanel({ month, year, rangeStart, rangeEnd, onMonthSelect, getNote, setNote, deleteNote }: NotesPanelProps) {
  const [saved, setSaved] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  let noteKey: string;
  let label: string;

  if (rangeStart && rangeEnd && !isSameDay(rangeStart, rangeEnd)) {
    noteKey = rangeKey(rangeStart, rangeEnd);
    const fmt = (d: Date) => `${d.getDate()} ${MONTH_NAMES[d.getMonth()].slice(0, 3)}`;
    label = `${fmt(rangeStart)} – ${fmt(rangeEnd)}`;
  } else if (rangeStart) {
    noteKey = dateKey(rangeStart);
    label = `${rangeStart.getDate()} ${MONTH_NAMES[rangeStart.getMonth()]}`;
  } else {
    noteKey = `month-${year}-${month}`;
    label = `${MONTH_NAMES[month]} ${year}`;
  }

  const handleChange = (value: string) => {
    setNote(noteKey, value);
    setSaved(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setSaved(false), 2000);
  };

  const handleDelete = () => {
    deleteNote(noteKey);
    setSaved(false);
  };

  // Reset saved indicator on key change
  useEffect(() => {
    setSaved(false);
  }, [noteKey]);

  const noteValue = getNote(noteKey);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 border-b border-border/50 px-4 py-3">
        <FileText className="h-4 w-4 text-muted-foreground" />
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Notes
        </span>
        {saved && (
          <span className="ml-auto flex items-center gap-1 text-xs text-primary animate-in fade-in">
            <Check className="h-3 w-3" />
            Saved
          </span>
        )}
      </div>
      <div className="px-4 py-3">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-sm font-medium text-foreground/80">{label}</p>
          {noteValue && (
            <button
              onClick={handleDelete}
              className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
              aria-label="Delete note"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
        <textarea
          value={noteValue}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Write your notes here…"
          className="min-h-[120px] w-full resize-none rounded-lg border-0 bg-accent/30 p-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/30 sm:min-h-[180px]"
        />
      </div>
      <MiniCalendarNav
        currentMonth={month}
        currentYear={year}
        onMonthSelect={onMonthSelect}
      />
    </div>
  );
}
