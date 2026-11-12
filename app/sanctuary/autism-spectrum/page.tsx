"use client";
import { useParams } from "next/navigation";
import SanctuaryHub from "../SanctuaryHub";
export default function Page() { const p = useParams(); const s = String(Object.values(p ?? {})[0] ?? "autism-spectrum"); return <SanctuaryHub slug={s} />; }
