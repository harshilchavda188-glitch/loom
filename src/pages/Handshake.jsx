import { useState } from 'react';
import LoomShell from '@/components/LoomShell';

export const route = { path: '/handshake', layout: 'owner', access: 'authenticated' };

export default function Handshake() {
  const [mode, setMode] = useState('mine');
  return <LoomShell><div className="mx-auto max-w-xl px-4 py-8"><p className="font-mono text-[10px] uppercase tracking-[.2em] text-accent">SCREEN 12</p><h1 className="mt-1 font-heading text-3xl font-bold">Offline QR handshake</h1><div className="mt-6 grid grid-cols-2 rounded-xl bg-muted p-1">{[['mine','My offline QR'],['scan','Scan peer QR']].map(([key,label]) => <button key={key} type="button" onClick={() => setMode(key)} className={`rounded-lg px-3 py-3 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${mode === key ? 'bg-card shadow-xs' : 'text-muted-foreground'}`}>{label}</button>)}</div>{mode === 'mine' ? <div className="mt-6 rounded-[18px] border border-border bg-card p-6 text-center"><div className="mx-auto grid aspect-square max-w-[290px] place-items-center rounded-xl bg-white p-5 text-foreground"><div className="grid grid-cols-9 gap-1">{Array.from({length:81},(_,i)=><span key={i} className={`size-3 ${((i*17+i*i)%7)<3 ? 'bg-foreground' : 'bg-white'}`}/>)}</div></div><p className="mt-5 font-mono text-xs">ROTATES IN 00:42 · ONE-TIME KEY</p></div> : <div className="mt-6 grid aspect-[4/3] place-items-center rounded-[18px] border-2 border-accent bg-muted p-8"><div className="w-full border-y-2 border-accent py-20 text-center font-mono text-xs">CAMERA VIEWFINDER<br/><span className="text-muted-foreground">ALIGN PEER QR INSIDE FRAME</span></div></div>}</div></LoomShell>;
}
