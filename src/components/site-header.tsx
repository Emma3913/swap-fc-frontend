import { Link, useRouterState } from "@tanstack/react-router";

const nav = [
  { to: "/marketplace", label: "Marketplace" },
  { to: "/swap", label: "Swap" },
  { to: "/chat", label: "Messages" },
  { to: "/profile", label: "Profile" },
] as const;

export function SiteHeader() {
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-40 glass border-b hairline">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="inline-block h-2 w-2 rounded-full bg-accent" />
          <span className="text-sm font-medium tracking-[0.2em] text-foreground">
            SWAP FC
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {nav.map((n) => {
            const active = path.startsWith(n.to);
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`px-4 py-2 text-sm rounded-full transition-colors ${
                  active
                    ? "text-foreground bg-secondary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/marketplace"
            className="hidden sm:inline-flex items-center text-xs tracking-wide uppercase text-muted-foreground hover:text-foreground"
          >
            Sign in
          </Link>
          <Link
            to="/swap"
            className="inline-flex items-center rounded-full bg-foreground text-background px-4 py-2 text-xs font-medium tracking-wide hover:opacity-90 transition"
          >
            List a jersey
          </Link>
        </div>
      </div>
    </header>
  );
}