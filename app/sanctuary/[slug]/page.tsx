"use client";
import { useParams } from "next/navigation";
import SanctuaryHub from "../SanctuaryHub";
export default function Page() {
  const p = useParams();
  return <SanctuaryHub slug={String(p?.slug ?? "autism-spectrum")} />;
}
