import { MONTH_NAMES } from "@/lib/calendarUtils";
import { cn } from "@/lib/utils";

interface MiniCalendarNavProps {
  currentMonth: number;
  currentYear: number;
  onMonthSelect: (month: number, year: number) => void;
}

export function MiniCalendarNav({ currentMonth, currentYear, onMonthSelect }: MiniCalendarNavProps) {
  return (
    <div className="border-t border-border/50 px-4 py-3">
      <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {currentYear}
      </p>
      <div className="grid grid-cols-4 gap-1">
        {MONTH_NAMES.map((name, i) => (
          <button
            key={i}
            onClick={() => onMonthSelect(i, currentYear)}
            className={cn(
              "rounded-md px-1 py-1.5 text-[11px] font-medium transition-all",
              i === currentMonth
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
            )}
          >
            {name.slice(0, 3)}
          </button>
        ))}
      </div>
      {/* Year navigation */}
      <div className="mt-2 flex items-center justify-center gap-3">
        <button
          onClick={() => onMonthSelect(currentMonth, currentYear - 1)}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          {currentYear - 1}
        </button>
        <span className="text-xs font-semibold text-foreground">{currentYear}</span>
        <button
          onClick={() => onMonthSelect(currentMonth, currentYear + 1)}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          {currentYear + 1}
        </button>
      </div>
    </div>
  );
}
