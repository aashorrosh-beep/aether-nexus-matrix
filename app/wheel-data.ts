export type HaloKind = "fire" | "fog" | "static" | "nebula";
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
const u = (id: string) =>
  "https://images.unsplash.com/photo-" + id + "?auto=format&fit=crop&w=600&h=600&q=80";
const b = (q: string) =>
  "https://tse1.mm.bing.net/th?q=" + encodeURIComponent(q) + "&w=480&h=480&c=7&p=0";
export const ORB_FALLBACK = u("1462331940025-496dfbfc7564");
const R = (id: string, name: string, es: string, slug: string, border: string,
  r1: string, r2: string, puzzle = false, r3?: string, r4?: string): RibbonItem =>
  ({ id, name, es, href: "/sanctuary/" + slug, border, puzzle, r1, r2, r3, r4 });
export const RIBBONS: RibbonItem[] = [
  R("autism","Autism Spectrum","Espectro Autista","autism-spectrum","#3b82f6","#ef4444","#facc15",true,"#2563eb","#38bdf8"),
  R("down","Down Syndrome","Síndrome de Down","down-syndrome","#eab308","#1d4ed8","#facc15"),
  R("deafblind","Deaf / Blind","Sordos y Ciegos","deaf-blind","#7dd3fc","#f8fafc","#38bdf8"),
  R("ptsd","PTSD & Veterans","TEPT y Veteranos","ptsd-veterans","#14b8a6","#0d9488","#eab308"),
  R("mobility","Mobility & Rehab","Movilidad y Rehab","mobility-rehab","#22c55e","#16a34a","#84cc16"),
  R("peptides","Biomedical Peptides","Péptidos Biomédicos","biomedical-peptides","#a855f7","#7c3aed","#c084fc")
];
export const NODES: NodeItem[] = [
  { id:"megastores", x:800, y:136, size:12.8, kind:"static", bolt:"#38bdf8", c1:"#38bdf8", c2:"#fde047", title:"MEGA STORES", sub:"All Flagship Vaults", href:"/stores/mega-stores", img:b("futuristic neon sneaker vinyl superstore") },
  { id:"party", x:1415, y:175, size:12.8, kind:"nebula", bolt:"#38bdf8", c1:"#fb7185", c2:"#fde047", title:"PARTY LAPOOZA", sub:"Ultimate Event Vault", href:"/stores/party-lapooza", img:u("1530103862676-de8c9debad1d") },
  { id:"maternity", x:1165, y:480, size:10.4, kind:"fog", bolt:"#34d399", c1:"#10b981", c2:"#67e8f9", title:"MATERNITY & CPR", sub:"Nursery & Safety", href:"/stores/expecting-and-cpr", img:b("warm lamp modern baby nursery crib evening") },
  { id:"stadium", x:1455, y:755, size:12.8, kind:"fog", bolt:"#34d399", c1:"#10b981", c2:"#2dd4bf", title:"ALBS NEXUS STADIUM", sub:"Pro Sports Corridor", href:"/sportflix", img:u("1540747913346-19e32dc3e97e") },
  { id:"matrix", x:1065, y:735, size:10.4, kind:"fog", bolt:"#22c55e", c1:"#22c55e", c2:"#86efac", title:"THE MATRIX • AI", sub:"AI Evolution", href:"/netrix/vr-immersion-bay", img:b("futuristic glowing cyber ai android head black background") },
  { id:"christmas", x:800, y:892, size:12.8, kind:"fire", bolt:"#ef4444", c1:"#ef4444", c2:"#f59e0b", title:"CHRISTMAS STORE", sub:"365 Holiday Magic", href:"/stores/christmas-store", img:u("1543589077-47d81606c1bf") },
  { id:"stargazer", x:535, y:735, size:10.4, kind:"nebula", bolt:"#38bdf8", c1:"#0ea5e9", c2:"#a855f7", title:"STARGAZER & AUTO", sub:"Cosmos & Detailing", href:"/stores/stargazer-mall", img:b("astronomy telescope silhouette purple starry nebula") },
  { id:"luxury", x:145, y:755, size:12.8, kind:"fire", bolt:"#f59e0b", c1:"#f59e0b", c2:"#fde047", title:"LUXURY SUITES", sub:"Top Brand Vault", href:"/stores/luxury-couture", img:u("1523170335258-f5ed11844a49") },
  { id:"worldsfair", x:435, y:480, size:10.4, kind:"static", bolt:"#818cf8", c1:"#8b5cf6", c2:"#38bdf8", title:"1964 WORLD'S FAIR", sub:"Rare Vintage Grails", href:"/nostalgia", img:"https://commons.wikimedia.org/wiki/Special:FilePath/1964_New_York_World%27s_Fair_Unisphere.jpg?width=600" },
  { id:"squish", x:185, y:175, size:12.8, kind:"nebula", bolt:"#f43f5e", c1:"#ec4899", c2:"#c084fc", title:"SQUISH & BLIND VAULT", sub:"Collector Plush Corridor", href:"/stores/squish-blindbox", img:b("colorful plushies collection dark cozy lighting") }
];
export const EXTRA_SEARCH = [
  { id:"sh", title:"Apex Shoe Vault (Sizes 5-15)", href:"/stores/shoe-store" },
  { id:"mu", title:"NEXUS Music Town (Vinyl/CD/Tapes)", href:"/stores/music-town" },
  { id:"em", title:"Emergency Superstore (Flood/Fire)", href:"/stores/emergency-ready" },
  { id:"cw", title:"Pro Car Wash & Auto Bay", href:"/stores/car-wash-auto" }
];
