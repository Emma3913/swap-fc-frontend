export function CertiBadge({ score, size = "sm" }: { score: number; size?: "sm" | "lg" }) {
  const tier = score >= 95 ? "gold" : score >= 90 ? "high" : "mid";
  const color =
    tier === "gold"
      ? "text-gold border-gold/40"
      : tier === "high"
      ? "text-foreground border-foreground/30"
      : "text-muted-foreground border-muted-foreground/30";
  const dim = size === "lg" ? "px-3 py-1.5 text-xs" : "px-2 py-1 text-[10px]";
  return (
    <span
      className={`glass inline-flex items-center gap-1.5 rounded-full border ${color} ${dim} font-mono-tight uppercase tracking-widest`}
    >
      <span className="inline-block h-1 w-1 rounded-full bg-current" />
      Certi {score}
    </span>
  );
}