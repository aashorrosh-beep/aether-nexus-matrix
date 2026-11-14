const W_SH = [
  "Women's 5","Women's 5.5","Women's 6","Women's 6.5","Women's 7",
  "Women's 7.5","Women's 8","Women's 8.5","Women's 9","Women's 9.5",
  "Women's 10","Women's 11","Women's 12"
];
const M_SH = [
  "Men's 6","Men's 6.5","Men's 7","Men's 7.5","Men's 8","Men's 8.5",
  "Men's 9","Men's 9.5","Men's 10","Men's 10.5","Men's 11",
  "Men's 11.5","Men's 12","Men's 13","Men's 14","Men's 15"
];
const W_WD = [
  "Women's 7W","Women's 8W","Women's 9W","Women's 10W",
  "Men's 9 (2E)","Men's 10 (2E)","Men's 11 (2E)","Men's 12 (2E)","4E Wide"
];
const K_SH = [
  "Kids 11C","Kids 12C","Kids 13C","Youth 1Y","Youth 2Y",
  "Youth 3Y","Youth 4Y","Youth 5Y","Youth 6Y","Youth 7Y"
];
const APP = [
  "Youth S","Youth M","Youth L","Youth XL","XS","Small (S)",
  "Medium (M)","Large (L)","XL","2XL","3XL","4XL","LT","XLT","2XLT"
];
const HATS = [
  "Adjustable (One Size)","S/M","L/XL","Youth",
  "Fitted 6 7/8","Fitted 7","Fitted 7 1/8","Fitted 7 1/4",
  "Fitted 7 3/8","Fitted 7 1/2","Fitted 7 5/8","Fitted 7 3/4","Fitted 8"
];
const HELM = ["Youth S/M","Youth L/XL","Adult S","Adult M","Adult L","Adult XL"];
const BOX_G = ["8 oz","10 oz","12 oz","14 oz","16 oz"];
const GLF_G = [
  "Men S (LH)","Men M (LH)","Men L (LH)","Men XL (LH)",
  "Men M (RH)","Men L (RH)","Women S","Women M","Women L","Youth"
];
const BELTS = ['28"','30"','32"','34"','36"','38"','40"','42"','44"'];
const RNG = ["Ring 6","Ring 7","Ring 8","Ring 9","Ring 10","Ring 11","Ring 12"];
const SKIP = [
  "gift box","mural","frame","display","rack","insoles","tumbler",
  "snowman","inflatable","ornament","nutcracker","hatbox","shampoo",
  "calm caps","capsules","turntable","seatbelt","banner","poster",
  "cutout","blanket","pillow","tent","chair","swing","table"
];
const SH_RE = new RegExp([
  "sneaker","trainer","shoe","runner","boot","chukka","loafer",
  "oxford","monk-strap","pump","ballet flat","moc","sandal",
  "sport slide","cleat","slipper","stiletto","waders"
].join("|"), "i");
const AP_RE = new RegExp([
  "sweater","sweatshirt","crewneck","cardigan","fleece","hoodie",
  "shirt","polo","pullover","jersey","jacket","coat","parka","vest",
  "jumpsuit","sleep set","rashguard","wetsuit","chinos","jeans",
  "joggers","shorts","pants","leggings","tracksuit","warmup","robe",
  "pajama","wearable","lounge set","poncho","sleeves","socks","gloves"
].join("|"), "i");
export function getSizeSpec(id: string, name: string) {
  const n = name.toLowerCase();
  if (SKIP.some(k => n.includes(k))) return null;
  if (/smart ring|recovery ring|signet ring/.test(n))
    return { label: "Ring Size", opts: RNG };
  if (/\bbelt\b/.test(n) && !/belt-drive|tool/.test(n))
    return { label: "Belt Waist", opts: BELTS };
  if (/helmet|headgear/.test(n))
    return { label: "Helmet Size", opts: HELM };
  if (/boxing|mma|sparring/.test(n) && n.includes("glove"))
    return { label: "Glove Weight", opts: BOX_G };
  if (/golf glove|batting glove|receiver glove/.test(n))
    return { label: "Hand & Size", opts: GLF_G };
  if (/\b(hat|cap|snapback|fitted|visor|beanie|beret)\b/.test(n))
    return { label: "Hat Size", opts: HATS };
  if (id.startsWith("SH-") || (!n.includes("socks") && SH_RE.test(n))) {
    if (/^women|pump|ballet flat|stiletto/i.test(name))
      return { label: "Women's Size", opts: [...W_SH, ...W_WD.slice(0, 4)] };
    if (/^youth|^kids/i.test(name))
      return { label: "Youth Size", opts: K_SH };
    return { label: "Shoe Size", opts: [...W_SH, ...M_SH, ...W_WD, ...K_SH] };
  }
  if (AP_RE.test(n)) return { label: "Apparel Size", opts: APP };
  return null;
}
export function saveItemSize(id: string, sz: string) {
  if (typeof window === "undefined" || !sz) return;
  try {
    const c = JSON.parse(localStorage.getItem("albs_sizes") || "{}");
    c[id] = [...(Array.isArray(c[id]) ? c[id] : []), sz];
    localStorage.setItem("albs_sizes", JSON.stringify(c));
  } catch {}
}
export function readSizeSummary(): string {
  if (typeof window === "undefined") return "";
  try {
    const c = JSON.parse(localStorage.getItem("albs_sizes") || "{}");
    return Object.entries(c).map(([k, v]) =>
      k + " (" + (Array.isArray(v) ? v.join(", ") : String(v)) + ")"
    ).join(", ");
  } catch { return ""; }
}
export function clearSavedSizes() {
  if (typeof window !== "undefined") localStorage.removeItem("albs_sizes");
}
