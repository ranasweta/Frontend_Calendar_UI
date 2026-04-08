export function SpiralBinding() {
  const coils = Array.from({ length: 15 });
  return (
    <div className="relative z-10 flex items-center justify-center bg-gradient-to-b from-muted/60 to-muted/30 py-2 dark:from-muted/30 dark:to-muted/15">
      {/* Shadow line at top */}
      <div className="absolute inset-x-0 top-0 h-px bg-foreground/10" />
      {/* Horizontal rod */}
      <div className="absolute inset-x-4 top-1/2 h-[2.5px] -translate-y-1/2 rounded-full bg-gradient-to-b from-foreground/20 to-foreground/10 shadow-sm" />
      {coils.map((_, i) => (
        <div key={i} className="relative mx-[5px] flex flex-col items-center">
          {/* Top arc (above rod) */}
          <div
            className="h-[10px] w-[10px] rounded-t-full border-2 border-b-0"
            style={{
              borderColor: 'hsl(var(--foreground) / 0.3)',
              background: 'linear-gradient(180deg, hsl(var(--foreground) / 0.08) 0%, transparent 100%)',
            }}
          />
          {/* Bottom arc (below rod) - slightly offset for 3D spiral look */}
          <div
            className="h-[10px] w-[10px] rounded-b-full border-2 border-t-0"
            style={{
              borderColor: 'hsl(var(--foreground) / 0.2)',
              background: 'linear-gradient(0deg, hsl(var(--foreground) / 0.05) 0%, transparent 100%)',
            }}
          />
          {/* Highlight gleam */}
          <div className="absolute left-1/2 top-[3px] h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-white/40 dark:bg-white/20" />
        </div>
      ))}
      {/* Shadow line at bottom */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-foreground/5" />
    </div>
  );
}
