import fs from "fs";

let p = fs.readFileSync("app/page.tsx", "utf8");

// 1. Lock SPORTSFLIX (with an S) everywhere
p = p.replace(/SPORTLICK|SPORTPLEX|SPORTFLIX/g, "SPORTSFLIX")
     .replace(/Sportlick|Sportplex|Sportflix/g, "Sportsflix");

// 2. Remove new-life-expecting-superstore from any disability grouping
p = p.replace(/,\s*"new-life-expecting-superstore"/g, "")
     .replace(/"new-life-expecting-superstore",\s*/g, "");

// 3. Inject Top-of-Mall Mega-Showcases: Holiday Wishlist Top 100, Expecting + Free CPR, Party Lapooza & Native Spanish Toggle
const topShowcaseBlock = `
      {/* NATIVE ENGLISH / SPANISH BAR + HOLIDAY TOP 100, EXPECTING/CPR & PARTY LAPOOZA MEGA SHOWCASES */}
      <div className="w-full max-w-7xl mx-auto px-4 pt-4 pb-2 flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3 bg-zinc-900/95 border-2 border-amber-400/80 rounded-2xl px-4 py-3 shadow-xl">
          <div className="flex items-center gap-2 text-xs md:text-sm font-black text-white">
            <span className="bg-emerald-500 text-black px-2.5 py-1 rounded-lg uppercase">240 Audited Storefronts</span>
            <span className="text-amber-300">All-In Landed Price Beats Competitors • 3+ Vendor Photos, Video & Insured Spec Sheet on Every Item</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => { document.documentElement.lang = 'en'; document.querySelectorAll('[data-es]').forEach((el: any) => el.textContent = el.getAttribute('data-en')); }} className="px-3 py-1.5 rounded-lg bg-white text-black font-black text-xs cursor-pointer">🇺🇸 English</button>
            <button onClick={() => { document.documentElement.lang = 'es'; document.querySelectorAll('[data-es]').forEach((el: any) => el.textContent = el.getAttribute('data-es')); }} className="px-3 py-1.5 rounded-lg bg-amber-400 text-black font-black text-xs cursor-pointer">🇲🇽 Español (Nativo)</button>
          </div>
        </div>

        {/* TOP SHOWCASE #1: HOLIDAY FAVORITES & MONDAY WISHLIST TOP 100 SUPERSTORE */}
        <div className="bg-gradient-to-r from-red-950 via-emerald-950 to-amber-950 border-2 border-amber-400 rounded-3xl p-5 shadow-2xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="inline-block bg-amber-400 text-black font-black text-xs px-3 py-1 rounded-full uppercase mb-2" data-en="🎄 December & Christmas Mega-Event • 100 In-Stock Bestsellers" data-es="🎄 Mega-Evento de Diciembre y Navidad • 100 Más Vendidos en Stock">🎄 December & Christmas Mega-Event • 100 In-Stock Bestsellers</div>
              <h2 className="text-2xl md:text-3xl font-black text-white" data-en="🎁 Holiday Favorites & Monday Wishlist Top 100 Superstore" data-es="🎁 Supertienda de Favoritos Navideños y Top 100 Lista de Deseos">🎁 Holiday Favorites & Monday Wishlist Top 100 Superstore</h2>
              <p className="text-amber-100 text-xs md:text-sm mt-1" data-en="All 100 Most-Wished-For Christmas Must-Haves In Stock Ready to Ship • Tight 5%–6% High-Velocity Pricing So Your All-In Total (Even After Shipping & Card Fees) Beats Big-Box Retail!" data-es="Los 100 Regalos Más Deseados de Navidad en Stock Listos para Enviar • Precios Garantizados Más Bajos que las Grandes Tiendas Incluso con Envío">All 100 Most-Wished-For Christmas Must-Haves In Stock Ready to Ship • Tight 5%–6% High-Velocity Pricing So Your All-In Total (Even After Shipping & Card Fees) Beats Big-Box Retail!</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <a href="/nostalgia/holiday-wishlist-100-superstore" className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-black text-xs md:text-sm uppercase shadow-xl" data-en="🎄 Shop All 100 Holiday Must-Haves →" data-es="🎄 Comprar los 100 Favoritos de Navidad →">🎄 Shop All 100 Holiday Must-Haves →</a>
            </div>
          </div>
        </div>

        {/* TOP SHOWCASE #2: WHEN YOU'RE EXPECTING + FREE INFANT/CHILD CPR CLASSES */}
        <div className="bg-gradient-to-r from-rose-950 via-pink-900 to-amber-950 border-2 border-pink-300 rounded-3xl p-5 shadow-2xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="inline-block bg-pink-300 text-black font-black text-xs px-3 py-1 rounded-full uppercase mb-2" data-en="✨ Joyful New Life & Motherhood Wing (Top Showcase)" data-es="✨ Ala Feliz de Maternidad y Bebé (Destacado Principal)">✨ Joyful New Life & Motherhood Wing (Top Showcase)</div>
              <h2 className="text-2xl md:text-3xl font-black text-white" data-en="👶 When You're Expecting, Nursery & Baby Shower Superstore" data-es="👶 Cuando Estás Esperando: Supertienda de Maternidad, Cuna y Baby Shower">👶 When You're Expecting, Nursery & Baby Shower Superstore</h2>
              <p className="text-pink-100 text-xs md:text-sm mt-1" data-en="100% Dedicated Joyful Wing • Free Infant & Adult CPR / Choking Rescue (5-and-5) Classes • Equal To or 10% Less Than Specialty Competitors" data-es="Ala 100% Dedicada a la Maternidad • Clases Gratis de RCP Infantil y Primeros Auxilios por Atragantamiento • Precio Igual o 10% Menor que la Competencia">100% Dedicated Joyful Wing • Free Infant & Adult CPR / Choking Rescue (5-and-5) Classes • Equal To or 10% Less Than Specialty Competitors</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <a href="/nostalgia/new-life-expecting-superstore" className="px-4 py-2.5 rounded-xl bg-pink-400 text-black font-black text-xs uppercase shadow-lg" data-en="🍼 Shop Expecting & Nursery →" data-es="🍼 Comprar Maternidad y Cuna →">🍼 Shop Expecting & Nursery →</a>
              <a href="/nostalgia/baby-shower-gender-reveal-boutique" className="px-4 py-2.5 rounded-xl bg-amber-300 text-black font-black text-xs uppercase shadow-lg" data-en="🎀 Baby Shower & Gender Reveal →" data-es="🎀 Baby Shower y Revelación →">🎀 Baby Shower & Gender Reveal →</a>
              <a href="/spectrum-knowledge-vault.html#cpr-classes" className="px-4 py-2.5 rounded-xl bg-white text-rose-950 font-black text-xs uppercase shadow-lg" data-en="🚑 Free Infant & Adult CPR Classes →" data-es="🚑 Clases Gratis de RCP Infantil y Adulto →">🚑 Free Infant & Adult CPR Classes →</a>
            </div>
          </div>
        </div>

        {/* TOP SHOWCASE #3: PARTY LAPOOZA MEGA-STORE + CUSTOMIZATION EXAMPLES & VIDEO STUDIO */}
        <div className="bg-gradient-to-r from-fuchsia-950 via-purple-950 to-indigo-950 border-2 border-fuchsia-400 rounded-3xl p-5 shadow-2xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="inline-block bg-fuchsia-400 text-black font-black text-xs px-3 py-1 rounded-full uppercase mb-2" data-en="🎉 Party Lapooza Mega-Store • 10%–20% Below Custom Competitors" data-es="🎉 Mega-Tienda Fiesta Lapooza • 10%–20% Más Barato que la Competencia">🎉 Party Lapooza Mega-Store • 10%–20% Below Custom Competitors</div>
              <h2 className="text-2xl md:text-3xl font-black text-white" data-en="🎈 Party Lapooza: 88–170 Pc Room Boxes + Live Customization & Video Examples" data-es="🎈 Fiesta Lapooza: Cajas de 88–170 Piezas + Ejemplos de Personalización y Video en Vivo">🎈 Party Lapooza: 88–170 Pc Room Boxes + Live Customization & Video Examples</h2>
              <p className="text-fuchsia-100 text-xs md:text-sm mt-1" data-en="See Exactly How Your Custom Name Banners, AI Face-Swap Cutouts, Quinceañera Crowns & Helium Archways Look Before You Buy • 3+ Vendor Photos & Video on Every Kit" data-es="Mira Exactamente Cómo Lucen Tus Pancartas con Nombre, Recortes con Rostro IA, Quinceañera y Arcos de Helio Antes de Comprar • 3+ Fotos y Video en Cada Kit">See Exactly How Your Custom Name Banners, AI Face-Swap Cutouts, Quinceañera Crowns & Helium Archways Look Before You Buy • 3+ Vendor Photos & Video on Every Kit</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <a href="/party-lapooza-ai-studio.html" className="px-4 py-2.5 rounded-xl bg-amber-400 text-black font-black text-xs uppercase shadow-lg" data-en="🎨 Open Live Customization & Video Examples →" data-es="🎨 Ver Ejemplos de Personalización y Video →">🎨 Open Live Customization & Video Examples →</a>
              <a href="/nostalgia/lapooza-balloon-arch-helium" className="px-4 py-2.5 rounded-xl bg-fuchsia-400 text-black font-black text-xs uppercase shadow-lg" data-en="🎈 Helium Tanks & Balloon Arches →" data-es="🎈 Tanques de Helio y Arcos →">🎈 Helium Tanks & Balloon Arches →</a>
              <a href="/nostalgia/lapooza-quinceanera-royale" className="px-4 py-2.5 rounded-xl bg-white text-purple-950 font-black text-xs uppercase shadow-lg" data-en="👑 Quinceañera, Bridal & Birthdays →" data-es="👑 Quinceañera, Bodas y Cumpleaños →">👑 Quinceañera, Bridal & Birthdays →</a>
            </div>
          </div>
        </div>
      </div>
`;

if (!p.includes("holiday-wishlist-100-superstore")) {
  p = p.replace(/<main([^>]*)>/, `<main$1>\n${topShowcaseBlock}`);
}

fs.writeFileSync("app/page.tsx", p, "utf8");
console.log("✅ ALL TOP SHOWCASES (HOLIDAY 100, EXPECTING+CPR, PARTY LAPOOZA), SPORTSFLIX RENAME & SPANISH TOGGLE LOCKED!");
