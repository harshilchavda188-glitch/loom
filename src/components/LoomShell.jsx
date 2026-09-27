import { Link, NavLink, useLocation } from 'react-router-dom';
import { useMemo, useState } from 'react';

const nav = [
  ['Chats', '/chats', '▣'],
  ['Nearby', '/nearby', '⌁'],
  ['Status', '/status', '◌'],
  ['Calls', '/calls', '⌕'],
  ['Security', '/security', '◇'],
];

export default function LoomShell({ children }) {
  const location = useLocation();
  const [quickOpen, setQuickOpen] = useState(false);
  const [requestCount, setRequestCount] = useState(3);
  const [radios, setRadios] = useState({ ble: true, wifi: true, uwb: false });
  const [sos, setSos] = useState(false);
  const breadcrumb = useMemo(() => nav.find(([, path]) => location.pathname.startsWith(path))?.[0] || 'Command', [location.pathname]);

  const toggleRadio = key => setRadios(current => ({ ...current, [key]: !current[key] }));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-[45] border-b border-border bg-background/95 backdrop-blur">
        <div className="flex min-h-[60px] items-center justify-between gap-3 px-3 sm:px-5">
          <Link to="/nearby" className="flex min-w-0 items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary font-heading font-bold text-primary-foreground">◉</span>
            <span className="min-w-0">
              <span className="block truncate font-heading text-sm font-bold">LOOM / {breadcrumb}</span>
              <span className="hidden font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground sm:block">OFFLINE MESH ACTIVE · 8 NODES</span>
            </span>
          </Link>
          <div className="hidden items-center gap-3 font-mono text-[10px] text-muted-foreground md:flex">
            <span>• OFFLINE MESH ACTIVE • 8 NODES</span><span>🔋 94% BATT</span>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/requests" className="rounded-lg bg-accent px-3 py-2 font-mono text-[10px] font-bold text-accent-foreground transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">PAIR REQ ({requestCount})</Link>
            <button type="button" onClick={() => setQuickOpen(true)} className="grid size-9 place-items-center rounded-lg border border-border bg-card font-mono text-xs transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Open quick navigation">+</button>
          </div>
        </div>
      </header>

      <main className="pb-24">{children}</main>

      <nav className="fixed bottom-0 left-0 right-0 z-[45] border-t border-border bg-card/95 backdrop-blur">
        <div className="mx-auto grid max-w-xl grid-cols-5">
          {nav.map(([label, path, icon]) => (
            <NavLink key={path} to={path} className={({ isActive }) => `flex min-h-[68px] flex-col items-center justify-center gap-1 border-t-2 px-2 text-[10px] font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${isActive ? 'border-accent bg-secondary text-foreground' : 'border-transparent text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
              <span className="font-mono text-lg">{icon}</span><span>{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      {quickOpen && (
        <div className="fixed inset-0 z-[50] bg-foreground/30" onMouseDown={() => setQuickOpen(false)}>
          <aside onMouseDown={event => event.stopPropagation()} className="absolute right-0 top-0 h-full w-full max-w-md overflow-y-auto border-l border-border bg-card p-5 shadow-lg">
            <div className="flex items-start justify-between">
              <div><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">COMMAND HUD</p><h2 className="mt-1 font-heading text-2xl font-bold">Quick navigation</h2></div>
              <button type="button" onClick={() => setQuickOpen(false)} className="rounded-lg border border-border px-3 py-2 text-sm transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Close</button>
            </div>
            <div className="mt-6 rounded-xl bg-muted p-4 font-mono text-xs">
              <div className="mb-3 flex justify-between"><span>PERIPHERAL SWEEP</span><span className="text-success">LIVE</span></div>
              <div className="space-y-2"><div>ALPHA-09 <span className="text-muted-foreground">[42m]</span></div><div>RECON-4 <span className="text-muted-foreground">[118m]</span></div><div>CH 08 · 2.4/5GHz P2P</div></div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-2">
              {[['Broadcast Note','/status'],['QR Handshake','/handshake'],['Form Cluster','/cluster'],['WiFi Direct Voice','/calls'],['Push Waypoint','/status'],['SOS Emergency','#sos']].map(([label, path]) => (
                <Link key={label} to={path} onClick={() => setQuickOpen(false)} className="rounded-xl border border-border bg-background p-4 text-sm font-semibold transition hover:-translate-y-0.5 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{label}</Link>
              ))}
            </div>
            <div className="mt-6 rounded-xl border border-border p-4">
              <p className="font-heading font-bold">Radio transceivers</p>
              <div className="mt-3 space-y-3">
                {Object.entries(radios).map(([key, enabled]) => (
                  <button key={key} type="button" onClick={() => toggleRadio(key)} className="flex w-full items-center justify-between rounded-lg border border-border px-3 py-3 text-left transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <span className="font-mono text-xs uppercase">{key === 'ble' ? 'BLE Mesh Coded PHY · 100m' : key === 'wifi' ? 'WiFi Direct P2P' : 'UWB Proximity'}</span>
                    <span className={`rounded px-2 py-1 font-mono text-[10px] ${enabled ? 'bg-success-muted text-success' : 'bg-secondary text-secondary-foreground'}`}>{enabled ? 'ON' : 'OFF'}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-5 rounded-xl border border-accent p-4" id="sos">
              <p className="font-heading font-bold">Emergency burst</p>
              <p className="mt-1 text-xs text-muted-foreground">Hold to broadcast an SOS beacon across the local mesh.</p>
              <button type="button" onPointerDown={() => { setSos(true); setTimeout(() => setSos(false), 3000); }} className={`mt-4 w-full rounded-lg px-4 py-4 font-heading font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${sos ? 'bg-destructive text-destructive-foreground' : 'bg-accent text-accent-foreground'}`}>{sos ? 'BURST ACTIVE · 3 SEC' : 'HOLD TO ACTIVATE SOS'}</button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
