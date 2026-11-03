import fs from "fs";

// 1. Upgrade /public/party-lapooza-ai-studio.html with Live Photo Upload, Instant Preview & 1-Click Share
const studioHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Party Lapooza — Put Yourself Inside The Party! Live Customizer</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-zinc-950 text-white min-h-screen font-sans p-4 md:p-8">
  <div class="max-w-5xl mx-auto">
    <div class="flex flex-wrap items-center justify-between gap-3 mb-6">
      <a href="/" class="px-4 py-2 rounded-xl bg-zinc-800 text-amber-400 font-bold text-xs uppercase">← Back to Mall</a>
      <span class="px-3 py-1 rounded-full bg-fuchsia-500 text-black font-black text-xs uppercase">Included Free With Every 88–170 Pc Party Box</span>
    </div>

    <div class="bg-gradient-to-r from-fuchsia-950 via-purple-900 to-indigo-950 border-2 border-amber-400 rounded-3xl p-6 md:p-8 shadow-2xl mb-8">
      <h1 class="text-2xl md:text-4xl font-black mb-2">📸 Put Anyone Inside The Party Decorations in 30 Seconds!</h1>
      <p class="text-fuchsia-100 text-sm md:text-base mb-6">Upload any phone photo of the Birthday Kid, Quinceañera, Bride, Groom, or Baby—our AI automatically removes the background and prints them onto your Giant 3D Arch Banner, Life-Size Standee Cutouts, Cupcake Toppers & VIP Passes!</p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div class="bg-black/50 border border-fuchsia-400/50 rounded-2xl p-4">
          <div class="text-amber-400 font-black text-sm mb-1">STEP 1: UPLOAD PHOTO</div>
          <p class="text-xs text-zinc-200">Pick any photo straight from your phone camera roll. No special background needed—our AI cuts out the person automatically.</p>
        </div>
        <div class="bg-black/50 border border-fuchsia-400/50 rounded-2xl p-4">
          <div class="text-amber-400 font-black text-sm mb-1">STEP 2: TYPE NAME & THEME</div>
          <p class="text-xs text-zinc-200">Enter the guest of honor's name, age, and party theme. Watch them appear inside the 3D arch, banners, and table centerpieces.</p>
        </div>
        <div class="bg-black/50 border border-fuchsia-400/50 rounded-2xl p-4">
          <div class="text-amber-400 font-black text-sm mb-1">STEP 3: LOVE IT, SHARE IT & SHIP</div>
          <p class="text-xs text-zinc-200">Send the live preview link to family & friends in 1 tap, then we print and ship the entire custom kit in 3–7 days!</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 bg-zinc-900/90 border border-white/15 rounded-2xl p-5">
        <div class="flex flex-col gap-4">
          <label class="text-xs font-black uppercase text-amber-400">1. Tap to Upload Guest of Honor Photo:</label>
          <input id="photoInput" type="file" accept="image/*" class="block w-full text-xs text-zinc-300 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-amber-400 file:text-black hover:file:bg-amber-300 cursor-pointer" />
          <label class="text-xs font-black uppercase text-amber-400">2. Custom Banner Headline / Name & Age:</label>
          <input id="nameInput" type="text" placeholder="e.g., KING JET'S 7TH VIP PARTY!" value="LET'S CELEBRATE IN STYLE!" class="w-full px-4 py-2.5 rounded-xl bg-black border border-fuchsia-400 text-white font-bold text-sm" />
          <label class="text-xs font-black uppercase text-amber-400">3. Choose Decoration Placement:</label>
          <select id="themeInput" class="w-full px-4 py-2.5 rounded-xl bg-black border border-fuchsia-400 text-white font-bold text-sm">
            <option>🎈 10-Ft Balloon Arch + 3D Photo Banner + Life-Size Cutout</option>
            <option>👑 Royal Quinceañera / Sweet 16 Gold Foil Throne Backdrop</option>
            <option>🏆 Sportsflix All-Star Stadium Tunnel & Jersey Cutout</option>
            <option>🍼 Welcome Baby Shower / Gender Reveal Custom Archway</option>
          </select>
          <div class="flex flex-wrap gap-3 pt-2">
            <button onclick="shareDesign()" class="flex-1 px-4 py-3 rounded-xl bg-emerald-400 text-black font-black text-xs uppercase shadow-lg cursor-pointer">📲 Share Preview With Family & Friends</button>
            <a href="/nostalgia/lapooza-balloon-arch-helium" class="px-4 py-3 rounded-xl bg-amber-400 text-black font-black text-xs uppercase shadow-lg">🛒 Lock In & Shop Party Kits →</a>
          </div>
          <p id="shareMsg" class="text-emerald-400 text-xs font-bold hidden">✅ Link & Custom Preview Copied! Ready to paste into Text, WhatsApp, Instagram, or Facebook!</p>
        </div>

        <div class="flex flex-col items-center justify-center bg-gradient-to-b from-purple-900/60 to-black border-2 border-dashed border-amber-400 rounded-2xl p-6 text-center relative overflow-hidden">
          <div class="text-[11px] font-black uppercase bg-amber-400 text-black px-3 py-0.5 rounded-full mb-3">LIVE CUSTOM ARCH & CUTOUT PREVIEW</div>
          <div id="themePreview" class="text-xs text-fuchsia-300 font-bold mb-2">🎈 10-Ft Balloon Arch + 3D Photo Banner + Life-Size Cutout</div>
          <div class="w-36 h-36 md:w-44 md:h-44 rounded-full border-4 border-amber-400 shadow-2xl overflow-hidden bg-zinc-800 flex items-center justify-center mb-3">
            <img id="facePreview" src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=500&auto=format&fit=crop&q=80" alt="Custom Party Cutout" class="w-full h-full object-cover" />
          </div>
          <div id="bannerPreview" class="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 via-pink-400 to-fuchsia-400 text-black font-black text-sm md:text-lg uppercase shadow-xl">LET'S CELEBRATE IN STYLE!</div>
          <p class="text-[11px] text-zinc-300 mt-3">Printed on Weatherproof HD Vinyl Banner + 24 Cupcake Toppers + Centerpiece Standee</p>
        </div>
      </div>
    </div>
  </div>
  <script>
    const pIn = document.getElementById('photoInput');
    const nIn = document.getElementById('nameInput');
    const tIn = document.getElementById('themeInput');
    pIn.addEventListener('change', e => {
      const f = e.target.files[0];
      if (f) document.getElementById('facePreview').src = URL.createObjectURL(f);
    });
    nIn.addEventListener('input', e => {
      document.getElementById('bannerPreview').textContent = e.target.value || "YOUR CUSTOM PARTY BANNER!";
    });
    tIn.addEventListener('change', e => {
      document.getElementById('themePreview').textContent = e.target.value;
    });
    function shareDesign() {
      const txt = "Check out our custom Party Lapooza decoration preview (" + nIn.value + ") at ALBS Nexus! " + window.location.href;
      if (navigator.share) { navigator.share({ title: "My Custom Party Lapooza Preview", text: txt, url: window.location.href }); }
      else { navigator.clipboard.writeText(txt); }
      document.getElementById('shareMsg').classList.remove('hidden');
    }
  </script>
</body>
</html>`;

fs.writeFileSync("public/party-lapooza-ai-studio.html", studioHtml, "utf8");

// 2. Update Main Mall Homepage (app/page.tsx) Party Pavilion Showcase with 3-Step How It Works + "CUSTOMIZE RIGHT HERE" & Share Button
let p = fs.readFileSync("app/page.tsx", "utf8");
p = p.replace(
  /\$\{card\("from-fuchsia-950[\s\S]*?\)\}/,
  `\${card("from-fuchsia-950 to-indigo-950", "border-fuchsia-400", "🎉 PUT YOURSELF INSIDE THE PARTY • 1-2-3 EASY CUSTOMIZER", "🎈 Party Lapooza: Put Any Photo Inside Your Banners, Arches & Life-Size Cutouts!", "1️⃣ Upload Any Phone Photo → 2️⃣ Pick Your Theme & 3D Name Banner → 3️⃣ See It Live, Share With Family & Ship in Your 88–170 Pc Box (10%–20% Less Than Custom Shops!)", "/party-lapooza-ai-studio.html", "📸 CUSTOMIZE RIGHT HERE & SHARE →")}`
);
fs.writeFileSync("app/page.tsx", p, "utf8");

// 3. Inject "CUSTOMIZE RIGHT HERE" 3-Step Interactive Banner inside every Party Lapooza Storefront (app/nostalgia/[storeId]/page.tsx)
const storePageP = "app/nostalgia/[storeId]/page.tsx";
if (fs.existsSync(storePageP)) {
  let sp = fs.readFileSync(storePageP, "utf8");
  const partyBannerCode = `
      {(String(storeId).includes("lapooza") || String(storeId).includes("baby-shower") || String(storeId).includes("ugly-sweater")) && (
        <div className="max-w-7xl mx-auto px-4 pt-4">
          <div className="bg-gradient-to-r from-fuchsia-950 via-purple-900 to-indigo-950 border-2 border-amber-400 rounded-3xl p-5 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <span className="inline-block bg-amber-400 text-black font-black text-xs px-3 py-1 rounded-full uppercase mb-1">📸 Put Anyone Inside The Party Decorations — Included Free!</span>
              <h2 className="text-xl md:text-2xl font-black text-white">How It Works: 1️⃣ Upload Phone Photo → 2️⃣ Preview on Arch, Cutouts & Toppers → 3️⃣ Love It & Share It!</h2>
              <p className="text-fuchsia-100 text-xs mt-1">Put the Birthday Star, Bride, Quinceañera, or Baby right inside the 3D Vinyl Banner, Life-Size Standee & Cupcake Toppers in 30 seconds.</p>
            </div>
            <a href="/party-lapooza-ai-studio.html" className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-black text-xs md:text-sm uppercase shrink-0 shadow-xl">📸 CUSTOMIZE RIGHT HERE →</a>
          </div>
        </div>
      )}
`;
  if (!sp.includes("CUSTOMIZE RIGHT HERE")) {
    sp = sp.replace(/<main([^>]*)>/, `<main$1>\n${partyBannerCode}`);
    fs.writeFileSync(storePageP, sp, "utf8");
  }
}

console.log("✅ PARTY PAVILION 3-STEP HOW-IT-WORKS + 'CUSTOMIZE RIGHT HERE' & SHARE STUDIO LOCKED!");
