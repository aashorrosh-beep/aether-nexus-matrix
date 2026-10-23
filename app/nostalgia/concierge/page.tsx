"use client";
import { useState } from "react";
import Link from "next/link";

export default function ConciergeTrapPage() {
  const [item, setItem] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!item || !email) return;
    try {
      await fetch("/api/vip-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, item, notes, sla: "3-4 Hours", hold: "24 Hours" })
      });
    } catch (err) {}
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-6 md:p-12 font-sans">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex justify-between items-center border-b border-amber-500/40 pb-4">
          <span className="text-xs font-mono uppercase text-amber-400 font-bold">🎩 ALBS VIP SOURCING DESK • 3–4 HR TURNAROUND</span>
          <Link href="/" className="bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-black uppercase px-4 py-2.5 rounded-xl">← Back to All 6 Malls</Link>
        </div>

        <div className="bg-gradient-to-br from-amber-950/80 via-zinc-900 to-black border-2 border-amber-400 rounded-3xl p-6 md:p-8 space-y-5 shadow-[0_0_45px_rgba(251,191,36,0.2)]">
          <span className="bg-amber-400 text-black font-black text-[11px] uppercase px-3 py-1 rounded-full">⚡ 3–4 HOUR EMAIL QUOTES • STRICT 24-HOUR RESERVATION HOLD</span>
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
            Don&apos;t See It in the Mall? <span className="text-amber-400">We&apos;ll Beat the Market Price in 3–4 Hours.</span>
          </h1>
          <p className="text-xs md:text-sm text-zinc-300 leading-relaxed">
            Never overpay on big-box sites. Tell our AI &amp; Wholesale Concierge what you&apos;re hunting for. Within <span className="text-yellow-400 font-bold">3 to 4 hours</span>, we will email you verified, lower-priced options from our 4.8★+ insured wholesale network—and <span className="text-emerald-400 font-bold">lock your private checkout link for 24 hours only</span> before releasing the stock!
          </p>

          {submitted ? (
            <div className="bg-emerald-950 border-2 border-emerald-400 rounded-2xl p-6 text-center space-y-3">
              <div className="text-2xl font-black uppercase text-emerald-300">✅ CONCIERGE HUNT ACTIVATED!</div>
              <p className="text-xs text-zinc-200">We are scanning our wholesale network for <b className="text-yellow-400">&ldquo;{item}&rdquo;</b> right now. Watch <b className="text-white">{email}</b> within the next <b>3 to 4 hours</b>—once your private price-beat link arrives, your <b>24-Hour Reservation Timer</b> begins!</p>
              <button onClick={() => { setSubmitted(false); setItem(""); }} className="bg-amber-400 text-black font-black text-xs uppercase px-5 py-3 rounded-xl">Submit Another Item Request →</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-black uppercase text-amber-300">1. What Exact Item, Brand, or Gift Are You Looking For?</label>
                <input required value={item} onChange={(e) => setItem(e.target.value)} placeholder="e.g. Sony PS5 Pro, Custom Shrek 30-Person Party, Specific Perfume, Auto Part..." className="w-full mt-1 bg-black border-2 border-zinc-700 focus:border-amber-400 rounded-xl px-4 py-3 text-sm text-white outline-none" />
              </div>
              <div>
                <label className="text-xs font-black uppercase text-amber-300">2. Where Should We Email Your Price-Beat Options in 3–4 Hours?</label>
                <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your best email address..." className="w-full mt-1 bg-black border-2 border-zinc-700 focus:border-amber-400 rounded-xl px-4 py-3 text-sm text-white outline-none" />
              </div>
              <div>
                <label className="text-xs font-black uppercase text-zinc-400">3. Optional Target Price, Size, or Competitor Price to Beat:</label>
                <input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="e.g. Saw it for $129—can you beat it with expedited shipping?" className="w-full mt-1 bg-black border border-zinc-700 focus:border-amber-400 rounded-xl px-4 py-2.5 text-xs text-white outline-none" />
              </div>
              <button type="submit" className="w-full bg-amber-400 hover:bg-amber-300 text-black font-black text-sm uppercase py-4 rounded-2xl shadow-lg transition-all">
                🎩 Lock In My 3–4 Hour Concierge Search &amp; 24-Hour Price Hold →
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
