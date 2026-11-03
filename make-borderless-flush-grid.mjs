import fs from "fs";

// 1. Update Storefront Grid (app/nostalgia/[storeId]/page.tsx) to be 100% flush (gap-0), borderless (border-0), and full-bleed photos (object-cover p-0)
const storeP = "app/nostalgia/[storeId]/page.tsx";
if (fs.existsSync(storeP)) {
  let s = fs.readFileSync(storeP, "utf8");

  // Make the grid container flush edge-to-edge with zero spacing between items
  s = s.replace(
    /className="max-w-7xl mx-auto px-4 pt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"/g,
    'className="w-full max-w-7xl mx-auto px-0 pt-2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-0"'
  );

  // Remove card borders, rounded corners, and shadows so items sit flush together
  s = s.replace(
    /className="bg-zinc-900 border border-zinc-800 hover:border-amber-400 rounded-2xl overflow-hidden flex flex-col justify-between shadow-xl transition"/g,
    'className="bg-zinc-950 border-0 rounded-none overflow-hidden flex flex-col justify-between transition"'
  );

  // Remove black background bars & padding on product photos so images fill edge-to-edge
  s = s.replace(
    /className="relative h-56 bg-black cursor-pointer overflow-hidden group"/g,
    'className="relative aspect-square w-full bg-transparent cursor-pointer overflow-hidden group"'
  );
  s = s.replace(
    /className="w-full h-full object-contain p-2 group-hover:scale-105 transition"/g,
    'className="w-full h-full object-cover p-0 m-0 block group-hover:scale-105 transition duration-300"'
  );

  // Tighten up text/button padding underneath the flush photo
  s = s.replace(/<div className="p-4">/g, '<div className="p-2.5 bg-zinc-950">');
  s = s.replace(/<div className="p-4 pt-0 flex flex-col gap-2">/g, '<div className="px-2.5 pb-3 pt-0 bg-zinc-950 flex flex-col gap-1.5">');

  fs.writeFileSync(storeP, s, "utf8");
}

// 2. Update UniversalMallSearch.tsx so search result items are also borderless, gap-0, and full-bleed photos
const searchP = "app/UniversalMallSearch.tsx";
if (fs.existsSync(searchP)) {
  let u = fs.readFileSync(searchP, "utf8");
  u = u.replace(
    /className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"/g,
    'className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-0"'
  );
  u = u.replace(
    /className="flex items-center gap-3 bg-black border border-zinc-800 hover:border-amber-400 rounded-xl p-2.5 transition"/g,
    'className="flex flex-col bg-zinc-950 border-0 rounded-none p-0 overflow-hidden transition"'
  );
  u = u.replace(
    /className="w-16 h-16 rounded-lg bg-zinc-900 overflow-hidden shrink-0 border border-zinc-700"/g,
    'className="w-full aspect-square bg-transparent overflow-hidden shrink-0 border-0 rounded-none"'
  );
  u = u.replace(
    /className="w-full h-full object-contain"/g,
    'className="w-full h-full object-cover p-0 m-0 block"'
  );
  u = u.replace(
    /className="flex-1 min-w-0"/g,
    'className="p-2 min-w-0 bg-zinc-950"'
  );
  fs.writeFileSync(searchP, u, "utf8");
}

// 3. Also strip any item card borders/gaps on app/page.tsx if product grids render directly on the homepage
const mainP = "app/page.tsx";
if (fs.existsSync(mainP)) {
  let m = fs.readFileSync(mainP, "utf8");
  m = m.replace(/object-contain p-2/g, "object-cover p-0");
  fs.writeFileSync(mainP, m, "utf8");
}

console.log("✅ BORDERLESS, ZERO-GAP, FULL-BLEED PHOTO GRID LOCKED!");
