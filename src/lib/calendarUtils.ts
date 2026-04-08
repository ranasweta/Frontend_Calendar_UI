export const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const MONTH_IMAGES: Record<number, string> = {
  0: "https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=800&h=400&fit=crop",
  1: "https://images.unsplash.com/photo-1457269449834-928af64c684d?w=800&h=400&fit=crop",
  2: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=800&h=400&fit=crop",
  3: "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=1200&h=500&fit=crop&auto=format&q=80",
  4: "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?w=800&h=400&fit=crop",
  5: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=400&fit=crop",
  6: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800&h=400&fit=crop",
  7: "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=800&h=400&fit=crop",
  8: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
  9: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?w=800&h=400&fit=crop",
  10: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=400&fit=crop",
  11: "https://images.unsplash.com/photo-1482442120256-9c03866de390?w=800&h=400&fit=crop",
};

export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
}

export function getCalendarDays(year: number, month: number): CalendarDay[] {
  const today = new Date();
  const firstDay = new Date(year, month, 1);
  // Monday = 0, Sunday = 6
  let startDay = firstDay.getDay() - 1;
  if (startDay < 0) startDay = 6;

  const days: CalendarDay[] = [];

  // Previous month fill
  for (let i = startDay - 1; i >= 0; i--) {
    const d = new Date(year, month, -i);
    days.push({
      date: d,
      isCurrentMonth: false,
      isToday: isSameDay(d, today),
    });
  }

  // Current month
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  for (let i = 1; i <= daysInMonth; i++) {
    const d = new Date(year, month, i);
    days.push({
      date: d,
      isCurrentMonth: true,
      isToday: isSameDay(d, today),
    });
  }

  // Next month fill to complete 6 rows
  while (days.length < 42) {
    const d = new Date(year, month + 1, days.length - daysInMonth - startDay + 1);
    days.push({
      date: d,
      isCurrentMonth: false,
      isToday: isSameDay(d, today),
    });
  }

  return days;
}

export function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function isInRange(date: Date, start: Date | null, end: Date | null) {
  if (!start || !end) return false;
  const t = date.getTime();
  const s = Math.min(start.getTime(), end.getTime());
  const e = Math.max(start.getTime(), end.getTime());
  return t >= s && t <= e;
}

export function dateKey(date: Date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

export function rangeKey(start: Date, end: Date) {
  return `${dateKey(start)}_${dateKey(end)}`;
}
