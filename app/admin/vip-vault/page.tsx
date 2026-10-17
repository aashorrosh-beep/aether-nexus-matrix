"use client";
import { useState } from "react";
import Link from "next/link";
export default function AdminVipVaultPage() {
  const [passkey, setPasskey] = useState("");
  const [records, setRecords] = useState<any[] | null>(null);
  const [err, setErr] = useState("");
  async function unlockVault() {
    setErr("");
    const res = await fetch("/api/vip-signup", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "unlock", passkey }) });
    const data = await res.json();
    if (!data.ok) { setErr("🚨 ACCESS DENIED: Invalid Master Passkey"); return; }
    setRecords(data.records || []);
  }
  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-12 font-mono">
      <div className="max-w-5xl mx-auto space-y-6 bg-zinc-950 border-2 border-emerald-600/60 p-8 rounded-3xl">
        <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
          <div>
            <span className="text-xs text-emerald-400 uppercase">🔒 AES-256-GCM IN-STORE ENCRYPTED DATABASE • NIST / HIPAA SAFE-HARBOR</span>
            <h1 className="text-3xl font-black uppercase text-white mt-1">ALBS Executive Customer & VIP Vault</h1>
          </div>
          <Link href="/" className="text-xs bg-zinc-800 px-4 py-2 rounded-lg text-zinc-300">← Return to Mall</Link>
        </div>
        {!records ? (
          <div className="space-y-4 max-w-md">
            <p className="text-xs text-zinc-400">Enter your Executive Vault Passkey to decrypt in-store customer records in volatile memory (Default: ALBS-VAULT-2026):</p>
            <input type="password" value={passkey} onChange={e => setPasskey(e.target.value)} placeholder="ENTER MASTER VAULT PASSKEY" className="w-full bg-black border border-zinc-700 p-4 rounded-xl text-white font-bold" />
            <button onClick={unlockVault} className="w-full bg-emerald-500 text-black font-black uppercase py-4 rounded-xl">🔑 Decrypt In-Store Customer Vault →</button>
            {err && <p className="text-red-500 text-xs font-bold">{err}</p>}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-xs text-emerald-400 font-bold">✅ VAULT UNLOCKED • {records.length} Encrypted Customer Records Loaded</div>
            <div className="space-y-3">
              {records.map((r, i) => (
                <div key={i} className="bg-black border border-zinc-800 p-4 rounded-xl flex justify-between items-center flex-wrap gap-4 text-xs">
                  <div><div className="font-black text-white text-sm uppercase">{r.name} • <span className="text-cyan-400">ZIP: {r.zip}</span></div><div className="text-emerald-400">{r.contact}</div><div className="text-zinc-400 mt-1">{r.message}</div></div>
                  <div className="text-right text-[10px] text-zinc-500"><div>{r.timestamp}</div><div className="text-emerald-500">{r.compliance}</div></div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
