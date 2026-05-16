import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, MapPin, Calendar, Star } from "lucide-react";
import { jerseys } from "@/lib/jerseys";
import { JerseyCard } from "@/components/jersey-card";
import { useState } from "react";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — SWAP FC" },
      { name: "description", content: "A collector's profile on SWAP FC." },
    ],
  }),
  component: Profile,
});

function Profile() {
  const [tab, setTab] = useState<"collection" | "listings" | "reviews">("collection");
  const listings = jerseys.slice(0, 4);
  const collection = jerseys.slice(2, 6);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      {/* Header */}
      <div className="grid md:grid-cols-[auto_1fr_auto] gap-8 items-start border-b hairline pb-12">
        <div className="h-28 w-28 rounded-full bg-secondary border hairline flex items-center justify-center text-3xl font-light">
          MA
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-light tracking-tight">Mikel Aranzabal</h1>
            <ShieldCheck className="h-5 w-5 text-gold" />
          </div>
          <p className="mt-1 text-sm text-muted-foreground">Vintage Iberian football. Selective trades only.</p>
          <div className="mt-4 flex flex-wrap items-center gap-5 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> Bilbao, Spain</span>
            <span className="inline-flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> Member since 2024</span>
            <span className="inline-flex items-center gap-1.5"><Star className="h-3.5 w-3.5 text-gold" /> 4.9 · 87 reviews</span>
          </div>
          <div className="mt-5 flex gap-2">
            <Badge>Verified collector</Badge>
            <Badge>Top swapper</Badge>
            <Badge>Authenticator</Badge>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <button className="rounded-full bg-foreground text-background px-5 py-2.5 text-xs font-medium hover:opacity-90">
            Message
          </button>
          <button className="rounded-full border hairline px-5 py-2.5 text-xs font-medium text-foreground hover:bg-secondary">
            Follow
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border border hairline rounded-lg overflow-hidden mt-8">
        {[
          ["42", "Jerseys"],
          ["18", "Swaps done"],
          ["96", "Avg CertiScore"],
          ["4.9", "Trust rating"],
        ].map(([v, l]) => (
          <div key={l} className="bg-card p-6">
            <p className="font-mono-tight text-3xl font-light">{v}</p>
            <p className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">{l}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="mt-12 flex gap-1 border-b hairline">
        {(["collection", "listings", "reviews"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-3 text-sm capitalize border-b-2 -mb-px transition ${
              tab === t
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-10">
        {tab === "collection" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {collection.map((j) => <JerseyCard key={j.id} jersey={j} />)}
          </div>
        )}
        {tab === "listings" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {listings.map((j) => <JerseyCard key={j.id} jersey={j} />)}
          </div>
        )}
        {tab === "reviews" && (
          <div className="space-y-4 max-w-2xl">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border hairline rounded-md p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Lorenzo C.</p>
                  <span className="text-xs text-gold">★★★★★</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Beautifully packaged. Jersey in pristine condition, exactly as described.
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[10px] uppercase tracking-widest border hairline rounded-full px-2.5 py-1 text-muted-foreground">
      {children}
    </span>
  );
}