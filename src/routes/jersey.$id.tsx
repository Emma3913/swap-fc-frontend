import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ShieldCheck, Truck, RotateCcw, Repeat2 } from "lucide-react";
import { findJersey } from "@/lib/jerseys";
import { CertiBadge } from "@/components/certi-badge";

export const Route = createFileRoute("/jersey/$id")({
  loader: ({ params }) => {
    const jersey = findJersey(params.id);
    if (!jersey) throw notFound();
    return { jersey };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.jersey.club} ${loaderData.jersey.season} — SWAP FC` },
          { name: "description", content: loaderData.jersey.story },
          { property: "og:image", content: loaderData.jersey.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <h1 className="text-3xl font-light">Jersey not found</h1>
      <Link to="/marketplace" className="mt-6 inline-block text-sm text-muted-foreground hover:text-foreground">
        Back to marketplace
      </Link>
    </div>
  ),
  errorComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <h1 className="text-3xl font-light">Something went wrong</h1>
    </div>
  ),
  component: JerseyDetail,
});

function JerseyDetail() {
  const { jersey } = Route.useLoaderData();
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <Link to="/marketplace" className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground">
        ← Back to marketplace
      </Link>

      <div className="mt-8 grid lg:grid-cols-12 gap-12">
        {/* Gallery */}
        <div className="lg:col-span-7">
          <div className="rounded-lg overflow-hidden border hairline bg-gradient-card aspect-[4/5] shadow-elegant group">
            <img
              src={jersey.image}
              alt={`${jersey.club} ${jersey.season}`}
              className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
          </div>
          <div className="mt-3 grid grid-cols-4 gap-3">
            {[jersey.image, jersey.image, jersey.image, jersey.image].map((src, i) => (
              <div key={i} className={`aspect-square rounded border hairline overflow-hidden ${i === 0 ? "ring-1 ring-accent/50" : ""}`}>
                <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              {jersey.league} · Size {jersey.size}
            </p>
            <h1 className="mt-3 text-4xl font-light tracking-tight">{jersey.club}</h1>
            <p className="mt-1 text-lg text-muted-foreground">{jersey.season}</p>
          </div>

          <div className="flex items-center justify-between border-y hairline py-6">
            <p className="font-mono-tight text-4xl font-light">€{jersey.price}</p>
            <CertiBadge score={jersey.certiScore} size="lg" />
          </div>

          <div className="space-y-3">
            <button className="w-full inline-flex items-center justify-center rounded-full bg-foreground text-background py-4 text-sm font-medium hover:opacity-90 transition">
              Buy now
            </button>
            {jersey.swap && (
              <Link
                to="/chat"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full border hairline py-4 text-sm font-medium hover:bg-secondary transition"
              >
                <Repeat2 className="h-4 w-4" /> Propose a swap
              </Link>
            )}
          </div>

          <div className="border hairline rounded-lg bg-gradient-card p-6">
            <h3 className="text-xs uppercase tracking-widest text-muted-foreground">The story</h3>
            <p className="mt-3 text-sm text-foreground leading-relaxed">{jersey.story}</p>
          </div>

          <div className="border hairline rounded-lg p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center text-sm font-medium">
              {jersey.seller.name.split(" ").map((n: string) => n[0]).join("")}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium flex items-center gap-2">
                {jersey.seller.name}
                {jersey.seller.verified && <ShieldCheck className="h-4 w-4 text-gold" />}
              </p>
              <p className="text-xs text-muted-foreground">{jersey.seller.country} · {jersey.seller.rating} ★</p>
            </div>
            <Link to="/profile" className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground">
              View
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs text-muted-foreground">
            <div className="border hairline rounded-md p-4">
              <Truck className="h-4 w-4 mb-2" />
              Tracked global shipping
            </div>
            <div className="border hairline rounded-md p-4">
              <RotateCcw className="h-4 w-4 mb-2" />
              7-day return window
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}