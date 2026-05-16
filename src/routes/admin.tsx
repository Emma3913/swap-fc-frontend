import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, Flag, MessageSquare, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Trust Center — SWAP FC" },
      { name: "description", content: "Internal trust and safety dashboard." },
    ],
  }),
  component: Admin,
});

function Admin() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">Internal</p>
      <h1 className="mt-2 text-3xl font-light tracking-tight">Trust center</h1>

      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPI label="Reported listings" value="12" icon={<Flag className="h-4 w-4" />} />
        <KPI label="In review" value="34" icon={<ShieldCheck className="h-4 w-4" />} />
        <KPI label="Open disputes" value="3" icon={<AlertTriangle className="h-4 w-4" />} />
        <KPI label="Flagged chats" value="7" icon={<MessageSquare className="h-4 w-4" />} />
      </div>

      <div className="mt-12 grid lg:grid-cols-2 gap-6">
        <Panel title="Reported listings">
          {[
            ["#L-2049", "Counterfeit suspected", "Real Madrid 2002"],
            ["#L-2051", "Misleading photos", "Athletic Bilbao 1984"],
            ["#L-2058", "Price manipulation", "Italy 1994"],
          ].map(([id, reason, j]) => (
            <Row key={id} a={id} b={j} c={reason} />
          ))}
        </Panel>

        <Panel title="CertiScore queue">
          {[
            ["Celtic 1988", "Awaiting", "92 est."],
            ["West Ham 1980", "In review", "87 est."],
            ["Dortmund 1997", "Authenticator assigned", "88 est."],
          ].map(([j, status, est]) => (
            <Row key={j} a={j} b={status} c={est} />
          ))}
        </Panel>

        <Panel title="Open disputes">
          {[
            ["#D-104", "Buyer", "Item not as described"],
            ["#D-107", "Seller", "Non-payment"],
          ].map(([id, party, reason]) => (
            <Row key={id} a={id} b={party} c={reason} />
          ))}
        </Panel>

        <Panel title="Flagged chats">
          {[
            ["#C-880", "Off-platform payment", "High"],
            ["#C-885", "External link", "Medium"],
          ].map(([id, reason, sev]) => (
            <Row key={id} a={id} b={reason} c={sev} />
          ))}
        </Panel>
      </div>
    </div>
  );
}

function KPI({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="border hairline rounded-lg bg-gradient-card p-5">
      <div className="flex items-center justify-between text-muted-foreground">
        <span className="text-[10px] uppercase tracking-widest">{label}</span>
        {icon}
      </div>
      <p className="font-mono-tight text-4xl font-light mt-3">{value}</p>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border hairline rounded-lg bg-card">
      <header className="px-5 py-4 border-b hairline flex items-center justify-between">
        <h3 className="text-sm font-medium">{title}</h3>
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Live</span>
      </header>
      <div className="divide-y divide-border">{children}</div>
    </div>
  );
}

function Row({ a, b, c }: { a: string; b: string; c: string }) {
  return (
    <div className="px-5 py-4 grid grid-cols-[1fr_1fr_auto] gap-3 items-center text-sm hover:bg-surface-elevated transition">
      <span className="font-mono-tight text-xs text-muted-foreground">{a}</span>
      <span className="truncate">{b}</span>
      <span className="text-xs text-muted-foreground">{c}</span>
    </div>
  );
}