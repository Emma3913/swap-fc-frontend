import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Send, ShieldCheck, Check, X } from "lucide-react";
import { jerseys } from "@/lib/jerseys";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "Messages — SWAP FC" },
      { name: "description", content: "Negotiate swaps safely inside SWAP FC." },
    ],
  }),
  component: Chat,
});

const conversations = [
  { id: "1", name: "Lorenzo Conti", last: "Would you add €60 on top?", time: "2m", unread: true },
  { id: "2", name: "Sean O'Connor", last: "Deal. Sending tomorrow.", time: "1h", unread: false },
  { id: "3", name: "Mikel Aranzabal", last: "I can swap the '98 instead.", time: "yest", unread: false },
  { id: "4", name: "Markus Weber", last: "Pictures incoming.", time: "2d", unread: false },
];

function Chat() {
  const [active, setActive] = useState("1");
  const yours = jerseys[0];
  const theirs = jerseys[1];

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">Messages</p>
      <h1 className="mt-2 text-3xl font-light tracking-tight">Negotiations</h1>

      <div className="mt-8 grid grid-cols-12 gap-px bg-border border hairline rounded-lg overflow-hidden h-[70vh]">
        {/* Sidebar */}
        <aside className="col-span-4 lg:col-span-3 bg-card overflow-y-auto">
          {conversations.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={`w-full text-left p-4 border-b hairline transition ${
                active === c.id ? "bg-surface-elevated" : "hover:bg-surface-elevated/50"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-xs font-medium">
                  {c.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium truncate">{c.name}</p>
                    <span className="text-[10px] text-muted-foreground">{c.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{c.last}</p>
                </div>
                {c.unread && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
              </div>
            </button>
          ))}
        </aside>

        {/* Main */}
        <section className="col-span-8 lg:col-span-9 bg-background flex flex-col">
          <header className="px-6 py-4 border-b hairline flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center text-xs font-medium">LC</div>
            <div>
              <p className="text-sm font-medium flex items-center gap-1.5">
                Lorenzo Conti <ShieldCheck className="h-3.5 w-3.5 text-gold" />
              </p>
              <p className="text-[11px] text-muted-foreground">Verified collector · Italy</p>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <Bubble from="them">Hi — interested in your Athletic Bilbao '84. Would you consider a swap?</Bubble>
            <Bubble from="you">Hey Lorenzo, possibly. What do you have in mind?</Bubble>
            <Bubble from="them">My Italy '94 home. Mint, with original tags.</Bubble>

            <SwapProposalCard yours={yours} theirs={theirs} delta={60} />

            <Bubble from="them">Would you add €60 on top?</Bubble>

            <div className="flex items-start gap-3 max-w-md mx-auto">
              <div className="rounded-md border hairline glass px-4 py-3 flex items-start gap-3">
                <ShieldCheck className="h-4 w-4 text-gold mt-0.5 shrink-0" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  For your safety, keep negotiations and payments inside SWAP FC.
                </p>
              </div>
            </div>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="border-t hairline p-4 flex items-center gap-3"
          >
            <input
              placeholder="Write a message..."
              className="flex-1 bg-secondary rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
            />
            <button className="h-11 w-11 rounded-full bg-foreground text-background flex items-center justify-center hover:opacity-90">
              <Send className="h-4 w-4" />
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

function Bubble({ from, children }: { from: "you" | "them"; children: React.ReactNode }) {
  const mine = from === "you";
  return (
    <div className={`flex ${mine ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-md rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          mine ? "bg-foreground text-background rounded-br-sm" : "bg-secondary text-foreground rounded-bl-sm"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function SwapProposalCard({
  yours,
  theirs,
  delta,
}: {
  yours: typeof jerseys[number];
  theirs: typeof jerseys[number];
  delta: number;
}) {
  return (
    <div className="max-w-xl mx-auto border hairline rounded-lg bg-gradient-card p-6 shadow-elegant">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Swap proposal</p>
        <span className="text-[10px] text-muted-foreground font-mono-tight">#SP-2049</span>
      </div>
      <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center">
        <Side label="You give" jersey={yours} />
        <span className="text-muted-foreground text-xs uppercase tracking-widest">for</span>
        <Side label="You get" jersey={theirs} />
      </div>
      <div className="mt-5 flex items-center justify-between border-t hairline pt-4">
        <p className="text-xs text-muted-foreground">Cash difference</p>
        <p className="font-mono-tight text-sm">+ €{delta} from you</p>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-2">
        <button className="rounded-full border hairline py-2.5 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground inline-flex items-center justify-center gap-1.5">
          <X className="h-3.5 w-3.5" /> Reject
        </button>
        <button className="rounded-full bg-foreground text-background py-2.5 text-xs uppercase tracking-widest inline-flex items-center justify-center gap-1.5 hover:opacity-90">
          <Check className="h-3.5 w-3.5" /> Accept
        </button>
      </div>
    </div>
  );
}

function Side({ label, jersey }: { label: string; jersey: typeof jerseys[number] }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">{label}</p>
      <div className="rounded-md border hairline overflow-hidden">
        <div className="aspect-square">
          <img src={jersey.image} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="p-3">
          <p className="text-xs font-medium truncate">{jersey.club}</p>
          <p className="text-[10px] text-muted-foreground">{jersey.season}</p>
        </div>
      </div>
    </div>
  );
}