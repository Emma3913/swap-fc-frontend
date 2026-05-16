import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { X, Heart, Bookmark, Sparkles } from "lucide-react";
import { jerseys } from "@/lib/jerseys";
import { CertiBadge } from "@/components/certi-badge";

export const Route = createFileRoute("/swap")({
  head: () => ({
    meta: [
      { title: "Swap Mode — SWAP FC" },
      { name: "description", content: "Discover and match with football jerseys you'd love to trade for." },
    ],
  }),
  component: SwapMode,
});

function SwapMode() {
  const [idx, setIdx] = useState(0);
  const [match, setMatch] = useState<null | typeof jerseys[number]>(null);

  const current = jerseys[idx % jerseys.length];
  const next = jerseys[(idx + 1) % jerseys.length];

  const advance = (action: "like" | "pass" | "save") => {
    if (action === "like" && Math.random() > 0.5) {
      setMatch(current);
    }
    setIdx((i) => i + 1);
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 min-h-[calc(100vh-4rem)] flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">Swap mode</p>
          <h1 className="mt-2 text-3xl font-light tracking-tight">Curated for your taste</h1>
        </div>
        <span className="text-xs text-muted-foreground font-mono-tight">
          {idx + 1} / {jerseys.length}
        </span>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="relative w-full max-w-md aspect-[3/4]">
          {/* Card stack */}
          <SwapCard jersey={next} stacked />
          <SwapCard jersey={current} key={current.id + idx} />
        </div>
      </div>

      <div className="mt-10 flex items-center justify-center gap-4">
        <ActionBtn onClick={() => advance("pass")} label="Pass">
          <X className="h-5 w-5" />
        </ActionBtn>
        <ActionBtn onClick={() => advance("save")} label="Save">
          <Bookmark className="h-5 w-5" />
        </ActionBtn>
        <ActionBtn onClick={() => advance("like")} label="Like" primary>
          <Heart className="h-5 w-5" />
        </ActionBtn>
      </div>

      {match && <MatchModal jersey={match} onClose={() => setMatch(null)} />}
    </div>
  );
}

function SwapCard({ jersey, stacked }: { jersey: typeof jerseys[number]; stacked?: boolean }) {
  return (
    <div
      className={`absolute inset-0 rounded-xl overflow-hidden border hairline bg-card shadow-elegant transition-transform duration-500 ${
        stacked ? "scale-[0.96] translate-y-4 opacity-60" : "scale-100"
      }`}
    >
      <img src={jersey.image} alt={jersey.club} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      <div className="absolute top-4 right-4">
        <CertiBadge score={jersey.certiScore} />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6 space-y-4">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{jersey.league}</p>
          <h2 className="mt-1 text-2xl font-light text-foreground">{jersey.club}</h2>
          <p className="text-sm text-muted-foreground">{jersey.season} · Size {jersey.size} · {jersey.condition}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest glass border hairline rounded-full px-3 py-1.5 text-accent">
            92% swap match
          </span>
          <span className="font-mono-tight text-sm text-foreground ml-auto">€{jersey.price}</span>
        </div>
      </div>
    </div>
  );
}

function ActionBtn({
  children,
  onClick,
  label,
  primary,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
  primary?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`group flex flex-col items-center gap-2`}
    >
      <span
        className={`h-14 w-14 rounded-full border hairline flex items-center justify-center transition ${
          primary
            ? "bg-foreground text-background border-transparent group-hover:scale-105"
            : "bg-card text-foreground group-hover:bg-secondary"
        }`}
      >
        {children}
      </span>
      <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</span>
    </button>
  );
}

function MatchModal({ jersey, onClose }: { jersey: typeof jerseys[number]; onClose: () => void }) {
  const yours = jerseys[(jerseys.indexOf(jersey) + 2) % jerseys.length];
  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-gradient-card border hairline rounded-lg p-10 shadow-elegant relative">
        <button onClick={onClose} className="absolute top-5 right-5 text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </button>
        <div className="text-center">
          <Sparkles className="h-5 w-5 text-gold mx-auto" />
          <p className="mt-3 text-[11px] uppercase tracking-[0.3em] text-gold">It's a match</p>
          <h2 className="mt-3 text-4xl font-light tracking-tight">A trade is possible.</h2>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4">
          <MatchTile label="Yours" jersey={yours} />
          <MatchTile label="Theirs" jersey={jersey} />
        </div>
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">Swap compatibility</p>
          <p className="font-mono-tight text-3xl font-light mt-1">94%</p>
        </div>
        <button className="mt-8 w-full rounded-full bg-foreground text-background py-3.5 text-sm font-medium hover:opacity-90 transition">
          Start negotiation
        </button>
      </div>
    </div>
  );
}

function MatchTile({ label, jersey }: { label: string; jersey: typeof jerseys[number] }) {
  return (
    <div className="border hairline rounded-md overflow-hidden bg-background">
      <div className="aspect-square">
        <img src={jersey.image} alt="" className="h-full w-full object-cover" />
      </div>
      <div className="p-4">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</p>
        <p className="mt-1 text-sm font-medium">{jersey.club}</p>
        <p className="text-xs text-muted-foreground">{jersey.season}</p>
      </div>
    </div>
  );
}