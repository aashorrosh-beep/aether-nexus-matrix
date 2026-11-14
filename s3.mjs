import fs from "fs";
const H = [
  "185|Refreshable 20-Cell Pocket Braille Reader",
  "145|Live-Caption AR Subtitle Glasses (Adult)",
  "78|Wireless Smoke & CO Bed-Shaker Alert Hub",
  "64|Ultrasonic Haptic Obstacle Cane Handle",
  "92|Clip-On AI Camera Mail & Menu Voice Reader",
  "54|DeafBlind Morse-Haptic Wrist Communicator",
  "48|Encrypted Baby-Cry Strobe & Wrist Pager",
  "68|Tactile-Knob Auto-Shutoff Induction Burner",
  "42|Talking Arm Blood-Pressure Monitor (XL Cuff)",
  "39|Talking No-Code Blood Glucose Meter Kit",
  "26|Talking Instant Forehead & Ear Thermometer",
  "58|TV T-Coil & Bluetooth Hearing Neckloop",
  "46|Directional Table-Mic Speech Amplifier",
  "34|High-Contrast Yellow-On-Black Keyboard",
  "28|Braille & Tactile Prescription Pill Lockbox",
  "19|Dual-Tone Liquid Level Cup Indicator (2-Pk)",
  "52|Portable 5-Inch HD Electronic Video Loupe",
  "31|Weatherproof Strobe & Vibrating Doorbell",
  "29|Under-Mattress Heavy-Sleeper Sonic Shaker",
  "24|Tactile Color-Tag Clothing Identifier (40)",
  "36|Talking Kitchen Food & Portion Scale",
  "38|Talking Indoor/Outdoor Weather Station",
  "32|Anti-Glare Amber Fit-Over Mobility Shades",
  "44|Heavy-Duty Graphite Folding White Cane (54)",
  "27|All-Terrain 360 Roller Marshmallow Cane Tip",
  "22|High-Visibility LED Illuminated Cane Shaft",
  "49|Amplified 50dB Big-Button Photo Speakerphone",
  "25|Tactile Braille & Raised-Numeral Wall Clock",
  "33|Talking Microwave Watt & Timer Voice Guide",
  "21|Heat-Proof Oven Rack Tactile Guard Strips",
  "29|RFID Talking Pantry & Freezer Voice Labels",
  "24|DeafBlind Haptic Turn-By-Turn Belt Clip",
  "18|Locking-Clip Behind-Ear Hearing Aid Cord",
  "35|UV-C Electronic Hearing-Aid Dry & Clean Box",
  "19|Sweat-Proof Spandex Hearing-Aid Sleeves (4)",
  "23|Magnetic-Clasp Tactile Braille Pocket Watch",
  "31|High-Lumen Gooseneck Task Floor Reading Lamp",
  "26|Big-Button Universal Simplified TV Remote",
  "22|Braille & Giant-Print Cash Wallet Organizer",
  "17|Non-Slip High-Contrast Yellow Stair Treads",
  "28|Talking Tire-Pressure & Car Safety Gauge",
  "32|Vibrating Multi-Alarm Medication Watch",
  "19|Tactile Notch Measuring Spoons & Cups Set",
  "24|Safe-Cut Guarded Kitchen Finger Knife Guide",
  "21|Deaf/Blind Emergency Responder Seatbelt Visor",
  "45|Foldable Aluminum Guide-Dog Travel Bowl Kit",
  "37|Rechargeable Pocket Personal FM Loop Receiver",
  "29|Braille Embossed Metal Check & Sign Guide",
  "34|Waterproof Shower Vibrating Timer & Clock",
  "42|Portable Folding Desktop Reading Stand"
];
const B = [
  "15|Assorted Tactile Bump Dots (160-Pack)",
  "29|Handheld Dial Braille Vinyl Label Maker",
  "18|3-Rolls Clear Adhesive Braille Label Tape",
  "24|10x Dual-LED Illuminated Hand Magnifier",
  "19|Full-Page 3x Fresnel Reading Sheet (4-Pk)",
  "16|20/20 Bold-Line Raised-Rule Writing Pads (5)",
  "14|High-Contrast Bold-Tip Black Felt Pens (12)",
  "28|One-Button Talking Atomic Wristwatch",
  "25|Dual-Alarm Vibrating Travel Pillow Clock",
  "32|Talking Bathroom Weight Scale (Backlit)",
  "22|ASL 200-Sign Family Flashcard Deck",
  "19|Tactile Braille Alphabet & Numbers Board",
  "16|Zinc-Air Hearing Battery Caddy + Tester",
  "17|Wax-Guard & Brush Hearing Maintenance Kit",
  "21|High-Contrast Yellow Cutting Board Duo",
  "18|Auto-Stop Pouring Spout & Mug Guide",
  "15|Giant-Print Playing Cards & Dominoes Set",
  "23|Braille UNO & Tactile Family Card Trio",
  "26|Audible Beeping Foam Locator Ball",
  "19|Reflective Vest & White-Cane Holster Pouch",
  "14|Silicone Signature & Envelope Guides (4)",
  "22|Large-Print Checkbook Register & Calc",
  "27|Clip-On Cap LED Night Mobility Light",
  "24|Soft Acoustic Sleep Headband Headphones",
  "18|Tactile Raised-Dot Measuring Tape (60-In)",
  "21|Self-Threading Needles & Tactile Sew Kit",
  "16|High-Contrast Giant-Print Wall Calendar",
  "29|Rechargeable Neck Reading Book Light",
  "19|Color-Contrast Non-Slip Silicone Placemats",
  "17|Clear-Window Face-View Lip-Reading Masks",
  "25|Talking Pocket Calculator with Earbud",
  "22|Magnetic Cane Holder Table Rest (3-Pk)",
  "19|Tactile Spice Jar Braille Label Set",
  "28|Desiccant Hearing-Aid Dry Jar (6-Mo)",
  "15|Engraved Deaf/Blind Medical ID Bracelet"
];
const C = [
  "28|AREDS-2 Lutein 20mg + Zeaxanthin Softgels",
  "26|Liquid Lutein & Bilberry Macular Drops",
  "29|Wild Alaskan High-DHA Vision Omega-3",
  "27|Astaxanthin 12mg Eye Fatigue Antioxidants",
  "24|Magnesium + Methyl-B12 Inner-Ear Support",
  "25|CoQ10 + Ginkgo Micro-Circulation Capsules",
  "19|Preservative-Free Single-Vial Eye Drops",
  "22|Vitamin A, C, E + Chelated Zinc Eye Complex",
  "21|Warm-Compress Dry-Eye Relief Spa Mask",
  "18|Gentle Eyelid Cleansing Tea-Tree Wipes (60)",
  "24|Caretaker L-Theanine + Lemon Balm Calm",
  "46|Caretaker Heated Shiatsu Neck & Back Wrap",
  "21|Caretaker Morning Hydration Electrolytes",
  "19|Caretaker Chamomile & Magnesium Sleep Balm",
  "27|Caretaker Large-Print & Tactile Med Binder"
];
const u = (q, k) => "https://tse" + k + ".mm.bing.net/th?q=" +
  encodeURIComponent(q) + "&w=420&h=300&c=7";
let n = 1;
const pk = (L, cat) => L.map(s => {
  const [w0, name] = s.split("|"), w = +w0;
  const id = "DB-" + String(n++).padStart(3, "0");
  const c = name.split("(")[0].trim(), sh = w < 55 ? 3.99 : 5.99;
  const im = [u(c + " product", 1), u("closeup " + c, 2), u(c + " kit", 3)];
  return { id, name, cat, w, ship: sh, stock: 8 + (n & 7), imgs: im };
});
const DB = [...pk(H, "hard"), ...pk(B, "best"), ...pk(C, "care")];
if (!fs.existsSync("app/sanctuary/autism-skus.ts")) {
  const r = fs.readFileSync("app/sanctuary/sanctuary-data.ts", "utf8");
  const l = r.split("\n").find(x => x.includes("export const WINGS"));
  const q = l.slice(l.indexOf("[", l.indexOf("=")), l.lastIndexOf("]") + 1);
  fs.writeFileSync("app/sanctuary/autism-skus.ts",
    "export const AUTISM_SKUS = " + JSON.stringify(JSON.parse(q)[0].skus) + ";\n");
}
fs.writeFileSync("app/sanctuary/deaf-blind-skus.ts",
  "export const DEAF_BLIND_SKUS = " + JSON.stringify(DB) + ";\n");
const hasDS = fs.existsSync("app/sanctuary/down-skus.ts");
const out = [
  'import { AUTISM_SKUS } from "./autism-skus";',
  hasDS ? 'import { DOWN_SKUS } from "./down-skus";' : "",
  'import { DEAF_BLIND_SKUS } from "./deaf-blind-skus";',
  "export interface ScSKU { id:string; name:string; cat:string; w:number; ship:number; stock:number; imgs:string[]; }",
  "export interface Wing { slug:string; col:string; key:string; en:string; es:string; ph:string; skus:ScSKU[]; }",
  "export const calcSc = (w:number, sh:number) => { const r = +(w * 1.08).toFixed(2), tax = +(r * 0.0825).toFixed(2); return { r, tax, tot: +((r + sh + tax + 0.3) / 0.971).toFixed(2) }; };",
  "export const WINGS: Wing[] = [",
  '  { slug:"autism-spectrum", col:"#3b82f6", key:"autism sensory", en:"Autism Spectrum", es:"Espectro Autista", ph:"1-888-772-9050", skus:AUTISM_SKUS },',
  '  { slug:"down-syndrome", col:"#eab308", key:"down syndrome inclusive", en:"Down Syndrome", es:"Síndrome de Down", ph:"1-800-221-4602", skus:' + (hasDS ? "DOWN_SKUS" : "AUTISM_SKUS") + " },",
  '  { slug:"deaf-blind", col:"#38bdf8", key:"deaf blind accessible", en:"Deaf / Blind", es:"Sordos y Ciegos", ph:"1-800-232-5463", skus:DEAF_BLIND_SKUS },',
  '  { slug:"ptsd-veterans", col:"#14b8a6", key:"veterans ptsd", en:"PTSD & Veterans", es:"TEPT y Veteranos", ph:"1-877-927-8387", skus:AUTISM_SKUS },',
  '  { slug:"mobility-rehab", col:"#22c55e", key:"adaptive mobility", en:"Mobility & Rehab", es:"Movilidad y Rehab", ph:"1-800-539-7309", skus:AUTISM_SKUS },',
  '  { slug:"biomedical-peptides", col:"#a855f7", key:"longevity clinic", en:"Biomedical Peptides", es:"Péptidos Biomédicos", ph:"1-800-411-1222", skus:AUTISM_SKUS }',
  "];",
  'export const getWing = (s:string) => WINGS.find(w => s.includes(w.slug.split("-")[0])) ?? WINGS[0];'
].filter(Boolean).join("\n") + "\n";
fs.writeFileSync("app/sanctuary/sanctuary-data.ts", out);
console.log("CRUCIBLE DEAF/BLIND OK:", DB.length);
const hasDS = fs.existsSync("app/sanctuary/down-skus.ts");
const dsRef = hasDS ? "DOWN_SKUS" : "AUTISM_SKUS";
const h1 = [
  'import { AUTISM_SKUS } from "./autism-skus";',
  hasDS ? 'import { DOWN_SKUS } from "./down-skus";' : "",
  'import { DEAF_BLIND_SKUS } from "./deaf-blind-skus";',
  "export interface ScSKU { id:string; name:string; cat:string;",
  "  w:number; ship:number; stock:number; imgs:string[]; }",
  "export interface Wing { slug:string; col:string; key:string;",
  "  en:string; es:string; ph:string; skus:ScSKU[]; }",
  "export const calcSc = (w:number, sh:number) => {",
  "  const r = +(w * 1.08).toFixed(2), tax = +(r * 0.0825).toFixed(2);",
  "  return { r, tax, tot: +((r + sh + tax + 0.3) / 0.971).toFixed(2) };",
  "};",
  "export const WINGS: Wing[] = [",
  '  { slug:"autism-spectrum", col:"#3b82f6", key:"autism sensory", en:"Autism Spectrum", es:"Espectro Autista", ph:"1-888-772-9050", skus:AUTISM_SKUS },',
  '  { slug:"down-syndrome", col:"#eab308", key:"down syndrome", en:"Down Syndrome", es:"Síndrome de Down", ph:"1-800-221-4602", skus:' + dsRef + " },",
  '  { slug:"deaf-blind", col:"#38bdf8", key:"deaf blind accessible", en:"Deaf / Blind", es:"Sordos y Ciegos", ph:"1-800-232-5463", skus:DEAF_BLIND_SKUS },',
  '  { slug:"ptsd-veterans", col:"#14b8a6", key:"veterans ptsd", en:"PTSD & Veterans", es:"TEPT y Veteranos", ph:"1-877-927-8387", skus:AUTISM_SKUS },',
  '  { slug:"mobility-rehab", col:"#22c55e", key:"adaptive mobility", en:"Mobility & Rehab", es:"Movilidad y Rehab", ph:"1-800-539-7309", skus:AUTISM_SKUS },',
  '  { slug:"biomedical-peptides", col:"#a855f7", key:"longevity clinic", en:"Biomedical Peptides", es:"Péptidos Biomédicos", ph:"1-800-411-1222", skus:AUTISM_SKUS }',
  "];",
  'export const getWing = (s:string) => WINGS.find(w => s.includes(w.slug.split("-")[0])) ?? WINGS[0];'
].filter(Boolean).join("\n") + "\n";
fs.writeFileSync("app/sanctuary/sanctuary-data.ts", h1);
console.log("CRUCIBLE DEAF/BLIND OK:", DB.length);
