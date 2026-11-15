import { AUTISM_SKUS } from "./autism-skus";
import { PTSD_SKUS } from "./ptsd-skus";
export interface ScSKU { id:string; name:string; cat:string; w:number; ship:number; stock:number; imgs:string[]; }
export interface Wing { slug:string; col:string; key:string; en:string; es:string; ph:string; skus:ScSKU[]; }
export const calcSc = (w:number, sh:number) => { const r=+(w*1.08).toFixed(2), tax=+(r*0.0825).toFixed(2); return { r, tax, tot:+((r+sh+tax+0.3)/0.971).toFixed(2) }; };
export const WINGS: Wing[] = [
  { slug:"autism-spectrum", col:"#3b82f6", key:"autism sensory", en:"Autism Spectrum", es:"Espectro Autista", ph:"1-888-772-9050", skus:AUTISM_SKUS },
  { slug:"down-syndrome", col:"#eab308", key:"down syndrome", en:"Down Syndrome", es:"Síndrome de Down", ph:"1-800-221-4602", skus:AUTISM_SKUS },
  { slug:"deaf-blind", col:"#38bdf8", key:"deaf blind", en:"Deaf / Blind", es:"Sordos y Ciegos", ph:"1-800-232-5463", skus:AUTISM_SKUS },
  { slug:"ptsd-veterans", col:"#14b8a6", key:"veterans ptsd support", en:"PTSD & Veterans", es:"TEPT y Veteranos", ph:"1-877-927-8387", skus:PTSD_SKUS },
  { slug:"mobility-rehab", col:"#22c55e", key:"adaptive mobility", en:"Mobility & Rehab", es:"Movilidad y Rehab", ph:"1-800-539-7309", skus:AUTISM_SKUS },
  { slug:"biomedical-peptides", col:"#a855f7", key:"longevity clinic", en:"Biomedical Peptides", es:"Péptidos Biomédicos", ph:"1-800-411-1222", skus:AUTISM_SKUS },
];
export const getWing = (s:string) => WINGS.find(w => s.includes(w.slug.split("-")[0])) ?? WINGS[0];
