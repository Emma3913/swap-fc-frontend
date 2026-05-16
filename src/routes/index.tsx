import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ShieldCheck, Repeat2, Sparkles } from "lucide-react";
import heroJersey from "@/assets/hero-jersey.jpg";
import { jerseys } from "@/lib/jerseys";
import { JerseyCard } from "@/components/jersey-card";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SWAP FC — Trade history" },
      { name: "description", content: "A premium marketplace to discover authentic football jerseys, swap with collectors and build your legacy." },
    ],
  }),
  component: Landing,
});

function Landing() {
  const featured = jerseys.slice(0, 3);
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:80px_80px]" />
        <div className="mx-auto max-w-7xl px-6 pt-24 pb-32 grid lg:grid-cols-12 gap-12 items-center relative">
          <div className="lg:col-span-6 space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border hairline px-3 py-1.5 glass">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span className="text-[11px] tracking-widest uppercase text-muted-foreground">
                Now live · Invitation preview
              </span>
            </div>
            <h1 className="text-balance text-6xl md:text-7xl lg:text-8xl font-light leading-[0.95] tracking-tighter">
              Trade<br />
              <span className="italic font-serif text-muted-foreground">history.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
              A premium marketplace to discover authentic football jerseys, swap with collectors and build your legacy.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/marketplace"
                className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3.5 text-sm font-medium hover:opacity-90 transition"
              >
                Explore marketplace <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                to="/swap"
                className="inline-flex items-center gap-2 rounded-full border hairline px-6 py-3.5 text-sm font-medium text-foreground hover:bg-secondary transition"
              >
                Start swapping
              </Link>
            </div>
            <div className="flex items-center gap-8 pt-6 border-t hairline">
              <Stat value="12K" label="Collectors" />
              <Stat value="48K" label="Jerseys" />
              <Stat value="9.6" label="Trust score" />
            </div>
          </div>
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden shadow-elegant border hairline">
              <img
                src={heroJersey}
                alt="Featured jersey"
                width={1536}
                height={1280}
                className="h-full w-full object-cover"
              />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
                <div className="glass rounded-md p-4 border hairline">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Featured</p>
                  <p className="text-sm font-medium mt-1">Athletic Bilbao · 1984</p>
                </div>
                <span className="glass rounded-full px-3 py-1.5 text-[10px] uppercase tracking-widest text-gold border border-gold/40">
                  Certi 96
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-7xl px-6 py-32">
        <SectionLabel>How it works</SectionLabel>
        <h2 className="mt-4 text-4xl md:text-5xl font-light tracking-tight max-w-2xl">
          Three quiet steps. One refined exchange.
        </h2>
        <div className="mt-16 grid md:grid-cols-3 gap-px bg-border rounded-lg overflow-hidden border hairline">
          <Step n="01" title="List or discover" body="Publish your jersey with a few precise details, or browse a curated library of vintage and modern pieces." />
          <Step n="02" title="Match or buy" body="Swipe through the swap mode, or check out instantly with escrow-protected payment." />
          <Step n="03" title="Trade with confidence" body="Every shipment is tracked. Every jersey carries a CertiScore. Disputes are handled in-platform." />
        </div>
      </section>

      {/* THREE WAYS */}
      <section className="mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-3 gap-6">
        <Pillar icon={<ShieldCheck className="h-5 w-5" />} title="Buy" body="Authenticated purchases with full buyer protection." />
        <Pillar icon={<Repeat2 className="h-5 w-5" />} title="Swap" body="Trade jerseys directly with collectors who match your interests." />
        <Pillar icon={<Sparkles className="h-5 w-5" />} title="Sell" body="Reach a global community of serious collectors." />
      </section>

      {/* CERTISCORE */}
      <section className="mx-auto max-w-7xl px-6 py-32 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5">
          <SectionLabel>CertiScore</SectionLabel>
          <h2 className="mt-4 text-4xl md:text-5xl font-light tracking-tight">
            A single score for trust.
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed max-w-md">
            Each jersey is reviewed by our authentication team and assigned a CertiScore from 0 to 100 — based on fabric, stitching, tags, provenance and seller reputation.
          </p>
        </div>
        <div className="lg:col-span-7">
          <div className="rounded-lg border hairline bg-gradient-card p-10 grid grid-cols-2 gap-8 shadow-elegant">
            {[
              { score: 99, label: "Deadstock / Authenticated" },
              { score: 95, label: "Mint with provenance" },
              { score: 88, label: "Excellent vintage" },
              { score: 72, label: "Good, unverified" },
            ].map((row) => (
              <div key={row.score} className="flex items-baseline gap-4">
                <span className="font-mono-tight text-5xl font-light">{row.score}</span>
                <span className="text-sm text-muted-foreground">{row.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <SectionLabel>Featured</SectionLabel>
            <h2 className="mt-4 text-4xl md:text-5xl font-light tracking-tight">This week's picks</h2>
          </div>
          <Link to="/marketplace" className="hidden md:inline-flex text-sm text-muted-foreground hover:text-foreground items-center gap-1">
            View all <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {featured.map((j) => <JerseyCard key={j.id} jersey={j} />)}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-6 py-32 border-t hairline">
        <SectionLabel>From the collectors</SectionLabel>
        <div className="mt-12 grid md:grid-cols-3 gap-px bg-border border hairline rounded-lg overflow-hidden">
          {[
            { q: "Finally a marketplace that understands the difference between a shirt and a piece of history.", a: "Lorenzo, Milano" },
            { q: "The swap mode is dangerously addictive. I've completed eleven trades this month.", a: "Sean, Glasgow" },
            { q: "CertiScore takes the anxiety out of buying vintage. It just works.", a: "Mikel, Bilbao" },
          ].map((t) => (
            <figure key={t.a} className="bg-card p-10">
              <blockquote className="text-lg font-light leading-relaxed text-foreground">"{t.q}"</blockquote>
              <figcaption className="mt-6 text-xs uppercase tracking-widest text-muted-foreground">— {t.a}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6">
        <div className="rounded-lg border hairline bg-gradient-card p-16 md:p-24 text-center shadow-elegant">
          <h2 className="text-5xl md:text-6xl font-light tracking-tighter text-balance">
            Your collection deserves<br />
            <span className="italic font-serif text-muted-foreground">a serious home.</span>
          </h2>
          <div className="mt-10 flex justify-center gap-3">
            <Link
              to="/marketplace"
              className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3.5 text-sm font-medium hover:opacity-90"
            >
              Join the waitlist <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">{children}</p>;
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-mono-tight text-2xl font-light">{value}</p>
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">{label}</p>
    </div>
  );
}

function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="bg-card p-10 group hover:bg-surface-elevated transition">
      <p className="font-mono-tight text-xs text-muted-foreground">{n}</p>
      <h3 className="mt-8 text-2xl font-light">{title}</h3>
      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{body}</p>
    </div>
  );
}

function Pillar({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="rounded-lg border hairline bg-gradient-card p-8">
      <div className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center text-accent">
        {icon}
      </div>
      <h3 className="mt-6 text-xl font-light">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{body}</p>
    </div>
  );
}