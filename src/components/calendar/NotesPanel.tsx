import { useCalendarNotes } from "@/hooks/useCalendarNotes";
import { dateKey, rangeKey, isSameDay, MONTH_NAMES } from "@/lib/calendarUtils";
import { FileText } from "lucide-react";
import { MiniCalendarNav } from "./MiniCalendarNav";

interface NotesPanelProps {
  month: number;
  year: number;
  rangeStart: Date | null;
  rangeEnd: Date | null;
  onMonthSelect: (month: number, year: number) => void;
}

export function NotesPanel({ month, year, rangeStart, rangeEnd, onMonthSelect }: NotesPanelProps) {
  const { getNote, setNote } = useCalendarNotes();

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

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 border-b border-border/50 px-4 py-3">
        <FileText className="h-4 w-4 text-muted-foreground" />
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Notes
        </span>
      </div>
      <div className="px-4 py-3">
        <p className="mb-2 text-sm font-medium text-foreground/80">{label}</p>
        <textarea
          value={getNote(noteKey)}
          onChange={(e) => setNote(noteKey, e.target.value)}
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
