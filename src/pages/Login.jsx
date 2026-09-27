import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const route = { path: '/login', layout: 'public', access: 'public' };

export default function Login() {
  const navigate = useNavigate();
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const unlock = () => { if (pin === '9041' || pin.length >= 4) navigate('/nearby'); else setError(true); };
  return <main className="grid min-h-screen place-items-center bg-background px-4 text-foreground"><div className="w-full max-w-md rounded-[20px] border border-border bg-card p-6 shadow-md sm:p-8"><div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-primary font-bold text-primary-foreground">◉</span><div><p className="font-heading text-lg font-bold">LOOM</p><p className="font-mono text-[9px] text-muted-foreground">OFFLINE NODE UNLOCK</p></div></div><div className="mt-8"><p className="font-mono text-[10px] uppercase tracking-[.2em] text-accent">SCREEN 01</p><h1 className="mt-1 font-heading text-3xl font-bold">Unlock node</h1><p className="mt-2 text-sm text-muted-foreground">Hardware enclave: <span className="text-success">READY</span> · Node ID LOOM#9041</p></div><div className="mt-7 grid grid-cols-3 gap-2">{['1','2','3','4','5','6','7','8','9','⌫','0','✓'].map(key => <button key={key} type="button" onClick={() => key === '✓' ? unlock() : key === '⌫' ? setPin(value => value.slice(0,-1)) : setPin(value => (value + key).slice(0,4))} className="rounded-lg border border-border bg-background py-4 font-mono text-sm transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{key}</button>)}</div>{error && <p className="mt-3 font-mono text-xs text-destructive">PIN mismatch · 2 attempts remaining</p>}<button type="button" onClick={unlock} className="mt-5 w-full rounded-lg bg-primary px-4 py-3 font-bold text-primary-foreground transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Biometric unlock</button><Link to="/" className="mt-4 block text-center text-xs text-muted-foreground hover:text-foreground">Return to briefing</Link></div></main>;
}
