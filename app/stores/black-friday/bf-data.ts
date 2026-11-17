export interface BfItem {
  id: string; kind: "doorbuster" | "event"; cat: "shoes" | "apparel" | "tech" | "home";
  en: string; es: string; retail: number; deal: number; ship: number; stock: number;
  dims: string; mat: string; cert: string; bom: [string, string, string]; imgs: [string, string, string];
}
const b = (q: string, k: number) =>
  "https://tse" + k + ".mm.bing.net/th?q=" + encodeURIComponent(q) + "&w=460&h=340&c=7&p=0";
const M = (
  id: string, kind: "doorbuster" | "event", cat: "shoes" | "apparel" | "tech" | "home",
  en: string, es: string, retail: number, deal: number, ship: number,
  dims: string, mat: string, cert: string, q: string
): BfItem => ({
  id, kind, cat, en, es, retail, deal, ship, stock: 9 + (parseInt(id.slice(-2), 10) % 14),
  dims, mat, cert,
  bom: [id + "-CH Core Assembly", id + "-EL Internal Module", id + "-PK Retail Box & QC Tag"],
  imgs: [b(q + " product", 1), b(q + " closeup", 2), b(q + " kit", 3)]
});
export const BF_POOL: BfItem[] = [
  M("BF-001","doorbuster","tech","4K Wi-Fi Drone + Dual Battery Case","Dron 4K Wi-Fi + Estuche Doble Batería",189,79,4.99,"11x9x4 in • 1.8 lb","Carbon/ABS Composite","FCC / RoHS / UN38.3","4k foldable camera drone black"),
  M("BF-002","doorbuster","shoes","Apex Neon Air-Cushion Running Shoes","Zapatillas Deportivas Apex Amortiguación Aire",145,58,3.99,"Men 6-15 / Women 5-12","Engineered Knit + EVA","ASTM F2913 Slip-Tested","glowing neon running sneaker black"),
  M("BF-003","doorbuster","home","2000A Lithium Jump Starter + Tire Inflator","Arrancador Litio 2000A + Inflador Llantas",159,64,4.99,"9x5x3 in • 2.9 lb","UL94-V0 Polycarbonate","UL 2743 / IP65","portable car jump starter power bank"),
  M("BF-004","doorbuster","apparel","Heated 3-Zone USB-C Winter Puffer Jacket","Chaqueta Térmica 3 Zonas USB-C Invierno",175,69,4.99,"Unisex XS-4XL • 2.1 lb","Ripstop Nylon + Carbon Fiber","CE / UL Heating Certified","heated black winter puffer jacket"),
  M("BF-005","doorbuster","tech","ANC Studio Over-Ear Spatial Headphones","Audífonos Estudio Cancelación Activa Ruido",165,59,3.99,"8x7x3.5 in • 0.9 lb","Memory Foam + Anodized Alloy","Bluetooth 5.4 / Hi-Res","matte black over ear studio headphones"),
  M("BF-006","doorbuster","home","Smart Countertop Nugget Ice Maker 34-Lb","Máquina Hielo Frappé Inteligente 34-Lb",249,112,5.99,"14x10x15 in • 16.5 lb","304 Food-Grade Stainless","ETL / NSF / BPA-Free","stainless countertop nugget ice maker"),
  M("BF-007","doorbuster","tech","1080p Native Wi-Fi Home Theater Projector","Proyector Cine en Casa 1080p Wi-Fi",199,74,4.99,"9x8x4 in • 3.2 lb","6-Layer Coated Glass Lens","FCC / CE / IEC 62471","portable home theater led projector"),
  M("BF-008","doorbuster","apparel","Luxury Cashmere-Blend Crewneck Sweater 2-Pk","Pack 2 Suéteres Mezcla Cachemira Lujo",140,54,3.99,"Sizes XS-4XL • 1.4 lb","Merino & Cashmere Knit","OEKO-TEX Standard 100","folded luxury crewneck sweaters"),
  M("BF-009","doorbuster","home","Cordless 28KPa Cyclonic Stick Vacuum","Aspiradora Inalámbrica Ciclónica 28KPa",219,88,5.99,"44x10x8 in • 5.4 lb","Brushless 450W Motor + HEPA","UL 1017 / H13 HEPA","cordless stick vacuum cleaner led"),
  M("BF-010","doorbuster","shoes","Waterproof Thermal Trail & Work Boots","Botas Térmicas Impermeables Trabajo y Ruta",168,66,4.99,"Wide & Standard 6-15","Full-Grain Leather + Vibram","ASTM F2413 Toe Shield","rugged waterproof hiking work boot"),
  M("BF-011","event","tech","AI Robot Companion + VR Headset Bundle","Pack Robot Compañero IA + Casco VR",299,129,5.99,"14x11x6 in • 4.2 lb","Servo Alloy + Optical PMMA","FCC / CE Class B","futuristic ai companion robot kit"),
  M("BF-012","event","home","600W LiFePO4 Solar Storm Power Station","Estación Energía Solar LiFePO4 600W",389,179,5.99,"11x8x8 in • 13.8 lb","3000-Cycle LiFePO4 Cells","UL 2743 / Pure Sine Wave","portable solar power station lifepo4"),
  M("BF-013","event","apparel","Pro Stadium 3-Piece Fan Gear Pack (Jersey/Cap/Hoodie)","Pack 3 Piezas Estadio (Jersey/Gorra/Sudadera)",185,78,4.99,"Youth & Adult XS-4XL","Moisture-Wick Poly Mesh","Official Stitch Grade","sports jersey hoodie cap bundle"),
  M("BF-014","event","home","Pro Auto Detailing Foam Cannon + Ceramic Kit","Kit Cañón Espuma + Recubrimiento Cerámico",135,52,4.99,"12x9x6 in • 4.1 lb","Solid Brass + 9H SiO2","ISO 9001 Detailing Grade","car wash foam cannon detailing kit"),
  M("BF-015","event","tech","Collector Mystery Plush 6-Box Case + Display","Caja 6 Peluches Misterio + Vitrina LED",149,62,4.99,"15x10x8 in • 3.3 lb","Velvet Micro-Plush + Acrylic","ASTM F963 Toy Safe","kawaii plush blind box collection"),
  M("BF-016","event","home","365 Holiday 600-LED RGB Smart Tree & Arch Kit","Kit Árbol y Arco 600-LED RGB Inteligente",179,72,4.99,"7.5-Ft Coverage • 6.2 lb","IP65 Weatherproof PVC","UL 588 Outdoor Rated","rgb smart christmas tree lights"),
  M("BF-017","event","tech","Automatic Chronograph Watch + Leather Box","Reloj Cronógrafo Automático + Caja Cuero",260,98,3.99,"42mm Case • 0.8 lb","316L Stainless + Sapphire","5ATM Water Resistant","luxury automatic chronograph watch black"),
  M("BF-018","event","home","150mm Astro Telescope + Solar Eclipse Filter","Telescopio 150mm + Filtro Eclipse Solar",279,118,5.99,"34x12x10 in • 11.4 lb","Multi-Coated Parabolic Glass","ISO 12312-2 Solar Safe","astronomy reflector telescope tripod"),
  M("BF-019","event","apparel","Sensory Weighted Blanket + Noise-Cancel Headset","Manta con Peso Sensorial + Audífonos Calma",139,56,4.99,"60x80 in • 15 lb","Glass Micro-Beads + Bamboo","OEKO-TEX Sanctuary Grade","weighted sensory blanket headphones"),
  M("BF-020","event","tech","Bluetooth Vinyl Turntable + 2LP Collector Stand","Tocadiscos Vinilo Bluetooth + Soporte 2LP",169,68,4.99,"15x13x6 in • 7.1 lb","Walnut Plinth + Diamond Stylus","FCC / RIAA Balanced","vintage walnut vinyl record player")
];
export function getDailyTen(daySeed: number): BfItem[] {
  const dbs = BF_POOL.filter(x => x.kind === "doorbuster");
  const evs = BF_POOL.filter(x => x.kind === "event");
  const pick = (arr: BfItem[], n: number) =>
    Array.from({ length: n }, (_, i) => arr[(daySeed + i) % arr.length]);
  return [...pick(dbs, 5), ...pick(evs, 5)];
}
export const calcBf = (deal: number, ship: number) => {
  const tax = +((deal + ship) * 0.0825 + 0.30).toFixed(2);
  return { deal, ship, tax, tot: +(deal + ship + tax).toFixed(2) };
};
