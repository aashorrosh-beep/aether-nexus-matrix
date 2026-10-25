import fs from "fs";
let p = fs.readFileSync("app/page.tsx", "utf8");

const partyDef = `
const partyCogs = [
  { id: "p1", name: "🎄 1. Holiday Indoor Spruce, Outdoor Lights/Donkeys, Thanksgiving & Games (4 Stores)", desc: "Indoor Christmas Spruce, Outdoor Lights, Friendsgiving & Adult/Kid Wreath Games", rooms: ["lapooza-holiday-indoor-spruce","lapooza-holiday-outdoor-lights","lapooza-thanksgiving-harvest","lapooza-holiday-games-adult-kids"] },
  { id: "p2", name: "🎂 2. Boys & Girls Birthdays by Age (1–5, 5–10, 10–16) + Free AI Face-Swap (6 Stores)", desc: "Shrek, Dino, Monster Truck, Pixel Craft, Frozen, Unicorn, Pop Star & Sweet 16 (88–170 Pc Bulk or Single!)", rooms: ["lapooza-boys-ages-1-5","lapooza-boys-ages-5-10","lapooza-boys-ages-10-16","lapooza-girls-ages-1-5","lapooza-girls-ages-5-10","lapooza-girls-ages-10-16"] },
  { id: "p3", name: "🎈 3. Home Helium Tanks, 150-Pc Balloon Archways, Quinceañeras, Weddings & Bachelor VIP (5 Stores)", desc: "Disposable Helium Canisters, Electric Blowers, Circle Arch Stands, Quinceañera & Bridal Suites", rooms: ["lapooza-balloon-arch-helium","lapooza-quinceanera-royale","lapooza-wedding-bridal","lapooza-bachelorette-squad","lapooza-bachelor-last-ride"] }
];
`;

if (!p.includes("const partyCogs")) {
  p = p.replace("const MALL_DIRECTORY = [", partyDef + "\nconst MALL_DIRECTORY = [");
}
const partyMallObj = `  {
    id: "lapooza",
    badge: "🎉 STANDALONE MEGA-SUPERSTORE • 15 PARTY STORES • 375 ITEMS",
    title: "2. Party Lapooza • Mega Party Superstore",
    subtitle: "✨ Where Fun, Adventure & Imagination Come to Life — Put Yourself in the Middle of the Magic! ✨",
    explain: "Includes: 88–170 Pc Bulk Party Room Boxes (10/15/20 Guests) OR Individual Decor, Free AI Face-Swap Studio, Home Helium Tanks, 150-Pc Balloon Archways, Boys & Girls Age-Bracket Birthdays, Quinceañeras, Weddings & Holiday Suites (10%–25% Below Custom Boutiques).",
    border: "border-fuchsia-400",
    bg: "from-fuchsia-950/90 via-purple-950/85 to-zinc-950",
    accent: "text-fuchsia-300",
    btnBg: "bg-gradient-to-r from-fuchsia-500 to-amber-400 hover:from-fuchsia-400 hover:to-amber-300 text-black",
    cogs: partyCogs
  },\n`;

if (!p.includes('id: "lapooza"')) {
  p = p.replace('  {\n    id: "nostalgia",', partyMallObj + '  {\n    id: "nostalgia",');
  p = p.replace(/SEARCH ALL 5 MALLS/g, "SEARCH ALL 6 MALLS");
  p = p.replace(/View All 5 Malls/g, "View All 6 Malls");
  p = p.replace(/All 5 Malls/g, "All 6 Malls");
}

fs.writeFileSync("app/page.tsx", p, "utf8");
console.log("✅ STEP 2B DONE: Party Lapooza Added as Standalone Mega-Superstore!");
