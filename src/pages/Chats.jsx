import { Link } from 'react-router-dom';
import LoomShell from '@/components/LoomShell';
import { useLoomState } from '@/components/LoomData';

export const route = { path: '/chats', layout: 'owner', access: 'authenticated' };
export const nav = { icon: 'MessageSquare', label: 'Chats', section: 'Mesh', order: 10, profiles: null };

export default function Chats() {
  const { peers, setActivePeer } = useLoomState();
  const paired = peers.filter(peer => peer.status === 'paired');
  return <LoomShell><div className="mx-auto max-w-4xl px-4 py-7 sm:px-6"><div><p className="font-mono text-[10px] uppercase tracking-[.2em] text-accent">SCREEN 07</p><h1 className="mt-1 font-heading text-3xl font-bold">Encrypted chats</h1><p className="mt-1 text-sm text-muted-foreground">Only paired nodes can enter a room.</p></div><div className="mt-6 space-y-3">{paired.map(peer => <Link key={peer.id} to={`/chat/${peer.id}`} onClick={() => setActivePeer(peer.id)} className="flex items-center gap-4 rounded-[16px] border border-border bg-card p-4 transition hover:-translate-y-0.5 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><div className="grid size-12 place-items-center rounded-xl bg-success-muted font-heading font-bold text-success">{peer.name.split(' ').map(x => x[0]).join('')}</div><div className="min-w-0 flex-1"><div className="flex justify-between gap-3"><h2 className="font-heading font-bold">{peer.name}</h2><span className="font-mono text-[10px] text-muted-foreground">17:04</span></div><p className="truncate text-sm text-muted-foreground">I am moving to checkpoint three.</p></div><span className="rounded bg-success-muted px-2 py-1 font-mono text-[9px] text-success">✓✓ via BT</span></Link>)}</div></div></LoomShell>;
}
