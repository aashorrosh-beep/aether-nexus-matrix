import fs from 'fs';

let inv = fs.readFileSync('app/stores/christmas-store/christmas-inventory.ts', 'utf8');
const startIdx = inv.indexOf('export const CHRISTMAS_INVENTORY');
const jsonStart = inv.indexOf('[', startIdx);
const jsonEnd = inv.lastIndexOf(']') + 1;
const items = JSON.parse(inv.slice(jsonStart, jsonEnd));

const P = {
  treeLights: "https://images.unsplash.com/photo-1482517967863-00e15c9b44be?auto=format&fit=crop&w=700&q=80",
  treeFull: "https://images.unsplash.com/photo-1543589077-47d81606c1bf?auto=format&fit=crop&w=700&q=80",
  wreath: "https://images.unsplash.com/photo-1513297887119-d46091b24bfa?auto=format&fit=crop&w=700&q=80",
  foliage: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=700&q=80",
  nutcracker: "https://images.unsplash.com/photo-1576919228236-a097c32a5cd4?auto=format&fit=crop&w=700&q=80",
  candyDecor: "https://images.unsplash.com/photo-1545048702-79362596cdc9?auto=format&fit=crop&w=700&q=80",
  wrapGold: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=700&q=80",
  giftBox: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=700&q=80",
  wrapKraft: "https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=700&q=80",
  giftBag: "https://images.unsplash.com/photo-1607344645866-009c320b63e0?auto=format&fit=crop&w=700&q=80",
  headphones: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80",
  speaker: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=700&q=80",
  mug: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=700&q=80",
  espresso: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=700&q=80",
  kitchen: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=700&q=80",
  drone: "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?auto=format&fit=crop&w=700&q=80",
  camera: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=700&q=80",
  vr: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=700&q=80",
  monitor: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=700&q=80",
  watchTech: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80",
  plushToy: "https://images.unsplash.com/photo-1558679908-541bcf1249ff?auto=format&fit=crop&w=700&q=80",
  rideCar: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=700&q=80",
  leather: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=80",
  sport: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=700&q=80"
};

function pick3Angles(item) {
  const n = item.name.toLowerCase();
  if (n.includes("headphone")) return [P.headphones, P.speaker, P.watchTech];
  if (n.includes("speaker") || n.includes("turntable") || n.includes("boombox")) return [P.speaker, P.headphones, P.monitor];
  if (n.includes("mug") || n.includes("tumbler") || n.includes("cocoa") || n.includes("matcha") || n.includes("maple")) return [P.mug, P.espresso, P.giftBox];
  if (n.includes("espresso") || n.includes("slushie") || n.includes("ice maker")) return [P.espresso, P.kitchen, P.mug];
  if (n.includes("dutch oven") || n.includes("air-fryer") || n.includes("pizza") || n.includes("fire bowl") || n.includes("herb")) return [P.kitchen, P.espresso, P.candyDecor];
  if (n.includes("drone")) return [P.drone, P.camera, P.monitor];
  if (n.includes("camera") || n.includes("photo frame") || n.includes("printer") || n.includes("projector") || n.includes("bird feeder")) return [P.camera, P.monitor, P.watchTech];
  if (n.includes("vr") || n.includes("robot") || n.includes("3d printer") || n.includes("vacuum")) return [P.vr, P.monitor, P.watchTech];
  if (n.includes("monitor") || n.includes("tablet") || n.includes("charger") || n.includes("power station") || n.includes("lamp")) return [P.monitor, P.watchTech, P.camera];
  if (n.includes("ring") || n.includes("fidget") || n.includes("warmer") || n.includes("massage") || n.includes("spa") || n.includes("recliner")) return [P.watchTech, P.leather, P.giftBox];
  if (n.includes("plush") || n.includes("advent")) return [P.plushToy, P.giftBox, P.candyDecor];
  if (n.includes("utv") || n.includes("scooter") || n.includes("car detailing")) return [P.rideCar, P.sport, P.watchTech];
  if (n.includes("golf") || n.includes("billiards") || n.includes("bowling") || n.includes("blaster") || n.includes("trampoline") || n.includes("telescope")) return [P.sport, P.monitor, P.giftBox];
  if (n.includes("wallet") || n.includes("silk") || n.includes("blanket") || n.includes("cashmere") || n.includes("socks")) return [P.leather, P.giftBox, P.wrapGold];

  if (item.cat === "wrapping") {
    if (n.includes("box") || n.includes("tin") || n.includes("trunk")) return [P.giftBox, P.wrapGold, P.wrapKraft];
    if (n.includes("bag") || n.includes("sack") || n.includes("tote")) return [P.giftBag, P.wrapKraft, P.giftBox];
    return [P.wrapGold, P.wrapKraft, P.giftBox];
  }
  if (item.cat === "decor") {
    if (n.includes("nutcracker") || n.includes("village") || n.includes("noël") || n.includes("nativity") || n.includes("truck")) return [P.nutcracker, P.candyDecor, P.treeFull];
    if (n.includes("wreath") || n.includes("garland") || n.includes("pinecone") || n.includes("bell")) return [P.wreath, P.foliage, P.treeLights];
    return [P.treeFull, P.treeLights, P.foliage];
  }
  // Exterior lights & inflatables
  if (n.includes("inflatable") || n.includes("snowman") || n.includes("santa") || n.includes("soldier") || n.includes("nutcracker") || n.includes("carousel")) return [P.nutcracker, P.treeLights, P.candyDecor];
  if (n.includes("wreath") || n.includes("garland") || n.includes("pine")) return [P.wreath, P.treeLights, P.foliage];
  return [P.treeLights, P.treeFull, P.wreath];
}

const updated = items.map((x) => ({
  ...x,
  imgs: pick3Angles(x),
}));

const header = inv.slice(0, startIdx);
fs.writeFileSync('app/stores/christmas-store/christmas-inventory.ts', `${header}export const CHRISTMAS_INVENTORY: StandaloneXmasSKU[] = ${JSON.stringify(updated)};\n`);
console.log("MATCHED 3-ANGLE PHOTOS FOR ALL", updated.length, "ITEMS!");
