"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CHRISTMAS_INVENTORY, StandaloneXmasSKU, calcChristmasMath } from "./christmas-inventory";
function Reel(p: { imgs: string[]; info: string }) {
const [on, setOn] = useState(true), [t, setT] = useState(0);
useEffect(() => {
if (!on) return;
const v = setInterval(() => setT(s => (s + 0.1 >= 12 ? 0 : +(s + 0.1).toFixed(1))), 100);
return () => clearInterval(v);
}, [on]);
const i = t < 4 ? 0 : t < 8 ? 1 : 2;
return (
<div className="relative w-full h-48 bg-black overflow-hidden">
<img src={p.imgs[i]} alt="" className="w-full h-full object-cover" />
<div className="absolute top-2 left-2 bg-red-600 px-2 py-0.5 rounded text-[10px] font-black">● VIDEO {i + 1}/3 • {p.info}</div>
<div className="absolute bottom-2 inset-x-2 flex gap-2">
<button type="button" onClick={() => setOn(!on)} className="bg-black border border-sky-400 rounded px-2 text-xs">{on ? "❚❚" : "▶"}</button>
<input type="range" min={0} max={11.9} step={0.1} value={t} onChange={e => setT(+e.target.value)} className="flex-1 accent-red-500" />
</div></div>); }
export default function StandaloneChristmasStore() {
const [cat, setCat] = useState("all"), [tier, setTier] = useState("all"), [q, setQ] = useState("");
const [sheet, setSheet] = useState(false), [buy, setBuy] = useState(false);
const [cart, setCart] = useState<Record<string, number>>({}), [tab, setTab] = useState<Record<string, number>>({});
const [spec, setSpec] = useState<StandaloneXmasSKU | null>(null);
const list = CHRISTMAS_INVENTORY.filter(x => (cat === "all" || x.cat === cat) && (tier === "all" || x.tier === tier) && x.name.toLowerCase().includes(q.toLowerCase()));
const sel = CHRISTMAS_INVENTORY.filter(x => cart[x.id] > 0);
const tot = sel.length ? calcChristmasMath(sel.reduce((s, x) => s + x.w * cart[x.id], 0), sel.reduce((s, x) => s + x.ship, 0)) : null;
function tog(id: string) { setCart(p => { const n = { ...p }; if (n[id]) delete n[id]; else n[id] = 1; return n; }); }
return (
<div className="min-h-screen bg-slate-950 text-white pb-24">
<div className="sticky top-0 z-50 bg-slate-950 border-b-2 border-red-500 p-3 flex flex-wrap justify-between gap-2 text-xs font-black">
<Link href="/" className="text-sky-400 text-sm">← Back to ALBS Nexus</Link>
<div className="flex flex-wrap gap-2">
<button onClick={() => setSheet(false)} className="px-3 py-1.5 rounded bg-red-600">📸 Cards ({list.length})</button>
<button onClick={() => setSheet(true)} className="px-3 py-1.5 rounded bg-green-500 text-black">📋 Spec Sheet ({list.length})</button>
{tot && <button onClick={() => setBuy(true)} className="px-3 py-1.5 rounded bg-amber-400 text-black">🛒 Checkout (${tot.grandTotal.toFixed(2)})</button>}
</div></div>
<div className="max-w-7xl mx-auto p-4">
<div className="border border-red-500 rounded-xl bg-slate-900 p-3 mb-4 space-y-2 text-xs font-bold">
<input value={q} onChange={e => setQ(e.target.value)} placeholder="Search 165 SKUs..." className="px-3 py-1.5 rounded-full bg-black border border-red-500 w-full max-w-md" />
<div className="flex flex-wrap gap-1.5">
{[["all","All (165)"],["lights","Lights (55)"],["gifts","Gifts (55)"],["wrapping","Wrapping (30)"],["decor","Decor (25)"]].map(([k,l]) => <button key={k} onClick={() => setCat(k)} className={cat===k?"px-2.5 py-1 rounded-full bg-red-600":"px-2.5 py-1 rounded-full bg-slate-800"}>{l}</button>)}
{[["all","All Tiers"],["T1","T1 $3.99"],["T2","T2 $5.99"],["T3","T3 $7.99"]].map(([k,l]) => <button key={k} onClick={() => setTier(k)} className={tier===k?"px-2.5 py-1 rounded-full bg-sky-600":"px-2.5 py-1 rounded-full bg-black border border-sky-400"}>{l}</button>)}
</div></div>
{sheet ? (<div className="bg-slate-900 border-2 border-green-500 rounded-xl p-3 overflow-x-auto"><table className="w-full text-xs text-left"><thead><tr className="border-b border-red-500 text-amber-300"><th>Buy</th><th>SKU</th><th>3 Photos + Specs</th><th>Item</th><th>Avail</th><th>Total</th><th>10% Net</th></tr></thead><tbody>{list.map(x => { const m = calcChristmasMath(x.w, x.ship); return (<tr key={x.id} className="border-b border-slate-800"><td><input type="checkbox" checked={!!cart[x.id]} onChange={() => tog(x.id)} /></td><td className="font-bold text-sky-400">{x.id}</td><td className="flex gap-1 py-1">{x.imgs.map((u,i) => <img key={i} src={u} onClick={() => setSpec(x)} className="w-10 h-8 object-cover rounded cursor-pointer" alt="" />)}<button onClick={() => setSpec(x)} className="px-2 bg-amber-400 text-black font-black rounded">📋 Specs</button></td><td>{x.name}</td><td className="text-green-400 font-bold">{x.stock}</td><td className="text-green-400 font-black">${m.grandTotal.toFixed(2)}</td><td className="text-amber-300">+${m.netProfit10.toFixed(2)}</td></tr>); })}</tbody></table></div>) : (
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">{list.map(x => { const c = tab[x.id] ?? 0, m = calcChristmasMath(x.w, x.ship), ck = !!cart[x.id]; return (<div key={x.id} className="bg-slate-900 border border-red-500/70 rounded-xl overflow-hidden flex flex-col justify-between"><div>{c === 3 ? <Reel imgs={x.imgs} info={`$${m.retailSubtotal.toFixed(2)}`} /> : <div className="relative h-48 bg-black"><img src={x.imgs[c]} alt="" className="w-full h-full object-cover" /><span className="absolute top-2 left-2 bg-black/85 text-amber-300 px-2 py-0.5 rounded text-[10px] font-black">{x.id} • {x.tierLabel}</span><span className="absolute top-2 right-2 bg-green-700 px-2 py-0.5 rounded text-[10px] font-black">{x.stock} Avail</span></div>}<div className="grid grid-cols-5 gap-1 p-1.5 bg-black text-[10px] font-black">{[0,1,2].map(i => <button key={i} onClick={() => setTab({...tab,[x.id]:i})} className="h-10 rounded overflow-hidden border border-sky-400"><img src={x.imgs[i]} alt="" className="w-full h-full object-cover" /></button>)}<button onClick={() => setTab({...tab,[x.id]:c===3?0:3})} className="h-10 rounded bg-rose-600">{c===3?"⏹ Pics":"▶ Video"}</button><button onClick={() => setSpec(x)} className="h-10 rounded bg-amber-400 text-black">📋 Specs</button></div><div className="p-3 text-xs space-y-1"><div className="font-black text-sm">{x.name}</div><div className="flex justify-between"><span>Price (+10%) + Ship:</span><b>${m.retailSubtotal.toFixed(2)} + ${m.shipping.toFixed(2)}</b></div><div className="flex justify-between text-green-400 font-black text-sm"><span>Total (w/ Tax+CC):</span><span>${m.grandTotal.toFixed(2)}</span></div></div></div><div className="p-3 pt-0 grid grid-cols-2 gap-2 text-xs font-black"><button onClick={() => tog(x.id)} className="py-2 rounded border border-green-400 text-green-400">{ck?"✓ Selected":"+ Multi-Buy"}</button><button onClick={() => { setCart({...cart,[x.id]:1}); setBuy(true); }} className="py-2 rounded bg-green-500 text-black">Acquire →</button></div></div>); })}</div>)}</div>
{spec && (() => { const m = calcChristmasMath(spec.w, spec.ship); return (<div className="fixed inset-0 bg-black/85 flex items-center justify-center z-50 p-4"><div className="bg-slate-900 border-2 border-amber-400 rounded-xl max-w-lg w-full p-4 space-y-3 text-xs"><div className="flex justify-between font-black text-amber-300 text-sm"><span>📋 SPECS • {spec.id} ({spec.stock} Avail)</span><button onClick={() => setSpec(null)}>✕</button></div><div className="grid grid-cols-3 gap-2">{spec.imgs.map((u,i) => <img key={i} src={u} alt="" className="w-full h-24 object-cover rounded border border-sky-400" />)}</div><Reel imgs={spec.imgs} info={`$${m.retailSubtotal.toFixed(2)}`} /><div className="font-black text-base">{spec.name}</div><div className="bg-black p-3 rounded space-y-1"><div>Tier: <b>{spec.tierLabel}</b> • Wholesale: <b>${spec.w.toFixed(2)}</b> • Our 10% Net: <b className="text-amber-300">+${m.netProfit10.toFixed(2)}</b></div><div>Retail: <b>${m.retailSubtotal.toFixed(2)}</b> + Ship: <b>${m.shipping.toFixed(2)}</b> + Tax/CC: <b>${(m.tax+m.ccFee).toFixed(2)}</b> = <b className="text-green-400">${m.grandTotal.toFixed(2)}</b></div></div><button onClick={() => { setCart({...cart,[spec.id]:1}); setSpec(null); setBuy(true); }} className="w-full py-2 rounded bg-green-500 text-black font-black">Acquire →</button></div></div>); })()}
{buy && tot && (<div className="fixed inset-0 bg-black/85 flex items-center justify-center z-50 p-4"><div className="bg-slate-900 border-2 border-green-500 rounded-xl max-w-md w-full p-4 space-y-3 text-xs"><div className="flex justify-between font-black text-amber-300"><span>🛒 CHECKOUT ({sel.length} SKUs)</span><button onClick={() => setBuy(false)}>✕</button></div><div className="bg-black p-3 rounded">Subtotal: <b>${tot.retailSubtotal.toFixed(2)}</b> + Ship: <b>${tot.shipping.toFixed(2)}</b> + Tax/CC: <b>${(tot.tax+tot.ccFee).toFixed(2)}</b><div className="text-green-400 font-black text-base mt-1">Total: ${tot.grandTotal.toFixed(2)}</div></div><button onClick={() => { alert("LOCKED: $" + tot.grandTotal.toFixed(2)); setCart({}); setBuy(false); }} className="w-full py-2 rounded bg-green-500 text-black font-black">⚡ Confirm (${tot.grandTotal.toFixed(2)})</button></div></div>)}
</div>); }
