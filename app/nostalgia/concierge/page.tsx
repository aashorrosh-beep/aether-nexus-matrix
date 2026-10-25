"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function ConciergeTrapPage() {
  const [item, setItem] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("q");
    if (q) setItem(q);
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!item || !email) return;
    fetch("/api/vip-signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, item, notes, sla: "Within 3 Hours", hold: "24-Hour Hold" })
    }).catch(() => {});
    setSent(true);
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-6 md:p-12 font-sans">
      <div className="max-w-2xl mx-auto bg-zinc-900 border-2 border-amber-400 rounded-3xl p-6 md:p-8 space-y-5 shadow-2xl">
        <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
          <span className="bg-amber-400 text-black font-black text-xs uppercase px-3 py-1 rounded-full">🎩 3-HOUR SOURCING • 24-HOUR HOLD</span>
          <Link href="/" className="bg-white text-black font-black text-xs uppercase px-4 py-2 rounded-xl">← Back to Mall</Link>
        </div>
        <h1 className="text-2xl md:text-4xl font-black uppercase text-white">We Will Get You Anything Within <span className="text-amber-400">3 Hours</span> &amp; Hold It For <span className="text-emerald-400">24 Hours!</span></h1>
        <p className="text-xs text-zinc-300">Don&apos;t leave our mall! Tell us the exact item, brand, size, or gift you want. Our AI &amp; Wholesale Desk locates it at a lower price, emails your private checkout link within <b>3 Hours</b>, and locks it on a strict <b>24-Hour Hold</b>.</p>
        {sent ? (
          <div className="bg-emerald-950 border-2 border-emerald-400 rounded-2xl p-5 text-center space-y-2">
            <div className="text-lg font-black text-emerald-300 uppercase">✅ 3-Hour Sourcing Drone Deployed!</div>
            <p className="text-xs text-zinc-200">Watch <b>{email}</b> within the next 3 hours for your private price-beat link &amp; 24-hour reservation lock for <b>{item}</b>.</p>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-3">
            <input required value={item} onChange={e => setItem(e.target.value)} placeholder="1. What exact item do you want us to get for you?" className="w-full bg-black border-2 border-amber-400 rounded-xl px-4 py-3 text-sm text-white" />
            <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="2. Your Email Address (for your 3-Hour Quote & 24-Hr Hold Link)" className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white" />
            <input value={notes} onChange={e => setNotes(e.target.value)} placeholder="3. Optional: Target Price to Beat, Size, Color, or Quantity" className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white" />
            <button type="submit" className="w-full bg-amber-400 hover:bg-amber-300 text-black font-black text-sm uppercase py-4 rounded-2xl shadow-lg">🎩 Find It For Me Within 3 Hours (Lock 24-Hr Hold) →</button>
          </form>
        )}
      </div>
    </main>
  );
}
