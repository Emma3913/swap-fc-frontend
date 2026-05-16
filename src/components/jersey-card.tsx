import { Link } from "@tanstack/react-router";
import type { Jersey } from "@/lib/jerseys";
import { CertiBadge } from "@/components/certi-badge";

export function JerseyCard({ jersey }: { jersey: Jersey }) {
  return (
    <Link
      to="/jersey/$id"
      params={{ id: jersey.id }}
      className="group block"
    >
      <div className="relative overflow-hidden rounded-md bg-gradient-card border hairline aspect-[4/5]">
        <img
          src={jersey.image}
          alt={`${jersey.club} ${jersey.season}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {jersey.swap && (
            <span className="text-[10px] tracking-widest uppercase px-2 py-1 rounded-full glass text-foreground/90">
              Swap
            </span>
          )}
        </div>
        <div className="absolute top-3 right-3">
          <CertiBadge score={jersey.certiScore} />
        </div>
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
            {jersey.league} · Size {jersey.size}
          </p>
          <h3 className="mt-1 text-base font-medium text-foreground">{jersey.club}</h3>
          <p className="text-sm text-muted-foreground">{jersey.season}</p>
        </div>
        <div className="text-right">
          <p className="font-mono-tight text-base text-foreground">€{jersey.price}</p>
          <p className="text-[11px] uppercase tracking-widest text-muted-foreground mt-1">
            {jersey.condition}
          </p>
        </div>
      </div>
    </Link>
  );
}