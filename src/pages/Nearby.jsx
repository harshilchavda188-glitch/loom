import { useState } from 'react';
import LoomShell from '@/components/LoomShell';
import { useLoomState } from '@/components/LoomData';

export const route = { path: '/nearby', layout: 'owner', access: 'authenticated' };
export const nav = { icon: 'LocateFixed', label: 'Nearby', section: 'Mesh', order: 20, profiles: null };

export default function Nearby() {
  const { peers, sendRequest } = useLoomState();
  const [filter, setFilter] = useState('All Peers');
  const [selected, setSelected] = useState(null);
  const filters = ['All Peers', '<20m Direct', 'Line-of-Sight', 'Relayed'];
  const visible = peers.filter(peer => filter === 'All Peers' || (filter === '<20m Direct' && peer.distance < 20) || (filter === 'Relayed' && peer.distance > 100) || filter === 'Line-of-Sight');

  return <LoomShell><div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
    <div className="grid gap-5 lg:grid-cols-[1fr_1.1fr]">
      <section className="rounded-[18px] border border-border bg-card p-5 shadow-sm">
        <div className="flex items-center justify-between"><div><p className="font-mono text-[10px] uppercase tracking-[.2em] text-accent">SCREEN 03</p><h1 className="mt-1 font-heading text-2xl font-bold">Nearby radar</h1></div><span className="font-mono text-xs text-success">SWEEP 360°</span></div>
        <div className="mx-auto my-7 grid aspect-square max-w-[360px] place-items-center rounded-full border border-success/30 bg-success-muted/20 p-8">
          <div className="relative grid size-full place-items-center rounded-full border border-success/40 bg-background">
            <div className="absolute h-px w-full bg-border"/><div className="absolute h-full w-px bg-border"/>
            <div className="absolute inset-[18%] rounded-full border border-border"/><div className="absolute inset-[40%] rounded-full border border-border"/>
            {peers.map((peer, index) => <button key={peer.id} type="button" onClick={() => setSelected(peer)} className="absolute grid size-4 place-items-center rounded-full bg-accent shadow-[0_0_0_5px_rgba(201,93,47,.15)] transition hover:scale-125 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" style={{ transform: `rotate(${index * 78 - 40}deg) translateY(-${35 + index * 7}%)` }} aria-label={`Select ${peer.callsign}`}/>) }
            <span className="font-mono text-[10px] text-muted-foreground">YOU · LOOM#9041</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">{filters.map(item => <button key={item} type="button" onClick={() => setFilter(item)} className={`rounded-lg border px-3 py-2 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${filter === item ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-background hover:bg-muted'}`}>{item}</button>)}</div>
      </section>

      <section>
        <div className="mb-3 flex items-end justify-between"><div><p className="font-mono text-[10px] uppercase tracking-[.2em] text-muted-foreground">DISCOVERED NODES</p><h2 className="font-heading text-xl font-bold">Local peers</h2></div><span className="font-mono text-xs">{visible.length} / 08</span></div>
        <div className="space-y-3">{visible.map(peer => <article key={peer.id} className="rounded-[16px] border border-border bg-card p-4 shadow-xs transition hover:-translate-y-0.5 hover:shadow-sm">
          <div className="flex gap-4"><div className="grid size-11 shrink-0 place-items-center rounded-xl bg-muted font-heading font-bold">{peer.name.split(' ').map(x => x[0]).join('')}</div><div className="min-w-0 flex-1"><div className="flex items-center justify-between gap-3"><div><h3 className="font-heading font-bold">{peer.name}</h3><p className="font-mono text-[10px] text-muted-foreground">{peer.callsign} · {peer.radio}</p></div><span className="font-mono text-xs">{peer.distance}m</span></div><div className="mt-3 flex items-center justify-between gap-3"><span className="font-mono text-[10px] text-muted-foreground">{peer.rssi} dBm · {peer.status === 'paired' ? 'PAIRED' : peer.status === 'pending_received' ? 'REQUEST INBOX' : peer.status === 'pending_sent' ? 'PENDING' : 'LOCKED'}</span>{peer.status === 'unpaired' && <button type="button" onClick={() => sendRequest(peer.id)} className="rounded-lg bg-primary px-3 py-2 text-xs font-bold text-primary-foreground transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Send pair request</button>}{peer.status === 'pending_sent' && <span className="rounded-lg bg-secondary px-3 py-2 font-mono text-[10px]">PENDING · 14:22</span>}{peer.status === 'paired' && <span className="rounded-lg bg-success-muted px-3 py-2 font-mono text-[10px] text-success">✓✓ E2EE</span>}</div></div></div>
        </article>)}</div>
      </section>
    </div>
    {selected && <div className="fixed inset-0 z-[50] grid place-items-end bg-foreground/30 p-3 sm:place-items-center"><div className="w-full max-w-lg rounded-[18px] border border-border bg-card p-5 shadow-lg"><div className="flex justify-between"><div><p className="font-mono text-[10px] text-accent">SCREEN 04 · DOSSIER</p><h2 className="font-heading text-2xl font-bold">{selected.name}</h2></div><button type="button" onClick={() => setSelected(null)} className="rounded-lg border border-border px-3 py-2 transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Close</button></div><div className="mt-5 grid gap-3 sm:grid-cols-2">{[['CALL SIGN', selected.callsign],['DISTANCE', `${selected.distance}m`],['TRUST', '82 / 100'],['KEY FINGERPRINT', selected.key]].map(([a,b]) => <div key={a} className="rounded-xl bg-muted p-4"><p className="font-mono text-[9px] text-muted-foreground">{a}</p><p className="mt-1 font-mono text-xs font-semibold">{b}</p></div>)}</div><button type="button" onClick={() => { sendRequest(selected.id); setSelected(null); }} className="mt-5 w-full rounded-lg bg-primary px-4 py-3 font-bold text-primary-foreground transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Send pair request</button></div></div>}
  </div></LoomShell>;
}
