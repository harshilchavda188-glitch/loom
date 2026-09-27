import { Link } from 'react-router-dom';

export const route = { path: '/', layout: 'public', access: 'public' };

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-16">
        <div className="flex items-center justify-between border-b border-border pb-5">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground font-heading text-lg">◉</div>
            <div>
              <p className="font-heading text-lg font-bold tracking-tight">LOOM</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Offline tactical mesh</p>
            </div>
          </div>
          <Link to="/login" className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Unlock node</Link>
        </div>

        <div className="grid gap-12 py-16 md:grid-cols-[1.2fr_.8fr] md:items-end">
          <div>
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.24em] text-accent">NO CLOUD · NO CELL · LOCAL MESH</p>
            <h1 className="max-w-3xl font-heading text-5xl font-bold leading-[0.95] tracking-[-0.04em] sm:text-7xl">Talk without internet.</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">LOOM turns nearby radios into a private conversation layer. Discover peers, approve a zero-trust pairing, then exchange messages, voice, waypoints and status packets over simulated local links.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/nearby" className="rounded-lg bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Open nearby radar</Link>
              <Link to="/security" className="rounded-lg border border-border bg-card px-5 py-3 text-sm font-bold transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Inspect security</Link>
            </div>
          </div>
          <div className="rounded-[18px] border border-border bg-muted p-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <span className="font-mono text-xs font-semibold">MESH TELEMETRY</span>
              <span className="rounded bg-success-muted px-2 py-1 font-mono text-[10px] text-success">ACTIVE</span>
            </div>
            <div className="space-y-4 py-5 font-mono text-xs">
              <div className="flex justify-between"><span className="text-muted-foreground">TRANSPORT</span><span>BLE / P2P / RELAY</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">PAIR ISOLATION</span><span>ENFORCED</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">CLOUD ROUTE</span><span>DISABLED</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">LOCAL NODES</span><span>08 ONLINE</span></div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 border-t border-border pt-7 sm:grid-cols-3">
          {[
            ['01', 'Discover', 'See nearby nodes without exposing chat or location.'],
            ['02', 'Pair', 'Approve a peer before any private capability unlocks.'],
            ['03', 'Talk', 'Use the local mesh for messages, calls and waypoints.'],
          ].map(([n, title, copy]) => (
            <article key={n} className="border-l-2 border-accent pl-4">
              <p className="font-mono text-xs text-accent">{n}</p>
              <h2 className="mt-2 font-heading text-xl font-bold">{title}</h2>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{copy}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
