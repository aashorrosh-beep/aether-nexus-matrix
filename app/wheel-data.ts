export type HaloKind = "fire" | "fog" | "static" | "nebula" | "ringneb";
export interface RibbonItem {
  id: string; name: string; es: string; href: string;
  border: string; puzzle?: boolean;
  r1: string; r2: string; r3?: string; r4?: string;
}
export interface NodeItem {
  id: string; x: number; y: number; size: number; kind: HaloKind;
  bolt: string; c1: string; c2: string;
  title: string; sub: string; href: string; img: string;
}
const b = (q: string) =>
  "https://tse1.mm.bing.net/th?q=" + encodeURIComponent(q) + "&w=480&h=480&c=7";
export const ORB_FALLBACK = b("deep space glowing nebula stars");
export const RIBBONS: RibbonItem[] = [
  { id:"autism", name:"Autism Spectrum", es:"Espectro Autista", href:"/sanctuary/autism-spectrum", border:"#3b82f6", puzzle:true, r1:"#ef4444", r2:"#facc15", r3:"#2563eb", r4:"#38bdf8" },
  { id:"down", name:"Down Syndrome", es:"Síndrome de Down", href:"/sanctuary/down-syndrome", border:"#eab308", r1:"#1d4ed8", r2:"#facc15" },
  { id:"deafblind", name:"Deaf / Blind", es:"Sordos y Ciegos", href:"/sanctuary/deaf-blind", border:"#7dd3fc", r1:"#f8fafc", r2:"#38bdf8" },
  { id:"ptsd", name:"PTSD & Veterans", es:"TEPT y Veteranos", href:"/sanctuary/ptsd-veterans", border:"#14b8a6", r1:"#0d9488", r2:"#eab308" },
  { id:"mobility", name:"Mobility & Rehab", es:"Movilidad y Rehab", href:"/sanctuary/mobility-rehab", border:"#22c55e", r1:"#16a34a", r2:"#84cc16" },
  { id:"peptides", name:"Biomedical Peptides", es:"Péptidos Biomédicos", href:"/sanctuary/biomedical-peptides", border:"#a855f7", r1:"#7c3aed", r2:"#c084fc" }
];
export const NODES: NodeItem[] = [
  { id:"megastores", x:800, y:185, size:11.0, kind:"static", bolt:"#60a5fa", c1:"#38bdf8", c2:"#fde047", title:"MEGA STORES", sub:"Shoes • Music Town • Emergency • Auto", href:"/stores/mega-stores", img:b("futuristic neon glowing sneaker superstore") },
  { id:"party", x:1330, y:225, size:13.2, kind:"nebula", bolt:"#60a5fa", c1:"#ec4899", c2:"#fde047", title:"PARTY LAPOOZA", sub:"Ages 1-18 • Bulk • AI Face-Swap", href:"/stores/party-lapooza", img:b("colorful birthday party table balloons decorations") },
  { id:"maternity", x:1220, y:540, size:11.0, kind:"nebula", bolt:"#67e8f9", c1:"#2dd4bf", c2:"#bae6fd", title:"MATERNITY & CPR", sub:"Nursery • Free CPR Cert", href:"/stores/expecting-and-cpr", img:b("warm cozy modern baby nursery crib") },
  { id:"stadium", x:1410, y:825, size:13.2, kind:"fog", bolt:"#34d399", c1:"#10b981", c2:"#22d3ee", title:"ALBS NEXUS STADIUM", sub:"Jerseys • Hats • Sweaters • Gear", href:"/sportflix", img:b("illuminated night football stadium green field") },
  { id:"matrix", x:1095, y:870, size:11.0, kind:"fog", bolt:"#4ade80", c1:"#22c55e", c2:"#86efac", title:"THE MATRIX • AI", sub:"Robotics • VR • Future Tech", href:"/netrix/vr-immersion-bay", img:b("futuristic green cyber humanoid ai robot") },
  { id:"christmas", x:800, y:1035, size:13.2, kind:"fire", bolt:"#f97316", c1:"#ef4444", c2:"#fde047", title:"CHRISTMAS STORE", sub:"365 Holiday • Ornaments • Lights", href:"/stores/christmas-store", img:b("glowing red gold christmas tree ornaments lights") },
  { id:"stargazer", x:505, y:870, size:11.0, kind:"ringneb", bolt:"#60a5fa", c1:"#38bdf8", c2:"#f97316", title:"STARGAZER & AUTO", sub:"Scopes • Eclipse • Detailing", href:"/stores/stargazer-mall", img:b("astronomy telescope starry night sky") },
  { id:"luxury", x:190, y:825, size:13.2, kind:"fire", bolt:"#fbbf24", c1:"#f59e0b", c2:"#fef08a", title:"LUXURY SUITES", sub:"Watches • Pens • Purses", href:"/stores/luxury-couture", img:b("luxury gold steel automatic chronograph watch") },
  { id:"worldsfair", x:380, y:540, size:11.0, kind:"static", bolt:"#38bdf8", c1:"#0ea5e9", c2:"#e0f2fe", title:"1964 WORLD'S FAIR", sub:"60s-90s Grails • Replicas", href:"/nostalgia", img:b("1964 new york worlds fair unisphere globe") },
  { id:"squish", x:270, y:225, size:13.2, kind:"nebula", bolt:"#c084fc", c1:"#f472b6", c2:"#a855f7", title:"SQUISH & BLIND VAULT", sub:"Plush • Pop Mart • Bundles", href:"/stores/squish-blindbox", img:b("colorful squishmallow plush collection grid") }
];
export const EXTRA_SEARCH = [
  { id:"sh", title:"Apex Shoe Vault (Sizes 5-15)", href:"/stores/shoe-store" },
  { id:"mu", title:"NEXUS Music Town (Vinyl/CD/Tapes)", href:"/stores/music-town" },
  { id:"em", title:"Emergency Superstore (Flood/Fire)", href:"/stores/emergency-ready" },
  { id:"cw", title:"Pro Car Wash & Auto Bay", href:"/stores/car-wash-auto" }
];
