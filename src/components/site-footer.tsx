import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t hairline mt-32">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-accent" />
              <span className="text-sm font-medium tracking-[0.2em]">SWAP FC</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground max-w-sm leading-relaxed">
              A premium marketplace for football jerseys. Buy, sell and swap with collectors worldwide.
            </p>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest text-muted-foreground">Platform</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/marketplace" className="hover:text-foreground text-muted-foreground">Marketplace</Link></li>
              <li><Link to="/swap" className="hover:text-foreground text-muted-foreground">Swap mode</Link></li>
              <li><Link to="/admin" className="hover:text-foreground text-muted-foreground">Trust center</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest text-muted-foreground">Company</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><span className="text-muted-foreground">About</span></li>
              <li><span className="text-muted-foreground">Careers</span></li>
              <li><span className="text-muted-foreground">Press</span></li>
            </ul>
          </div>
        </div>
        <div className="mt-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8 border-t hairline">
          <p className="text-xs text-muted-foreground">© 2026 SWAP FC. All rights reserved.</p>
          <p className="text-xs text-muted-foreground tracking-widest uppercase">Trade history.</p>
        </div>
      </div>
    </footer>
  );
}