export interface RibbonItem {
  id: string; name: string; es: string; href: string;
  border: string; puzzle?: boolean;
  r1: string; r2: string; r3?: string; r4?: string;
}
export interface NodeItem {
  id: string; x: number; y: number; size: number;
  bolt: string; f1: string; f2: string;
  title: string; sub: string; href: string; img: string;
}
const u = (id: string) =>
  "https://images.unsplash.com/photo-" + id + "?auto=format&fit=crop&w=640&h=640&q=80";
const b = (q: string) =>
  "https://tse1.mm.bing.net/th?q=" + encodeURIComponent(q) + "&w=480&h=480&c=7&p=0";
export const RIBBONS: RibbonItem[] = [
  { id:"autism", name:"Autism Spectrum", es:"Espectro Autista", href:"/sanctuary/autism-spectrum", border:"#3b82f6", puzzle:true, r1:"#ef4444", r2:"#facc15", r3:"#2563eb", r4:"#38bdf8" },
  { id:"down", name:"Down Syndrome", es:"Síndrome de Down", href:"/sanctuary/down-syndrome", border:"#eab308", r1:"#1d4ed8", r2:"#facc15" },
  { id:"deafblind", name:"Deaf / Blind", es:"Sordos y Ciegos", href:"/sanctuary/deaf-blind", border:"#7dd3fc", r1:"#f8fafc", r2:"#38bdf8" },
  { id:"ptsd", name:"PTSD & Veterans", es:"TEPT y Veteranos", href:"/sanctuary/ptsd-veterans", border:"#14b8a6", r1:"#0d9488", r2:"#eab308" },
  { id:"mobility", name:"Mobility & Rehab", es:"Movilidad y Rehab", href:"/sanctuary/mobility-rehab", border:"#22c55e", r1:"#16a34a", r2:"#84cc16" },
  { id:"peptides", name:"Biomedical Peptides", es:"Péptidos Biomédicos", href:"/sanctuary/biomedical-peptides", border:"#a855f7", r1:"#7c3aed", r2:"#c084fc" }
];
export const NODES: NodeItem[] = [
  { id:"megastores", x:800, y:175, size:11.0, bolt:"#facc15", f1:"#facc15", f2:"#fb923c", title:"MEGA STORES", sub:"Shoes • Music Town • Emergency • Auto", href:"/stores/mega-stores", img:b("futuristic neon sneaker vinyl superstore") },
  { id:"party", x:1335, y:215, size:13.2, bolt:"#38bdf8", f1:"#fb7185", f2:"#fde047", title:"PARTY LAPOOZA", sub:"Ages 1-18 • Bulk • AI Face-Swap", href:"/stores/party-lapooza", img:u("1530103862676-de8c9debad1d") },
  { id:"maternity", x:1225, y:535, size:11.0, bolt:"#38bdf8", f1:"#38bdf8", f2:"#a7f3d0", title:"MATERNITY & CPR", sub:"Nursery • Free CPR Cert", href:"/stores/expecting-and-cpr", img:b("modern cozy baby nursery crib") },
  { id:"stadium", x:1415, y:820, size:13.2, bolt:"#38bdf8", f1:"#22c55e", f2:"#fde047", title:"ALBS NEXUS STADIUM", sub:"Jerseys • Hats • Sweaters • Gear", href:"/sportflix", img:u("1540747913346-19e32dc3e97e") },
  { id:"matrix", x:1095, y:865, size:11.0, bolt:"#ef4444", f1:"#10b981", f2:"#fde047", title:"THE MATRIX • AI", sub:"Robotics • VR • Future Tech", href:"/netrix/vr-immersion-bay", img:b("futuristic humanoid robot green cyber") },
  { id:"christmas", x:800, y:1030, size:13.2, bolt:"#ef4444", f1:"#ef4444", f2:"#fde047", title:"CHRISTMAS STORE", sub:"365 Holiday • Ornaments • Lights", href:"/stores/christmas-store", img:u("1543589077-47d81606c1bf") },
  { id:"stargazer", x:505, y:865, size:11.0, bolt:"#ef4444", f1:"#ef4444", f2:"#60a5fa", title:"STARGAZER & AUTO", sub:"Scopes • Eclipse • Detailing", href:"/stores/stargazer-mall", img:u("1503376780353-766692767b70") },
  { id:"luxury", x:185, y:820, size:13.2, bolt:"#ef4444", f1:"#f59e0b", f2:"#fef08a", title:"LUXURY SUITES", sub:"Watches • Pens • Purses", href:"/stores/luxury-couture", img:u("1523170335258-f5ed11844a49") },
  { id:"worldsfair", x:375, y:535, size:11.0, bolt:"#38bdf8", f1:"#38bdf8", f2:"#c084fc", title:"1964 WORLD'S FAIR", sub:"60s-90s Grails • Replicas", href:"/nostalgia", img:"https://commons.wikimedia.org/wiki/Special:FilePath/1964_New_York_World%27s_Fair_Unisphere.jpg?width=700" },
  { id:"squish", x:265, y:215, size:13.2, bolt:"#38bdf8", f1:"#ec4899", f2:"#38bdf8", title:"SQUISH & BLIND VAULT", sub:"Plush • Pop Mart • Bundles", href:"/stores/squish-blindbox", img:u("1558679908-541bcf1249ff") }
];
export const EXTRA_SEARCH = [
  { id:"sh", title:"Apex Shoe Vault (Sizes 5-15)", href:"/stores/shoe-store" },
  { id:"mu", title:"NEXUS Music Town (Vinyl/CD/Tapes)", href:"/stores/music-town" },
  { id:"em", title:"Emergency Superstore (Flood/Fire)", href:"/stores/emergency-ready" },
  { id:"cw", title:"Pro Car Wash & Auto Bay", href:"/stores/car-wash-auto" }
];
