import { useState } from "react";
import { CalendarEvent } from "@/hooks/useCalendarEvents";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Plus, X } from "lucide-react";

const COLOR_OPTIONS = ["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6"];

interface EventMarkerProps {
  events: CalendarEvent[];
  onAdd: (title: string, color: string) => void;
  onRemove: (id: string) => void;
}

export function EventDots({ events }: { events: CalendarEvent[] }) {
  if (events.length === 0) return null;
  return (
    <div className="absolute -bottom-1 left-1/2 flex -translate-x-1/2 gap-0.5">
      {events.slice(0, 3).map((e) => (
        <span
          key={e.id}
          className="h-1 w-1 rounded-full"
          style={{ backgroundColor: e.color }}
        />
      ))}
    </div>
  );
}

export function EventPopover({ events, onAdd, onRemove }: EventMarkerProps) {
  const [title, setTitle] = useState("");
  const [color, setColor] = useState(COLOR_OPTIONS[0]);

  const handleAdd = () => {
    if (!title.trim()) return;
    onAdd(title.trim(), color);
    setTitle("");
  };

  return (
    <div className="space-y-3">
      {events.length > 0 && (
        <div className="space-y-1.5">
          <p className="text-xs font-medium text-muted-foreground">Events</p>
          {events.map((e) => (
            <div key={e.id} className="flex items-center gap-2 text-sm">
              <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: e.color }} />
              <span className="flex-1 truncate">{e.title}</span>
              <button onClick={() => onRemove(e.id)} className="text-muted-foreground hover:text-destructive">
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="space-y-2">
        <div className="flex gap-1.5">
          {COLOR_OPTIONS.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className="h-4 w-4 rounded-full ring-offset-1 transition-all"
              style={{
                backgroundColor: c,
                boxShadow: color === c ? `0 0 0 2px ${c}` : "none",
              }}
            />
          ))}
        </div>
        <div className="flex gap-1.5">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            placeholder="Add event…"
            className="flex-1 rounded-md border border-border bg-background px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-primary/40"
          />
          <button
            onClick={handleAdd}
            className="rounded-md bg-primary p-1 text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
