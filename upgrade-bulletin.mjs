import fs from "fs";
const f = "public/spectrum-knowledge-vault.html";
let h = fs.readFileSync(f, "utf8");

// Fix any remaining "within 20 miles" text to "within 12 miles"
h = h.replace(/within 20 miles/gi, "within 12 miles").replace(/20-Mile/gi, "12-Mile");

const catScript = `
<div id="ribbonTabs" style="background:#062e22;border:2px solid #fbbf24;border-radius:16px;padding:14px;margin:14px 0">
  <div style="color:#fde047;font-weight:900;font-size:12px;text-transform:uppercase;margin-bottom:8px">🎗️ SELECT 12-MILE EVENT BULLETIN BOARD BY AWARENESS RIBBON (STAYS 100% ON OUR SITE):</div>
  <div style="display:flex;flex-wrap:wrap;gap:8px">
    <button onclick="switchCat('autism')" style="background:#2563eb;color:#fff;border:2px solid #fbbf24;padding:10px 14px;border-radius:10px;font-weight:900;cursor:pointer">🧩 1. Autism (Blue &amp; Gold)</button>
    <button onclick="switchCat('down-md')" style="background:#eab308;color:#000;border:2px solid #1d4ed8;padding:10px 14px;border-radius:10px;font-weight:900;cursor:pointer">🌻 2. Down Syndrome &amp; MD</button>
    <button onclick="switchCat('deaf-blind')" style="background:#06b6d4;color:#000;border:2px solid #fff;padding:10px 14px;border-radius:10px;font-weight:900;cursor:pointer">🤟 3. Deaf &amp; Blind (Silver/Cyan)</button>
    <button onclick="switchCat('ptsd')" style="background:#0d9488;color:#fff;border:2px solid #5eead4;padding:10px 14px;border-radius:10px;font-weight:900;cursor:pointer">🎖️ 4. PTSD Recovery (Teal)</button>
    <button onclick="switchCat('hospitals')" style="background:#e11d48;color:#fff;border:2px solid #fbcfe8;padding:10px 14px;border-radius:10px;font-weight:900;cursor:pointer">🏥 5. 12-Mi Hospitals &amp; Expecting</button>
  </div>
  <div id="catBulletin" style="margin-top:14px"></div>
</div>
`;
const jsLogic = `
<script>
const CAT_DATA = {
  "autism": { title: "🧩 AUTISM (BLUE & GOLD RIBBON)", color: "#3b82f6", store: "/nostalgia/spectrum-sensory-superstore", storeLabel: "Shop Autism Sensory Superstore (10–20% Off) →", items: [
    ["Sensory-Friendly Cinema & Theater Mornings", "Lights up, sound turned down & freedom to move within 12 miles", "Sensory+Friendly+Movies+Autism+Events"],
    ["Certified Autism Museums, Aquariums & Quiet Hours", "Quiet discovery mornings, sensory backpacks & calm zones within 12 miles", "Autism+Sensory+Museum+Aquarium"],
    ["All-Abilities Inclusive Parks, Therapy Gyms & Meetups", "Fenced inclusive playgrounds, OT/ABA sensory gyms & parent groups within 12 miles", "Inclusive+Playground+Autism+Center"]
  ]},
  "down-md": { title: "🌻 DOWN SYNDROME & MUSCULAR DYSTROPHY (BLUE & YELLOW RIBBON)", color: "#eab308", store: "/nostalgia/md-mobility-superstore", storeLabel: "Shop Down Syndrome & MD Adaptive Superstore (10–20% Off) →", items: [
    ["Down Syndrome Playgroups, Buddy Walks & Family Meetups", "Local Down Syndrome association events, youth social clubs & parent networks within 12 miles", "Down+Syndrome+Association+Events+Support"],
    ["MDA Care Centers, Pediatric Neuromuscular & Physical Therapy", "Specialized muscular dystrophy & low-tone pediatric therapy hubs within 12 miles", "Muscular+Dystrophy+Clinic+Pediatric+Therapy"],
    ["Wheelchair-Accessible Parks, Adaptive Sports & Miracle League", "Ramped fields, adaptive baseball/sports & accessible recreation within 12 miles", "Miracle+League+Accessible+Park+Adaptive+Sports"]
  ]},
  "deaf-blind": { title: "🤟 DEAF & BLIND SANCTUARY (SILVER & TURQUOISE RIBBON)", color: "#06b6d4", store: "/nostalgia/deaf-blind-superstore", storeLabel: "Shop Deaf & Blind Assistive Superstore (10–20% Off) →", items: [
    ["Open-Caption Movies, ASL Social Nights & Deaf Coffee Chats", "Captioned screenings, ASL community meetups & interpreter events within 12 miles", "Open+Caption+Theater+ASL+Deaf+Events"],
    ["Tactile Museum Tours, Audio-Described Shows & Braille Hubs", "Touch tours, descriptive arts & low-vision community centers within 12 miles", "Blind+Low+Vision+Center+Braille+Services"],
    ["All-Sensory Accessible Trails, Guide-Dog Parks & Schools", "Auditory/braille trails & deaf/blind family resources within 12 miles", "Deaf+Blind+School+Community+Services"]
  ]},
  "ptsd": { title: "🎖️ PTSD, VETERANS & FIRST-RESPONDER SANCTUARY (TEAL RIBBON)", color: "#14b8a6", store: "/nostalgia/ptsd-calm-superstore", storeLabel: "Shop PTSD Calm & Recovery Superstore (10–20% Off) →", items: [
    ["Veteran & First-Responder Peer Coffee Meetups & Support", "Quiet camaraderie, VFW/Legion peer groups & trauma recovery within 12 miles", "Veteran+PTSD+Support+Center+Peer+Group"],
    ["Equine Therapy, Service-Dog Training & Outdoor Healing Retreats", "K9 service dog programs, equine ranches & quiet nature trails within 12 miles", "Veteran+Service+Dog+Equine+Therapy"],
    ["Stellate-Ganglion, Hyperbaric (HBOT) & Bio-Calming Clinics", "Evidence-based nervous system reset & trauma sleep clinics within 12 miles", "PTSD+Recovery+Clinic+Veterans+Center"]
  ]},
  "hospitals": { title: "🏥 12-MILE PEDIATRIC, MATERNITY & EMERGENCY HOSPITALS", color: "#f43f5e", store: "/nostalgia/new-life-expecting-superstore", storeLabel: "Shop When You're Expecting & Newborn Superstore (10–20% Off) →", items: [
    ["24/7 Children's Hospitals & Pediatric Emergency Rooms", "Verified pediatric ERs, NICUs & urgent care centers within 12 miles", "Childrens+Hospital+Pediatric+Emergency+Room"],
    ["Maternity Birthing Centers, OB/GYN & Lactation Support", "Labor & delivery tours, prenatal classes & new-mom groups within 12 miles", "Maternity+Hospital+Birthing+Center"],
    ["Local Red Cross / AHA Infant & Adult CPR Certification Classes", "In-person hands-on choking rescue, AED & CPR training within 12 miles", "CPR+First+Aid+Training+Center"]
  ]}
};
const jsRender = `
function switchCat(c) {
  const z = (document.getElementById("zipInput") && document.getElementById("zipInput").value.trim()) || new URLSearchParams(location.search).get("zip") || "77301";
  const d = CAT_DATA[c] || CAT_DATA["autism"];
  const box = document.getElementById("catBulletin");
  if (!box) return;
  let cards = d.items.map(it => \`
    <div style="background:#000;border:2px solid \${d.color};border-radius:14px;padding:16px;margin-top:10px">
      <div style="color:\${d.color};font-weight:900;font-size:12px">📍 LOCAL 12-MILE BULLETIN BOARD • ZIP \${z} — \${d.title}</div>
      <h3 style="color:#fff;margin:6px 0;font-size:18px">\${it[0]} Near ZIP \${z}</h3>
      <p style="color:#d4d4d8;font-size:13px;margin:0 0 10px 0">\${it[1]} (ZIP \${z})</p>
      <div style="display:flex;flex-wrap:wrap;gap:8px">
        <button onclick="loadInSiteMap('\${it[2]}+near+\${z}')" style="background:#10b981;color:#000;font-weight:900;padding:10px 14px;border-radius:8px;border:none;cursor:pointer">🗺️ OPEN LOCAL 12-MI MAP ON THIS PAGE (STAYS ON SITE) →</button>
        <a href="\${d.store}" style="background:\${d.color};color:#000;font-weight:900;padding:10px 14px;border-radius:8px;text-decoration:none;font-size:12px">🏪 \${d.storeLabel}</a>
      </div>
    </div>\`).join("");
  box.innerHTML = cards + \`
    <div id="inSiteMapBox" style="background:#0c4a6e;border:2px solid #38bdf8;border-radius:16px;padding:14px;margin-top:14px">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:10px">
        <b style="color:#fff;font-size:14px">🗺️ LIVE INTERACTIVE 12-MILE IN-MALL MAP (ZIP \${z}) — YOU ARE STILL ON ALBS NEXUS:</b>
        <div style="display:flex;gap:8px">
          <a href="\${d.store}" style="background:#fde047;color:#000;font-weight:900;padding:8px 12px;border-radius:8px;text-decoration:none;font-size:12px">🏪 Shop Store →</a>
          <a href="/" style="background:#fff;color:#000;font-weight:900;padding:8px 12px;border-radius:8px;text-decoration:none;font-size:12px">← Return to All 6 Malls</a>
        </div>
      </div>
      <iframe id="inSiteMapFrame" src="https://maps.google.com/maps?q=\${d.items[0][2]}+near+\${z}&t=&z=11&ie=UTF8&iwloc=&output=embed" style="width:100%;height:380px;border:0;border-radius:12px;background:#fff"></iframe>
    </div>\`;
}
function loadInSiteMap(q) {
  const f = document.getElementById("inSiteMapFrame");
  if (f) { f.src = "https://maps.google.com/maps?q=" + q + "&t=&z=11&ie=UTF8&iwloc=&output=embed"; f.scrollIntoView({ behavior: "smooth" }); }
}
window.addEventListener("DOMContentLoaded", () => {
  const p = new URLSearchParams(location.search);
  const c = p.get("cat") || "autism";
  if (c.includes("md") || c.includes("down")) switchCat("down-md");
  else if (c.includes("deaf") || c.includes("blind")) switchCat("deaf-blind");
  else if (c.includes("ptsd")) switchCat("ptsd");
  else if (c.includes("hospital") || c.includes("expecting")) switchCat("hospitals");
  else switchCat("autism");
});
</script>`;

if (!h.includes("id=\"ribbonTabs\"")) {
  h = h.replace("<h1", catScript + "\n<h1");
  h = h.replace("</body>", jsRender + "\n</body>");
  fs.writeFileSync(f, h, "utf8");
}
console.log("✅ STEP 2C DONE: In-Site Bulletin Board + Embedded 12-Mile Map Active for All 5 Categories!");
