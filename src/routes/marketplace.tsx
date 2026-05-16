import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { jerseys } from "@/lib/jerseys";
import { JerseyCard } from "@/components/jersey-card";

export const Route = createFileRoute("/marketplace")({
  head: () => ({
    meta: [
      { title: "Marketplace — SWAP FC" },
      { name: "description", content: "Discover authenticated football jerseys from collectors worldwide." },
    ],
  }),
  component: Marketplace,
});

const LEAGUES = ["La Liga", "Premier League", "Bundesliga", "Serie A", "International", "Scottish Premier"];
const SIZES = ["S", "M", "L", "XL"] as const;
const CONDITIONS = ["Mint", "Excellent", "Good", "Fair"] as const;

function Marketplace() {
  const [q, setQ] = useState("");
  const [swapOnly, setSwapOnly] = useState(false);
  const [minScore, setMinScore] = useState(0);
  const [size, setSize] = useState<string | null>(null);

  const list = useMemo(
    () =>
      jerseys.filter((j) => {
        if (swapOnly && !j.swap) return false;
        if (j.certiScore < minScore) return false;
        if (size && j.size !== size) return false;
        if (q && !`${j.club} ${j.season} ${j.league}`.toLowerCase().includes(q.toLowerCase())) return false;
        return true;
      }),
    [q, swapOnly, minScore, size],
  );

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">Marketplace</p>
          <h1 className="mt-3 text-5xl font-light tracking-tight">Discover</h1>
        </div>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search club, season, league..."
            className="w-full bg-secondary border hairline rounded-full pl-11 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-10">
        <aside className="lg:col-span-3 space-y-8">
          <FilterGroup title="Filters" icon={<SlidersHorizontal className="h-3.5 w-3.5" />}>
            <ToggleRow label="Swap available" value={swapOnly} onChange={setSwapOnly} />
          </FilterGroup>

          <FilterGroup title="League">
            <ul className="space-y-2">
              {LEAGUES.map((l) => (
                <li key={l} className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                  {l}
                </li>
              ))}
            </ul>
          </FilterGroup>

          <FilterGroup title="Size">
            <div className="flex gap-2 flex-wrap">
              {SIZES.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(size === s ? null : s)}
                  className={`h-9 w-9 rounded-full text-xs border hairline transition ${
                    size === s
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </FilterGroup>

          <FilterGroup title="Condition">
            <ul className="space-y-2">
              {CONDITIONS.map((c) => (
                <li key={c} className="text-sm text-muted-foreground hover:text-foreground cursor-pointer">
                  {c}
                </li>
              ))}
            </ul>
          </FilterGroup>

          <FilterGroup title={`CertiScore · min ${minScore}`}>
            <input
              type="range"
              min={0}
              max={99}
              step={1}
              value={minScore}
              onChange={(e) => setMinScore(Number(e.target.value))}
              className="w-full accent-foreground"
            />
          </FilterGroup>
        </aside>

        <div className="lg:col-span-9">
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">
              <span className="text-foreground font-mono-tight">{list.length}</span> results
            </p>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Newest first</p>
          </div>
          {list.length === 0 ? (
            <div className="border hairline rounded-lg p-20 text-center">
              <p className="text-sm text-muted-foreground">No jerseys match these filters.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {list.map((j) => <JerseyCard key={j.id} jersey={j} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="border-t hairline pt-6">
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h4 className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{title}</h4>
      </div>
      {children}
    </div>
  );
}

function ToggleRow({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className="flex items-center justify-between w-full text-sm text-foreground"
    >
      <span>{label}</span>
      <span
        className={`h-5 w-9 rounded-full transition relative ${value ? "bg-accent" : "bg-secondary"}`}
      >
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-background transition ${value ? "left-4" : "left-0.5"}`}
        />
      </span>
    </button>
  );
}