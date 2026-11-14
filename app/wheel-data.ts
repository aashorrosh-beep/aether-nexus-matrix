export interface RibbonItem {
  id: string; name: string; es: string; href: string;
  border: string; puzzle?: boolean;
  r1: string; r2: string; r3?: string; r4?: string;
}
export interface NodeItem {
  id: string; x: number; y: number; size: number;
  bolt: string; title: string; sub: string; href: string; img: string;
}
const p = (q: string) =>
  "https://tse1.mm.bing.net/th?q=" + encodeURIComponent(q) + "&w=500&h=500&c=7";
export const RIBBONS: RibbonItem[] = [
  { id:"autism", name:"Autism Spectrum", es:"Espectro Autista", href:"/sanctuary/autism-spectrum", border:"#3b82f6", puzzle:true, r1:"#ef4444", r2:"#facc15", r3:"#2563eb", r4:"#38bdf8" },
  { id:"down", name:"Down Syndrome", es:"Síndrome de Down", href:"/sanctuary/down-syndrome", border:"#eab308", r1:"#1d4ed8", r2:"#facc15" },
  { id:"deafblind", name:"Deaf / Blind", es:"Sordos y Ciegos", href:"/sanctuary/deaf-blind", border:"#7dd3fc", r1:"#f8fafc", r2:"#38bdf8" },
  { id:"ptsd", name:"PTSD & Veterans", es:"TEPT y Veteranos", href:"/sanctuary/ptsd-veterans", border:"#14b8a6", r1:"#0d9488", r2:"#eab308" },
  { id:"mobility", name:"Mobility & Rehab", es:"Movilidad y Rehab", href:"/sanctuary/mobility-rehab", border:"#22c55e", r1:"#16a34a", r2:"#84cc16" },
  { id:"peptides", name:"Biomedical Peptides", es:"Péptidos Biomédicos", href:"/sanctuary/biomedical-peptides", border:"#a855f7", r1:"#7c3aed", r2:"#c084fc" }
];
export const NODES: NodeItem[] = [
  { id:"christmas", x:800, y:155, size:11.4, bolt:"#ef4444", title:"CHRISTMAS STORE", sub:"365 Holiday • Ornaments • Lights", href:"/stores/christmas-store", img:p("christmas tree ornaments holiday lights") },
  { id:"party", x:1170, y:215, size:11.4, bolt:"#38bdf8", title:"PARTY LAPOOZA", sub:"Ages 1-18 • Bulk • AI Face-Swap", href:"/stores/party-lapooza", img:p("superhero birthday party celebration") },
  { id:"maternity", x:1395, y:430, size:11.2, bolt:"#38bdf8", title:"MATERNITY & CPR", sub:"Nursery • Free CPR Cert", href:"/stores/expecting-and-cpr", img:p("modern cozy baby nursery crib") },
  { id:"matrix", x:1355, y:715, size:11.2, bolt:"#ef4444", title:"THE MATRIX • AI", sub:"Robotics • VR • Future Tech", href:"/netrix/vr-immersion-bay", img:p("futuristic humanoid robot green cyber") },
  { id:"stadium", x:1095, y:865, size:11.2, bolt:"#38bdf8", title:"ALBS NEXUS STADIUM", sub:"Jerseys • Hats • Sweaters • Gear", href:"/sportflix", img:p("night football stadium green turf lights") },
  { id:"megastores", x:800, y:900, size:12.2, bolt:"#facc15", title:"MEGA STORES", sub:"Shoes • Music Town • Emergency • Auto", href:"/stores/mega-stores", img:p("futuristic neon sneaker vinyl superstore") },
  { id:"stargazer", x:505, y:865, size:11.2, bolt:"#ef4444", title:"STARGAZER & AUTO", sub:"Scopes • Eclipse • Detailing", href:"/stores/stargazer-mall", img:p("astronomy telescope night sky sports car") },
  { id:"worldsfair", x:245, y:715, size:11.2, bolt:"#38bdf8", title:"1964 WORLD'S FAIR", sub:"60s-90s Grails • Replicas", href:"/nostalgia", img:p("1964 new york worlds fair unisphere") },
  { id:"luxury", x:205, y:430, size:11.2, bolt:"#ef4444", title:"LUXURY SUITES", sub:"Watches • Pens • Purses", href:"/stores/luxury-couture", img:p("luxury automatic chronograph watch leather") },
  { id:"squish", x:430, y:215, size:11.4, bolt:"#38bdf8", title:"SQUISH & BLIND VAULT", sub:"Plush • Pop Mart • Bundles", href:"/stores/squish-blindbox", img:p("colorful squishmallow plush collection") }
];
export const EXTRA_SEARCH = [
  { id:"sh", title:"Apex Shoe Vault (Sizes 5-15)", href:"/stores/shoe-store" },
  { id:"mu", title:"NEXUS Music Town (Vinyl/CD/Tapes)", href:"/stores/music-town" },
  { id:"em", title:"Emergency Superstore (Flood/Fire)", href:"/stores/emergency-ready" },
  { id:"cw", title:"Pro Car Wash & Auto Bay", href:"/stores/car-wash-auto" }
];
