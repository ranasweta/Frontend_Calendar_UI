import { AnimatePresence, motion } from "framer-motion";
import { MONTH_IMAGES, MONTH_NAMES } from "@/lib/calendarUtils";
import { SpiralBinding } from "./SpiralBinding";

interface CalendarHeroProps {
  month: number;
  year: number;
  direction: number;
}

export function CalendarHero({ month, year, direction }: CalendarHeroProps) {
  return (
    <div className="relative w-full overflow-hidden rounded-t-2xl">
      {/* Hero Image with 3D flip */}
      <div
        className="relative w-full overflow-hidden"
        style={{ perspective: "1200px", height: "240px" }}
      >
        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.div
            key={`${year}-${month}`}
            custom={direction}
            initial={{ rotateX: direction > 0 ? 90 : -90, opacity: 0, transformOrigin: direction > 0 ? "bottom" : "top" }}
            animate={{ rotateX: 0, opacity: 1, transformOrigin: "center" }}
            exit={{ rotateX: direction > 0 ? -90 : 90, opacity: 0, transformOrigin: direction > 0 ? "top" : "bottom" }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="absolute inset-0"
            style={{ backfaceVisibility: "hidden" }}
          >
            <img
              src={MONTH_IMAGES[month]}
              alt={MONTH_NAMES[month]}
              className="h-full w-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-4 left-6">
              <h1 className="font-serif text-3xl font-light tracking-wide text-white drop-shadow-lg sm:text-4xl">
                {MONTH_NAMES[month]}
              </h1>
              <p className="text-sm font-light tracking-widest text-white/80">{year}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Spiral binding */}
      <SpiralBinding />
    </div>
  );
}
